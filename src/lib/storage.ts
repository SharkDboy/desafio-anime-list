const PREFIX = "desafio-anime-list:";

function key(k: string): string {
  return `${PREFIX}${k}`;
}

function parse<T>(raw: string | null): T | null {
  if (raw == null || raw === "") return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function readLocalJson<T>(storageKey: string): T | null {
  return parse<T>(localStorage.getItem(key(storageKey)));
}

export function writeLocalJson<T>(storageKey: string, value: T): void {
  localStorage.setItem(key(storageKey), JSON.stringify(value));
}

export function removeLocal(storageKey: string): void {
  localStorage.removeItem(key(storageKey));
}

export function readSessionJson<T>(storageKey: string): T | null {
  return parse<T>(sessionStorage.getItem(key(storageKey)));
}

export function writeSessionJson<T>(storageKey: string, value: T): void {
  sessionStorage.setItem(key(storageKey), JSON.stringify(value));
}

export function removeSession(storageKey: string): void {
  sessionStorage.removeItem(key(storageKey));
}
