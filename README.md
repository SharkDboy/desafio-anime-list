# Anime List

Relatório didático do projeto: [RELATORIO.md](RELATORIO.md).

Aplicação web para explorar animes usando a [Jikan API v4](https://docs.api.jikan.moe/) (dados não oficiais do MyAnimeList). Interface em português, com busca na barra superior, carrossel de títulos populares na home, filtros e ordenação, visualização em grade ou lista (preferência salva no `localStorage`), listagem paginada, página de detalhe e duas listas pessoais (**favoritos** e **assistidos**) com IDs persistidos no navegador.

## Stack

| Tecnologia | Uso |
|------------|-----|
| React 18 | UI |
| TypeScript | Tipagem de props e respostas da API |
| Vite 6 | Build e servidor de desenvolvimento |
| Material UI 6 | Layout, AppBar, cards, grid responsivo |
| Axios | Cliente HTTP e instância única para a Jikan |
| React Router 6 | Rotas e parâmetros de query na home (`?q=`, `page`, filtros) |

**Dados:** `useState` + `useEffect` para chamadas à API (sem React Query).

## Funcionalidades

- **Início (`/`):** carrossel horizontal com animes populares (`GET /top/anime`); listagem principal com paginação; busca por título via campo na **AppBar** (sincronizado com `?q=` na URL); filtros (ano mínimo, tipo TV/filme/OVA etc., status) e ordenação (popularidade, nota, título, data); alternância **grade / lista** (persistida em `home-view-mode`).
- **Detalhe (`/anime/:id`):** imagem, títulos, nota, episódios, status, classificação, gêneros, sinopse, data de estreia, trailer em iframe quando disponível; botões favorito e assistido.
- **Favoritos (`/favorites`) e Assistidos (`/watched`):** listas separadas com cards e atalhos de marcação.
- **Barra superior:** busca global, navegação Início / Favoritos / Assistidos, chips com contagens.
- **Persistência:** favoritos e assistidos em `localStorage` (chaves `favorite-mal-ids`, `watched-mal-ids`); modo de vista da home em `home-view-mode` (prefixo `desafio-anime-list:`).

## Rotas

| Caminho | Descrição |
|---------|-----------|
| `/` | Home (query opcional: `q`, `page`, `type`, `status`, `order_by`, `sort`, `year`) |
| `/anime/:id` | Detalhe do anime |
| `/favorites` | Lista de favoritos |
| `/watched` | Lista de assistidos |

## Como rodar

Requisito: [Node.js](https://nodejs.org/) (recomendado LTS).

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (em geral `http://localhost:5173`).

| Script | Descrição |
|--------|-----------|
| `npm run build` | Typecheck + build de produção para `dist/` |
| `npm run preview` | Servir o build localmente |
| `npm run lint` | ESLint |

## Variáveis de ambiente (opcional)

Copie `.env.example` para `.env` na raiz do projeto.

- **`VITE_API_BASE_URL`** — sobrescreve a base da Jikan (padrão: `https://api.jikan.moe/v4`).

## Estrutura do código

```
src/
  api/           — jikanClient, jikanAnimeEndpoints, animeApi
  components/    — AnimeCard, AnimeListRow, PopularCarousel, HomeFiltersBar,
                 SearchBar, LoadingSpinner, ErrorState, layout
  context/       — animeListsContext, AnimeListsProvider
  hooks/         — useAnimeLists
  lib/           — storage, fetchAnimeCatalog (regras de busca na home)
  pages/         — Home, AnimeDetail, Favorites, Watched, SavedAnimeListPage
  router/        — rotas
  types/         — tipos Jikan
  utils/         — stripHtml
```

## Limites da API

A Jikan é pública e pode responder **429 Too Many Requests** se houver muitas chamadas seguidas. O app trata isso com uma mensagem de erro genérica.

## Licença

Uso educacional / desafio técnico. Dados de anime via Jikan; MyAnimeList é marca de terceiros.
