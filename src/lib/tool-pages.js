// Pure helpers for the calculator-matrix tool pages (water / bcs / age).
// No Vue / no DOM — shared by routes.js, scripts/gen-sitemap.mjs and the selftest.

export const TOOL_IDS = ['water', 'bcs', 'age']
export const TOOL_LOCALES = ['en', 'zh', 'ja', 'ko']

/** i18n top-level key for a tool, e.g. 'toolwater' */
export function toolI18nKey(id) {
  return 'tool' + id
}

/** URL path for a tool page, e.g. /zh/water/ */
export function toolPagePath(locale, id) {
  return (locale === 'en' ? '' : `/${locale}`) + `/${id}/`
}

/** Every tool page to prerender: [{ locale, id, path }] (3 tools × 4 locales). */
export function allToolPages() {
  const pages = []
  for (const id of TOOL_IDS) {
    for (const locale of TOOL_LOCALES) {
      pages.push({ locale, id, path: toolPagePath(locale, id) })
    }
  }
  return pages
}
