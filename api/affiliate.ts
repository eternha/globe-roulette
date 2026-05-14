/**
 * Vercel serverless function — Travelpayouts affiliate proxy.
 *
 * Converts raw travel URLs into tracked affiliate links using the
 * Travelpayouts Partner Links API. Credentials stay server-side and
 * are never exposed to the browser.
 *
 * POST /api/affiliate
 * Body: { urls: string[] }
 * Response: { links: Array<{ original: string; url: string }> }
 */

const API_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN;
const MARKER = process.env.TRAVELPAYOUTS_MARKER ?? "528922";
const TRS = process.env.TRAVELPAYOUTS_TRS;

const TRAVELPAYOUTS_LINKS_API = "https://api.travelpayouts.com/v1/links";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any): Promise<void> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Parse body — handle both pre-parsed objects and raw strings
  let urls: string[];
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
    if (!Array.isArray(body.urls) || body.urls.length === 0) {
      res.status(400).json({ error: "urls array required" });
      return;
    }
    urls = body.urls as string[];
  } catch {
    res.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  // If credentials are missing, return original URLs unchanged (graceful fallback)
  if (!API_TOKEN || !TRS) {
    res
      .status(200)
      .json({ links: urls.map((url) => ({ original: url, url })) });
    return;
  }

  try {
    const tpRes = await fetch(TRAVELPAYOUTS_LINKS_API, {
      method: "POST",
      headers: {
        "X-Access-Token": API_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        marker: MARKER,
        trs: Number(TRS),
        shorten: false,
        links: urls.map((url) => ({ url })),
      }),
    });

    if (!tpRes.ok) {
      // Fall back to original URLs rather than failing the user
      res
        .status(200)
        .json({ links: urls.map((url) => ({ original: url, url })) });
      return;
    }

    const data = await tpRes.json();
    res.status(200).json(data);
  } catch {
    // Network error — return original URLs so the user can still book
    res.status(200).json({ links: urls.map((url) => ({ original: url, url })) });
  }
}
