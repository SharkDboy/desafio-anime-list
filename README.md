# Anime List — Desafio Técnico

Aplicação web para listar e explorar animes, consumindo a **Jikan API v4** (dados não oficiais do MyAnimeList). Stack: **React**, **TypeScript**, **Vite**, **Material UI**, **Axios**, **TanStack Query** e **React Router**.

### Funcionalidades

- **Início:** ranking popular (`/top/anime`) e **busca** por título, com **paginação**.
- **Detalhe:** página do anime com sinopse, gêneros, nota e metadados (`/anime/:id`).
- **Favoritos (MVP):** lista de IDs salvos no **`localStorage`** (coração no card e na página de detalhe; contador no cabeçalho).

## Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado: LTS)
- npm (incluído com o Node)

## Como rodar

Na raiz do projeto:

```bash
npm install
npm run dev
```

O Vite exibirá um endereço local (em geral `http://localhost:5173`). Abra no navegador.

### Outros scripts

| Comando        | Descrição              |
| -------------- | ---------------------- |
| `npm run build` | Build de produção      |
| `npm run preview` | Pré-visualiza o build |
| `npm run lint`  | ESLint                 |

## Variáveis de ambiente (opcional)

Copie `.env.example` para `.env` se precisar sobrescrever a URL base da API (`VITE_API_BASE_URL`). O padrão é `https://api.jikan.moe/v4`.

## Estrutura principal

- `src/api/` — `jikanClient.ts` (Axios + base URL Jikan), `animeApi.ts` (busca, top, detalhe)
- `src/components/` — layout e `AnimeCard`
- `src/context/` — favoritos (`FavoritesProvider`)
- `src/hooks/` — `useAnimeCatalog`, `useAnimeDetail`
- `src/lib/` — helpers de `localStorage` / `sessionStorage`
- `src/pages/` — Home e detalhe
- `src/types/` — tipos das respostas Jikan
- `src/utils/` — utilitários (ex.: limpeza de HTML na sinopse)

## Tema MUI

O **ThemeProvider** e o **CssBaseline** estão configurados em `src/main.tsx`, com tema definido em `src/theme.ts`.
