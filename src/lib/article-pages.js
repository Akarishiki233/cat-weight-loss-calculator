// Pure helpers for long-form guide articles (the "content matrix" half of the
// programmatic-SEO playbook). The water guide shipped zh-first to validate the
// format; weightloss / catfood / senior ship in all four locales at once.
// No Vue / no DOM — shared by routes.js, scripts/gen-sitemap.mjs and the selftest.

import { toolPagePath } from './tool-pages.js'

export const ARTICLE_IDS = ['water', 'weightloss', 'catfood', 'senior']
export const ARTICLE_LOCALES = {
  water: ['zh'],
  weightloss: ['en', 'zh', 'ja', 'ko'],
  catfood: ['en', 'zh', 'ja', 'ko'],
  senior: ['en', 'zh', 'ja', 'ko'],
}

/** Publish date per article (used for datePublished / dateLine). */
export const ARTICLE_DATES = {
  water: '2026-09-30',
  weightloss: '2026-10-01',
  catfood: '2026-10-01',
  senior: '2026-10-01',
}

/** Where each article's CTA button points: the paired tool, or the calculator home. */
export const ARTICLE_CTA = {
  water: { type: 'tool', id: 'water' },
  weightloss: { type: 'home' },
  catfood: { type: 'home' },
  senior: { type: 'tool', id: 'age' },
}

/** Publisher/author org name per locale (Article JSON-LD). */
export const ARTICLE_AUTHOR = {
  en: 'Cat Calorie Calculator',
  zh: '猫咪热量计算器',
  ja: '猫カロリー計算機',
  ko: '고양이 칼로리 계산기',
}

/** i18n top-level key for an article, e.g. 'articleguides_water' */
export function articleI18nKey(id) {
  return 'articleguides_' + id
}

/** URL path for an article page, e.g. /zh/guides/water/ */
export function articlePagePath(locale, id) {
  return (locale === 'en' ? '' : `/${locale}`) + `/guides/${id}/`
}

/** hreflang value for a locale (matches ToolPage / FoodPage / Calculator). */
export function articleHreflangOf(locale) {
  return locale === 'zh' ? 'zh-CN' : locale
}

/** CTA destination path for an article in a locale. */
export function articleCtaPath(locale, id) {
  const c = ARTICLE_CTA[id] || { type: 'home' }
  if (c.type === 'tool') return toolPagePath(locale, c.id)
  return locale === 'en' ? '/' : `/${locale}/`
}

/** Every article page to prerender: [{ locale, id, path }] */
export function allArticlePages() {
  const pages = []
  for (const id of ARTICLE_IDS) {
    for (const locale of ARTICLE_LOCALES[id] || []) {
      pages.push({ locale, id, path: articlePagePath(locale, id) })
    }
  }
  return pages
}
