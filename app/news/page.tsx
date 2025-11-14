'use client'

import Link from 'next/link'
import { getRecentArticles } from '@/lib/articles'
import type { Article } from '@/lib/articles'

const getAqiColor = (category: Article['aqiCategory']) => {
  const colors = {
    good: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    moderate: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    'unhealthy-for-sensitive': 'bg-orange-50 border-orange-200 text-orange-700',
    unhealthy: 'bg-red-50 border-red-200 text-red-700',
    hazardous: 'bg-purple-50 border-purple-200 text-purple-700',
  }
  return colors[category]
}

const getCategoryLabel = (category: Article['aqiCategory']) => {
  const labels = {
    good: 'Good',
    moderate: 'Moderate',
    'unhealthy-for-sensitive': 'Unhealthy for Sensitive',
    unhealthy: 'Unhealthy',
    hazardous: 'Hazardous',
  }
  return labels[category]
}

export default function NewsPage() {
  const articles = getRecentArticles(100)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl font-bold text-teal-900">Air Quality News</h1>
          <p className="mt-2 text-lg text-slate-600">
            Latest updates on air quality across East Kalimantan cities
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-teal-300"
            >
              {/* AQI Badge */}
              <div className={`border-b ${getAqiColor(article.aqiCategory)} px-4 py-3`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">AQI Score</p>
                    <p className="text-2xl font-bold">{article.aqiScore}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium uppercase">{getCategoryLabel(article.aqiCategory)}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                {/* Location & Date */}
                <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-teal-700">{article.location}</span>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>

                {/* Title */}
                <h2 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="mb-4 flex-1 text-sm text-slate-600 line-clamp-2">{article.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div className="border-t border-slate-200 bg-slate-50 px-4 py-2">
                <p className="text-xs text-slate-600">By {article.author}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-slate-600">No articles found</p>
          </div>
        )}
      </div>
    </div>
  )
}
