import type { Locale } from "./constants";
import { LOCALE_STORAGE_KEY } from "./constants";

/** Mensagem 429 da Jikan (lida fora do React, ex.: interceptor Axios). */
export const JIKAN_RATE_LIMIT: Record<Locale, string> = {
  "pt-BR":
    "Limite de requisições da API Jikan atingido. Aguarde um momento e tente novamente.",
  es: "Se alcanzó el límite de solicitudes de la API Jikan. Espera un momento e inténtalo de nuevo.",
};

export function getJikanRateLimitMessage(): string {
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    const loc: Locale = raw === "es" ? "es" : "pt-BR";
    return JIKAN_RATE_LIMIT[loc];
  } catch {
    return JIKAN_RATE_LIMIT["pt-BR"];
  }
}
