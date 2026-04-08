import axios, { type AxiosError } from "axios";

const DEFAULT_BASE = "https://api.jikan.moe/v4";

export function getJikanBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE;
}

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
      return Promise.reject(
        new Error("Muitas requisições. Aguarde um momento e tente de novo.")
      );
    }
    return Promise.reject(error);
  }
);

export async function jikanGet<T>(path: string): Promise<T> {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const { data } = await jikanClient.get<T>(normalized);
  return data;
}
