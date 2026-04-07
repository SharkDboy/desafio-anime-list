import type { Locale } from "@/i18n/constants";

/** Tamanho conservador por requisição (limite do serviço gratuito). */
const CHUNK_MAX = 360;

function chunkSynopsis(text: string): string[] {
  const t = text.trim();
  if (!t) return [];
  if (t.length <= CHUNK_MAX) return [t];

  const chunks: string[] = [];
  let pos = 0;

  while (pos < t.length) {
    let end = Math.min(pos + CHUNK_MAX, t.length);
    if (end < t.length) {
      const slice = t.slice(pos, end);
      let br = slice.lastIndexOf("\n\n");
      if (br < 50) br = slice.lastIndexOf(". ");
      if (br < 50) br = slice.lastIndexOf("\n");
      if (br >= 50) {
        const step =
          slice[br] === "."
            ? 2
            : slice.slice(br, br + 2) === "\n\n"
              ? 2
              : 1;
        end = pos + br + step;
      }
    }
    const part = t.slice(pos, end).trim();
    if (part) chunks.push(part);
    pos = end;
    while (pos < t.length && /\s/.test(t[pos])) pos += 1;
  }

  return chunks;
}

function buildTranslateUrl(q: string, langpair: string): string {
  const params = new URLSearchParams({ q, langpair });
  const email = import.meta.env.VITE_MYMEMORY_EMAIL;
  if (email) params.set("de", email);

  if (import.meta.env.DEV) {
    return `/mymemory/get?${params.toString()}`;
  }
  return `https://api.mymemory.translated.net/get?${params.toString()}`;
}

type MyMemoryResponse = {
  responseData?: { translatedText?: string };
  responseStatus?: number;
};

async function translateChunk(
  text: string,
  langpair: string,
  signal: AbortSignal
): Promise<string> {
  const url = buildTranslateUrl(text, langpair);
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Tradução HTTP ${res.status}`);
  }
  const json = (await res.json()) as MyMemoryResponse;
  if (json.responseStatus !== 200 || !json.responseData?.translatedText) {
    throw new Error(
      typeof json.responseStatus === "number"
        ? `MyMemory status ${json.responseStatus}`
        : "Resposta de tradução inválida"
    );
  }
  return json.responseData.translatedText;
}

const DELAY_MS = 400;

function delay(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const t = window.setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      if (signal.aborted) reject(new DOMException("Aborted", "AbortError"));
      else resolve();
    }, ms);
    const onAbort = () => {
      window.clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Traduz sinopse assumindo origem predominante em inglês (padrão Jikan/MAL).
 * Usa [MyMemory](https://mymemory.translated.net/doc/spec.php) (gratuito com limites).
 */
export async function translateSynopsisMyMemory(
  text: string,
  locale: Locale,
  signal: AbortSignal
): Promise<string> {
  const langpair = locale === "es" ? "en|es" : "en|pt";
  const parts = chunkSynopsis(text);
  const out: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    if (i > 0) await delay(DELAY_MS, signal);
    const translated = await translateChunk(parts[i], langpair, signal);
    out.push(translated);
  }

  return out.join("\n\n");
}
