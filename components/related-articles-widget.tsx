import Link from 'next/link'
import { getRelatedArticles } from '@/lib/articles'
import { Tag } from 'lucide-react'

interface RelatedArticlesWidgetProps {
  tags: string[]
  excludeSlug?: string
}

export function RelatedArticlesWidget({ tags, excludeSlug }: RelatedArticlesWidgetProps) {
  const articles = getRelatedArticles(tags, 3, excludeSlug)

  if (articles.length === 0) {
    return null
  }

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-border">
      <h3 className="font-semibold text-lg mb-4">Related Articles</h3>
      <div className="space-y-3">
        {articles.map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`}>
            <div className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
              <p className="text-sm font-medium line-clamp-2 mb-2">{article.title}</p>
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
