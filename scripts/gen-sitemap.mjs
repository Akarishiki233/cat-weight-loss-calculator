// Regenerates public/sitemap.xml from the actual route list so programmatic
// pages (foods/…) can never drift out of the sitemap. Run before vite-ssg build.
import { writeFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { allFoodPages } from '../src/lib/food-pages.js'
import { allToolPages } from '../src/lib/tool-pages.js'
import { allArticlePages } from '../src/lib/article-pages.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://akarishiki233.github.io/cat-weight-loss-calculator'
const TODAY = new Date().toISOString().slice(0, 10)

const foods = JSON.parse(
  readFileSync(join(root, 'src/data/cat-foods.json'), 'utf-8'),
).foods

const urls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/zh/', priority: '0.9', changefreq: 'weekly' },
  { loc: '/ja/', priority: '0.9', changefreq: 'weekly' },
  { loc: '/ko/', priority: '0.9', changefreq: 'weekly' },
]
for (const p of allFoodPages(foods)) {
  urls.push({ loc: p.path, priority: '0.7', changefreq: 'monthly' })
}
for (const p of allToolPages()) {
  urls.push({ loc: p.path, priority: '0.8', changefreq: 'monthly' })
}
for (const p of allArticlePages()) {
  urls.push({ loc: p.path, priority: '0.8', changefreq: 'monthly' })
}

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${SITE}${u.loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n') +
  `\n</urlset>\n`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml: ${urls.length} urls`)
