// Pure helpers for the programmatic "how much to feed" pages.
// No Vue / no DOM — shared by routes.js, scripts/gen-sitemap.mjs and the selftest.

export const FOOD_LOCALES = ['en', 'zh', 'ja', 'ko']

/** Locales where a food's page exists. Mirrors foodDbFor()'s market filter. */
export function pageLocales(food) {
  return food.market === 'cn' ? ['zh'] : FOOD_LOCALES
}

/** URL path for a food page, e.g. /zh/foods/fuliejia-tizhong-guanli/ */
export function foodPagePath(locale, id) {
  return (locale === 'en' ? '' : `/${locale}`) + `/foods/${id}/`
}

/** Every food page to prerender: [{ locale, id, path }]. */
export function allFoodPages(foods) {
  const pages = []
  for (const f of foods) {
    for (const locale of pageLocales(f)) {
      pages.push({ locale, id: f.id, path: foodPagePath(locale, f.id) })
    }
  }
  return pages
}

/** Dist file for a page path, e.g. dist/zh/foods/<id>/index.html */
export function distFileFor(path) {
  const p = path.replace(/^\/+|\/+$/g, '')
  return p === '' ? 'index.html' : `${p}/index.html`
}
