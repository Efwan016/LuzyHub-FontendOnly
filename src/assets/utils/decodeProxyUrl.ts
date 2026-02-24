// utils/decodeProxyUrl.ts
export function decodeProxyUrl(proxyUrl: string) {
  try {
    const url = new URL(proxyUrl);
    const base64 = url.searchParams.get("url");
    if (!base64) return proxyUrl;
    return atob(base64); // decode Base64 → link asli
  } catch {
    return proxyUrl; // fallback kalau error
  }
}