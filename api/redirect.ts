/**
 * Vercel serverless function — affiliate redirect.
 *
 * GET /api/redirect?url=<encoded-url>
 *
 * Converts the raw travel URL to a Travelpayouts affiliate link
 * server-side, then issues a 302 redirect. The browser opens this
 * endpoint directly — no blank-tab / popup-blocker issues.
 */

const API_TOKEN = process.env.TRAVELPAYOUTS_API_TOKEN;
const MARKER = process.env.TRAVELPAYOUTS_MARKER ?? "528922";
const TRS = process.env.TRAVELPAYOUTS_TRS;

const TRAVELPAYOUTS_LINKS_API = "https://api.travelpayouts.com/v1/links";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any): Promise<void> {
  const rawUrl = req.query?.url as string | undefined;

  if (!rawUrl) {
    res.status(400).end("Missing url parameter");
    return;
  }

  let targetUrl: string;
  try {
    targetUrl = decodeURIComponent(rawUrl);
    const parsed = new URL(targetUrl);
    if (!parsed.protocol.startsWith("http")) throw new Error("invalid protocol");
  } catch {
    res.status(400).end("Invalid url parameter");
    return;
  }

  const affiliateUrl = await resolveAffiliateUrl(targetUrl);

  res.setHeader("Location", affiliateUrl);
  res.setHeader("Cache-Control", "no-store");
  res.status(302).end();
}

async function resolveAffiliateUrl(url: string): Promise<string> {
  if (!API_TOKEN || !TRS) return url;

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
        links: [{ url }],
      }),
    });

    if (!tpRes.ok) {
      console.error("[affiliate] Travelpayouts error:", tpRes.status, await tpRes.text());
      return url;
    }

    const data = await tpRes.json() as { links?: Array<{ url: string }> };
    const converted = data.links?.[0]?.url;

    if (converted && converted !== url) {
      console.log("[affiliate] converted:", url, "→", converted);
    } else {
      console.warn("[affiliate] no conversion for:", url, "raw response:", JSON.stringify(data));
    }

    return converted ?? url;
  } catch (err) {
    console.error("[affiliate] fetch error:", err);
    return url;
  }
}
