// Pure helpers for long-form guide articles (the "content matrix" half of the
// programmatic-SEO playbook). Articles ship zh-first; other locales are added
// per-article once the format and indexing are validated.
// No Vue / no DOM — shared by routes.js, scripts/gen-sitemap.mjs and the selftest.

export const ARTICLE_IDS = ['water']
export const ARTICLE_LOCALES = { water: ['zh'] }

/** i18n top-level key for an article, e.g. 'articleguides_water' */
export function articleI18nKey(id) {
  return 'articleguides_' + id
}

/** URL path for an article page, e.g. /zh/guides/water/ */
export function articlePagePath(locale, id) {
  return (locale === 'en' ? '' : `/${locale}`) + `/guides/${id}/`
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
