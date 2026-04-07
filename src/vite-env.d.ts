/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  /** E-mail opcional para cota maior no MyMemory (tradução de sinopses). */
  readonly VITE_MYMEMORY_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
