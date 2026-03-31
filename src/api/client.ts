import axios, { type AxiosError } from "axios";

const DEFAULT_BASE = "https://api.jikan.moe/v4";

export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? DEFAULT_BASE;
}

export const api = axios.create({
  baseURL: getApiBaseUrl().replace(/\/$/, ""),
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      return Promise.reject(
        new Error(
          "Limite de requisições da API Jikan atingido. Aguarde um momento e tente novamente."
        )
      );
    }
    return Promise.reject(error);
  }
);

export async function apiGet<T>(path: string): Promise<T> {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const { data } = await api.get<T>(normalized);
  return data;
}
