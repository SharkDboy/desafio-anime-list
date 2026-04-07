# Anime List — Desafio Técnico

Aplicação web para listar e explorar animes, consumindo a **Jikan API v4** (dados não oficiais do MyAnimeList). Stack: **React**, **TypeScript**, **Vite**, **Material UI**, **Axios**, **TanStack Query** e **React Router**.

### Funcionalidades

- **Início:** ranking popular (`/top/anime`) e **busca** por título, com **paginação**.
- **Detalhe:** página do anime com sinopse, gêneros, nota e metadados (`/anime/:id`).
- **Idiomas:** UI em **português (BR)** ou **espanhol (Latam)**; a **sinopse** é traduzida do inglês via **MyMemory** (automática), com **cache em IndexedDB** por anime, idioma e hash do texto.
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

- **`VITE_MYMEMORY_EMAIL` (opcional):** e-mail associado ao [MyMemory](https://mymemory.translated.net/) para aumentar a cota diária de tradução de sinopses.

Em **desenvolvimento**, o Vite faz **proxy** de `/mymemory` para a API MyMemory e evita bloqueio CORS. No **build de produção**, as requisições vão direto ao MyMemory; se o navegador bloquear CORS, será preciso um proxy no seu host ou outro provedor de tradução.

## Estrutura principal

- `src/api/` — `jikanClient.ts` (Axios + base URL Jikan), `jikanAnimeEndpoints.ts` (caminhos REST), `animeApi.ts` (serviço: top, busca, detalhe)
- `src/components/` — `Navbar`, layout e `AnimeCard`
- `src/context/` — favoritos (`FavoritesProvider`)
- `src/hooks/` — `useAnimeCatalog`, `useAnimeDetail`, `useTranslatedSynopsis`
- `src/i18n/` — textos da UI e constantes de locale
- `src/lib/` — `localStorage` / `sessionStorage`, cache IndexedDB da sinopse, cliente MyMemory
- `src/pages/` — Home e detalhe
- `src/types/` — tipos das respostas Jikan
- `src/utils/` — utilitários (ex.: limpeza de HTML na sinopse)

## Decisões de arquitetura (Dia 2)

- **Caminhos da API:** mantidos em `jikanAnimeEndpoints.ts` em vez de colapsar tudo em `animeApi.ts`, para o mapa REST ficar visível num só lugar e escalar se surgirem mais recursos Jikan. *Alternativa avaliada:* constantes no topo de `animeApi.ts` (menos arquivos em projetos mínimos).
- **Barra superior:** componente `Navbar` (não `Header`) para alinhar ao cronograma do desafio e reforçar papel de navegação; usa `nav` + ARIA. *Alternativa avaliada:* nome `Header` (comum em design systems) ou `BottomNavigation` no rodapé (útil com muitas abas).

## Tema MUI

O **ThemeProvider** e o **CssBaseline** estão configurados em `src/main.tsx`, com tema definido em `src/theme.ts`.
