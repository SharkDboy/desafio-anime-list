import axios, { type AxiosError } from "axios";
import { getJikanRateLimitMessage } from "@/i18n/messages";

const DEFAULT_BASE = "https://api.jikan.moe/v4";

/** Base URL da Jikan API v4 (ou `VITE_API_BASE_URL` se definida). */
export function getJikanBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE;
}

/** Instância centralizada do Axios para todas as chamadas à Jikan. */
export const jikanClient = axios.create({
  baseURL: getJikanBaseUrl().replace(/\/$/, ""),
  headers: {
    Accept: "application/json",
  },
});

jikanClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      return Promise.reject(new Error(getJikanRateLimitMessage()));
    }
    return Promise.reject(error);
  }
);

/** GET genérico na base da Jikan (extensões futuras). */
export async function jikanGet<T>(path: string): Promise<T> {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const { data } = await jikanClient.get<T>(normalized);
  return data;
}
