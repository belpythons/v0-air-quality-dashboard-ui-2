// Article data structure and mock articles for Air Quality News
export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  aqiScore: number
  aqiCategory: 'good' | 'moderate' | 'unhealthy-for-sensitive' | 'unhealthy' | 'hazardous'
  location: string
  date: string
  keyPollutants: { name: string; level: string }[]
  category: 'Air Quality News'
  tags: string[]
  author: string
  image?: string
}

const mockArticles: Article[] = [
  {
    id: '1',
    slug: 'air-quality-index-unhealthy-jakarta-nov2025',
    title: 'Jakarta Air Quality Reaches Unhealthy Levels During Peak Season',
    excerpt: 'Air quality in Jakarta has deteriorated significantly, with AQI reaching unhealthy levels due to increased traffic and industrial emissions.',
    content: `Jakarta has been experiencing particularly challenging air quality conditions this November. Our monitoring stations have recorded consistently elevated AQI readings across the metropolitan area.

The primary contributors to this spike are increased vehicular emissions during rush hours, coupled with reduced wind patterns that typically disperse pollutants. Industrial facilities in the surrounding areas have also contributed to the elevated levels.

Residents, particularly those with respiratory conditions, are advised to limit outdoor activities and use appropriate protective equipment when venturing outside.`,
    aqiScore: 142,
    aqiCategory: 'unhealthy',
    location: 'Jakarta',
    date: '2025-11-14',
    keyPollutants: [
      { name: 'PM2.5', level: '85 µg/m³' },
      { name: 'O₃', level: '72 ppb' },
      { name: 'NO₂', level: '58 ppb' },
    ],
    category: 'Air Quality News',
    tags: ['PM2.5', 'urban-pollution', 'health-alert'],
    author: 'Dr. Sarah Chen',
  },
  {
    id: '2',
    slug: 'air-quality-index-good-bandung-nov2025',
    title: 'Bandung Maintains Good Air Quality Despite Urban Growth',
    excerpt: 'Bandung continues to maintain excellent air quality standards, attributed to green policies and natural wind patterns.',
    content: `Bandung has successfully maintained good air quality levels throughout November, standing out as a model city for environmental management in Southeast Asia.

The city's commitment to green spaces, public transportation initiatives, and industrial emission controls has yielded positive results. Recent investments in urban forests and traffic management systems have proven effective.

Citizens of Bandung can generally engage in outdoor activities without significant health concerns, though vulnerable populations should still monitor daily AQI readings.`,
    aqiScore: 45,
    aqiCategory: 'good',
    location: 'Bandung',
    date: '2025-11-12',
    keyPollutants: [
      { name: 'PM2.5', level: '22 µg/m³' },
      { name: 'O₃', level: '35 ppb' },
      { name: 'NO₂', level: '25 ppb' },
    ],
    category: 'Air Quality News',
    tags: ['good-quality', 'urban-green', 'success-story'],
    author: 'Prof. Andi Wijaya',
  },
  {
    id: '3',
    slug: 'air-quality-index-moderate-samarinda-nov2025',
    title: 'Samarinda Air Quality Remains Moderate; Monitoring Continues',
    excerpt: 'Samarinda maintains moderate air quality levels as monitoring agencies continue real-time surveillance.',
    content: `Samarinda has consistently recorded moderate air quality readings throughout the past week. Current AQI levels are within acceptable ranges for most of the population, though sensitive groups should exercise caution.

The city\'s mix of industrial and residential areas creates varying pollution patterns across different districts. Local authorities have increased monitoring frequency in high-traffic areas.

Recommendations include maintaining awareness of daily AQI reports and adjusting outdoor activities based on real-time data.`,
    aqiScore: 78,
    aqiCategory: 'moderate',
    location: 'Samarinda',
    date: '2025-11-10',
    keyPollutants: [
      { name: 'PM2.5', level: '52 µg/m³' },
      { name: 'O₃', level: '48 ppb' },
      { name: 'NO₂', level: '42 ppb' },
    ],
    category: 'Air Quality News',
    tags: ['moderate', 'monitoring', 'stability'],
    author: 'Ir. Budi Santoso',
  },
  {
    id: '4',
    slug: 'air-quality-index-unhealthy-sensitive-surabaya-nov2025',
    title: 'Surabaya Reaches Unhealthy for Sensitive Groups; Health Advisory Issued',
    excerpt: 'Surabaya air quality has deteriorated to unhealthy levels for sensitive populations requiring immediate health precautions.',
    content: `Surabaya has entered the "Unhealthy for Sensitive Groups" category, prompting health officials to issue precautionary advisories for vulnerable populations.

Children, elderly individuals, and those with respiratory or cardiovascular conditions are strongly advised to limit outdoor exposure. Schools and outdoor events have been monitored closely.

The primary cause appears to be the combination of seasonal weather patterns and increased industrial activity. Residents are encouraged to stay indoors with proper air filtration during peak pollution hours.`,
    aqiScore: 108,
    aqiCategory: 'unhealthy-for-sensitive',
    location: 'Surabaya',
    date: '2025-11-08',
    keyPollutants: [
      { name: 'PM2.5', level: '68 µg/m³' },
      { name: 'O₃', level: '62 ppb' },
      { name: 'NO₂', level: '51 ppb' },
    ],
    category: 'Air Quality News',
    tags: ['health-advisory', 'sensitive-groups', 'precaution'],
    author: 'Dr. Eka Putri',
  },
  {
    id: '5',
    slug: 'air-quality-index-good-medan-nov2025',
    title: 'Medan Achieves Good Air Quality Through Coastal Wind Patterns',
    excerpt: 'Medan benefits from favorable coastal wind patterns maintaining consistently good air quality levels.',
    content: `Medan continues to enjoy excellent air quality due to its geographical advantage of coastal wind patterns that effectively disperse pollutants.

The city's maritime location acts as a natural air purification mechanism, allowing for constant air circulation. Combined with the city's ongoing environmental initiatives, air quality remains optimal.

Residents and visitors can engage in all outdoor activities without health concerns related to air quality.`,
    aqiScore: 38,
    aqiCategory: 'good',
    location: 'Medan',
    date: '2025-11-09',
    keyPollutants: [
      { name: 'PM2.5', level: '18 µg/m³' },
      { name: 'O₃', level: '32 ppb' },
      { name: 'NO₂', level: '22 ppb' },
    ],
    category: 'Air Quality News',
    tags: ['coastal-advantage', 'good-quality', 'natural-patterns'],
    author: 'Dr. Reza Ahmad',
  },
]

export function getArticle(slug: string): Article | undefined {
  return mockArticles.find((article) => article.slug === slug)
}

export function getRecentArticles(limit: number = 5, excludeSlug?: string): Article[] {
  return mockArticles
    .filter((article) => article.slug !== excludeSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

export function getRelatedArticles(tags: string[], limit: number = 3, excludeSlug?: string): Article[] {
  return mockArticles
    .filter((article) => article.slug !== excludeSlug && article.tags.some((tag) => tags.includes(tag)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}
