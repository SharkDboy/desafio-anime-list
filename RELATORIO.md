# Relatório: Anime List — o que fizemos e como replicar

Este documento resume o projeto, as boas práticas adotadas nível **júnior** e um guia didático para você repetir a lógica em outros apps (e-commerce, blog com API, dashboard, etc.).

---

## 1. O que o aplicativo faz

- **Consome uma API REST pública** ([Jikan](https://docs.api.jikan.moe/)), igual a muitos frontends reais que falam com backend ou serviços terceiros.
- **Mostra dados em telas** (lista, detalhe, favoritos, assistidos) com **React**.
- **Guarda preferências no navegador** (`localStorage`): IDs de favoritos/assistidos e modo grade/lista na home.
- **Usa a URL como estado** na home (`?q=naruto&page=2&type=tv`): links podem ser copiados e a página recarrega no mesmo “modo”.

Nada disso exige servidor próprio no MVP: é um **SPA** (Single Page Application) clássico.

---

## 2. Arquitetura em camadas (mentalidade júnior)

Pense em quatro camadas, de baixo para cima:

| Camada | Pasta / papel | Responsabilidade |
|--------|----------------|------------------|
| **HTTP** | `src/api/` | Uma instância Axios (`jikanClient`), caminhos da API (`jikanAnimeEndpoints`), funções que retornam dados tipados (`animeApi.ts`). **Não** colocar JSX aqui. |
| **Regras de negócio / orquestração** | `src/lib/` | Funções puras ou quase puras, ex.: `fetchAnimeCatalog` decide se chama `getTopAnime` ou `searchAnime` conforme filtros. Facilita testar e ler a `HomePage`. |
| **Estado global da UI** | `src/context/` | O que várias telas precisam (listas de favoritos/assistidos). Evita “prop drilling” excessivo. |
| **Telas e componentes** | `src/pages/`, `src/components/` | Composição visual, `useState`/`useEffect` locais, leitura da URL com `useSearchParams`. |

**Por que isso importa:** quando o chefe pedir “mudar a API” ou “trocar o provedor”, você mexe sobretudo em `api/` e `lib/`, não em dez componentes ao mesmo tempo.

---

## 3. Fluxo de dados que você pode copiar

### 3.1 Da API até a tela (sem React Query)

1. O usuário altera filtros ou a página → isso muda a **URL** (`searchParams`) ou o **estado local**.
2. Um `useMemo` transforma `URLSearchParams` em um objeto **`CatalogQuery`** estável.
3. Um `useEffect` depende desse objeto e chama **`fetchAnimeCatalog(query)`** (função async em `lib/`).
4. Enquanto carrega: `loading === true` → mostra `<LoadingSpinner />`.
5. Se der erro: `error` → `<ErrorState />`.
6. Se ok: `data` → renderiza grade ou lista.

**Padrão importante:** variável `cancelled` no `useEffect` para não atualizar estado se o usuário sair da página antes da resposta chegar (evita avisos e bugs).

### 3.2 Persistência local (favoritos / assistidos)

- Um **Context** (`AnimeListsProvider`) mantém dois arrays de IDs em memória.
- A cada mudança, grava no `localStorage` via helpers em `lib/storage.ts` (prefixo único do projeto evita colisão com outros sites).
- Qualquer card ou detalhe chama `useAnimeLists()` e usa `toggleFavorite` / `toggleWatched`.

**Como replicar:** troque “anime” por “produto” e “IDs” por SKUs; a ideia é a mesma.

### 3.3 URL como fonte da verdade na home

- **Busca global** na `Navbar` atualiza `?q=` e `page=1`.
- Filtros (ano, tipo, status, ordenação) também são parâmetros de query.
- Vantagens: botão “voltar” do navegador funciona; você pode compartilhar o link; o estado não some ao dar F5.

**Função utilitária** `searchParamsToCatalogQuery` centraliza a leitura da URL e valida `sort` (`asc` | `desc`).

---

## 4. O que foi refinado nesta revisão de código

- **Comentários removidos** onde não agregavam (incluindo referência antiga a MyMemory em `vite-env.d.ts`).
- **Lógica de busca da home extraída** para [`src/lib/fetchAnimeCatalog.ts`](src/lib/fetchAnimeCatalog.ts): a `HomePage` só orquestra, não repete `if/else` gigante de chamadas HTTP.
- **Barra de filtros extraída** para [`src/components/HomeFiltersBar.tsx`](src/components/HomeFiltersBar.tsx): arquivo menor, props explícitas (`query`, `onParamChange`, etc.).
- **Tipagem de `sort`** na leitura da URL mais explícita, evitando string solta inválida.

Isso segue o princípio **SRP** (Single Responsibility): cada arquivo com um motivo claro para mudar.

---

## 5. Checklist de boas práticas (nível júnior)

- **Um cliente HTTP** por backend/base URL (`jikanClient`).
- **Tipos** para respostas da API (`types/anime.ts`) — evita `any` sem necessidade.
- **Tratamento de erro** visível (mensagem amigável) e **loading** explícito.
- **Acessibilidade básica:** `aria-label` em botões de ícone, títulos semânticos (`h1` na página).
- **ESLint** no CI ou antes do commit (`npm run lint`).
- **Build** passando (`npm run build`) antes de abrir PR.

---

## 6. Como replicar em outro projeto (passo a passo)

1. **Defina o contrato da API** (Swagger/OpenAPI ou documentação). Crie tipos TypeScript que espelhem o JSON.
2. **Crie `api/client.ts` + `api/recursoX.ts`** com funções `getLista`, `getPorId`, etc.
3. **Escolha onde vive o estado:** só local (`useState`), URL (`useSearchParams`), ou global (`Context`) para dados compartilhados entre rotas.
4. **Monte a página:** `useEffect` → chama função da API → `setState` com dados/erro/loading.
5. **Extraia componentes** quando um arquivo passar de ~200–300 linhas ou quando um bloco JSX se repetir.
6. **Extraia funções puras** (`lib/`) quando a mesma regra aparecer em dois lugares ou dificultar leitura.

---

## 7. Limitações conscientes (honestidade técnica)

- A **home** ainda concentra bastante comportamento; em time maior, poderia existir um hook `useCatalogFromUrl()` só para a home.
- **Testes automatizados** (Vitest + Testing Library) não estão no escopo deste desafio, mas seriam o próximo passo profissional.
- A API Jikan pode retornar **429** (muitas requisições); em produção-severidade, usar debounce na busca ou cache seria avaliado.

---

## 8. Comandos úteis

| Comando | Uso |
|---------|-----|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Verificar TypeScript + bundle de produção |
| `npm run lint` | Estilo e regras React Hooks |

---

*Documento gerado para acompanhar o repositório **desafio-anime-list**. Atualize esta seção se o escopo do projeto mudar.*
