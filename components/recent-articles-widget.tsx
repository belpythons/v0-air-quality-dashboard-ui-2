import Link from 'next/link'
import { getRecentArticles } from '@/lib/articles'
import { Calendar } from 'lucide-react'

interface RecentArticlesWidgetProps {
  excludeSlug?: string
}

export function RecentArticlesWidget({ excludeSlug }: RecentArticlesWidgetProps) {
  const articles = getRecentArticles(5, excludeSlug)

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-border">
      <h3 className="font-semibold text-lg mb-4">Recent Articles</h3>
      <div className="space-y-3">
        {articles.map((article) => (
          <Link key={article.id} href={`/news/${article.slug}`}>
            <div className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
              <p className="text-sm font-medium line-clamp-2 mb-1">{article.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
