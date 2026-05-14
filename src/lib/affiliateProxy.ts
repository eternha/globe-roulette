/**
 * Client-side helper for converting raw travel URLs into tracked
 * Travelpayouts affiliate links via the /api/affiliate proxy.
 *
 * Falls back to the original URL on any error so the user can always book.
 */

interface AffiliateResponse {
  links?: Array<{ original: string; url: string }>;
}

export async function convertToAffiliateUrl(rawUrl: string): Promise<string> {
  try {
    const res = await fetch("/api/affiliate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: [rawUrl] }),
    });

    if (!res.ok) return rawUrl;

    const data = (await res.json()) as AffiliateResponse;
    return data.links?.[0]?.url ?? rawUrl;
  } catch {
    return rawUrl;
  }
}
