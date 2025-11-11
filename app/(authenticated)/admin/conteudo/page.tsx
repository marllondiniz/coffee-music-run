import { getArticles } from '@/lib/queries'
import { ArticleAdminPanel } from './ArticleAdminPanel'

export default async function AdminConteudoPage() {
  const artigos = await getArticles()

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold uppercase tracking-wide text-[#f5f5f5]">
          Gerenciar conteúdo
        </h2>
        <p className="text-sm text-[#9a9aa2]">
          Publique artigos, dicas e materiais exclusivos para o clube.
        </p>
      </div>

      <ArticleAdminPanel initialArticles={artigos} />
    </section>
  )
}
