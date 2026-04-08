# Anime List

Aplicação web para explorar animes usando a [Jikan API v4](https://docs.api.jikan.moe/) (dados não oficiais do MyAnimeList). Interface em português, com busca, listagem paginada, página de detalhe e duas listas pessoais (**favoritos** e **assistidos**) persistidas no `localStorage` do navegador.

## Stack

| Tecnologia | Uso |
|------------|-----|
| React 18 | UI |
| TypeScript | Tipagem de props e respostas da API |
| Vite 6 | Build e servidor de desenvolvimento |
| Material UI 6 | Layout, AppBar, cards, grid responsivo |
| Axios | Cliente HTTP e instância única para a Jikan |
| React Router 6 | Rotas declarativas |

**Dados:** `useState` + `useEffect` para chamadas à API (sem React Query).

## Funcionalidades

- **Início (`/`):** ranking por popularidade (`GET /top/anime`) ou busca por título (`GET /anime?q=`), com paginação.
- **Detalhe (`/anime/:id`):** imagem, títulos, nota, episódios, status, classificação, gêneros, sinopse (HTML da API normalizada), data de estreia, trailer em iframe quando a API enviar `embed_url`.
- **Favoritos (`/favorites`) e Assistidos (`/watched`):** listas separadas; cada anime pode estar em uma ou nas duas; cards com atalhos para marcar/desmarcar.
- **Barra superior:** links para Início, Favoritos e Assistidos; chips com contagem de itens salvos.
- **Persistência:** IDs salvos em `localStorage` (prefixo `desafio-anime-list:`), chaves `favorite-mal-ids` e `watched-mal-ids`.

## Rotas

| Caminho | Descrição |
|---------|-----------|
| `/` | Home |
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

- ** `VITE_API_BASE_URL`** — sobrescreve a base da Jikan (padrão: `https://api.jikan.moe/v4`).

## Estrutura do código

```
src/
  api/           — jikanClient, jikanAnimeEndpoints, animeApi (serviço)
  components/    — AnimeCard, layout (MainLayout, Navbar)
  context/       — animeListsContext, AnimeListsProvider
  hooks/         — useAnimeLists
  lib/           — storage (localStorage/sessionStorage)
  pages/         — Home, AnimeDetail, Favorites, Watched, SavedAnimeListPage
  router/        — definição de rotas
  types/         — tipos alinhados às respostas Jikan
  utils/         — stripHtml (sinopse)
```

## Limites da API

A Jikan é pública e pode responder **429 Too Many Requests** se houver muitas chamadas seguidas. O app trata isso com uma mensagem de erro genérica.

## Próximos passos (desafio PDF)

Itens ainda não implementados no enunciio completo: carrossel na home, busca global fixa no AppBar, filtros e ordenação, alternância grid/lista persistida, etc.

## Licença

Uso educacional / desafio técnico. Dados de anime via Jikan; MyAnimeList é marca de terceiros.
