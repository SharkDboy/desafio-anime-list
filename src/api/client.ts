/**
 * Cliente HTTP base. Ajuste a baseURL conforme o PDF (ex.: Jikan v4).
 */
const DEFAULT_BASE = "https://api.jikan.moe/v4";

export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE;
}

export async function apiGet<T>(path: string): Promise<T> {
  const url = `${getApiBaseUrl().replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
