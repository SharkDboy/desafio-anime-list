import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/constants";
import { synopsisCacheGet, synopsisCacheSet } from "@/lib/synopsisCacheDb";
import { synopsisSha256Hex } from "@/lib/synopsisHash";
import { translateSynopsisMyMemory } from "@/lib/translateSynopsisMyMemory";

export type TranslatedSynopsisState = {
  displayText: string;
  loading: boolean;
  translated: boolean;
  error: Error | null;
};

export function useTranslatedSynopsis(
  malId: number,
  locale: Locale,
  sourceText: string | null
): TranslatedSynopsisState {
  const [state, setState] = useState<TranslatedSynopsisState>({
    displayText: "",
    loading: false,
    translated: false,
    error: null,
  });

  useEffect(() => {
    if (!sourceText) {
      setState({
        displayText: "",
        loading: false,
        translated: false,
        error: null,
      });
      return;
    }

    const ac = new AbortController();
    setState({
      displayText: "",
      loading: true,
      translated: false,
      error: null,
    });

    void (async () => {
      const hash = await synopsisSha256Hex(sourceText);
      const key = `${malId}:${locale}:${hash}`;
      try {
        const cached = await synopsisCacheGet(key);
        if (ac.signal.aborted) return;
        if (cached) {
          setState({
            displayText: cached,
            loading: false,
            translated: true,
            error: null,
          });
          return;
        }
        const out = await translateSynopsisMyMemory(
          sourceText,
          locale,
          ac.signal
        );
        if (ac.signal.aborted) return;
        await synopsisCacheSet(key, out);
        setState({
          displayText: out,
          loading: false,
          translated: true,
          error: null,
        });
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        const err = e instanceof Error ? e : new Error(String(e));
        setState({
          displayText: sourceText,
          loading: false,
          translated: false,
          error: err,
        });
      }
    })();

    return () => ac.abort();
  }, [malId, locale, sourceText]);

  return state;
}
