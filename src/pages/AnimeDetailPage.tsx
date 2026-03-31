import { Link, useParams } from "react-router-dom";

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex text-sm text-indigo-400 hover:text-indigo-300"
      >
        ← Voltar
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-white">Detalhe do anime</h1>
        <p className="mt-2 font-mono text-sm text-slate-400">
          ID na rota: {id ?? "—"}
        </p>
      </div>

      <section className="rounded-lg border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center text-slate-500">
        Conteúdo do anime (sinopse, episódios, etc.) virá aqui.
      </section>
    </div>
  );
}
