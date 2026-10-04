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

/**
 * Related-food id lists for every food, with orphan coverage guarantee.
 * Base rule: same market, same brand first, take up to n.
 * Coverage pass: every food must appear in at least one other food's list
 * (within its market). Orphans are grafted onto the donor whose list has the
 * most redundant same-brand slots; a graft never drops the replaced food to
 * zero inbound (no new orphans created).
 * Pure & deterministic — shared by FoodPage.vue and the selftest.
 */
export function relatedFoodLists(foods, n = 4) {
  const byId = new Map(foods.map((f) => [f.id, f]))
  const lists = new Map()
  for (const f of foods) {
    const sameMarket = foods.filter((o) => o.market === f.market && o.id !== f.id)
    sameMarket.sort((a, b) => (b.brand === f.brand) - (a.brand === f.brand))
    lists.set(f.id, sameMarket.slice(0, n).map((o) => o.id))
  }
  const inbound = new Map()
  const recount = () => {
    for (const f of foods) inbound.set(f.id, 0)
    for (const ids of lists.values()) for (const id of ids) inbound.set(id, inbound.get(id) + 1)
  }
  recount()
  for (let round = 0; round < foods.length; round++) {
    const orphan = foods.find((f) => inbound.get(f.id) === 0)
    if (!orphan) break
    const donors = foods
      .filter(
        (o) =>
          o.market === orphan.market && o.id !== orphan.id && !lists.get(o.id).includes(orphan.id),
      )
      .map((o) => ({
        food: o,
        redundant: lists.get(o.id).filter((id) => byId.get(id).brand === o.brand).length,
      }))
      .sort((a, b) => b.redundant - a.redundant || (a.food.id < b.food.id ? -1 : 1))
    let done = false
    for (const { food: d } of donors) {
      const lst = lists.get(d.id)
      if (lst.length === 0) continue
      // Prefer replacing a redundant same-brand slot (keep one same-brand link).
      let idx = lst.length - 1
      const sameBrandCount = lst.filter((id) => byId.get(id).brand === d.brand).length
      if (sameBrandCount > 1) {
        const ridx = lst.map((id) => byId.get(id).brand).lastIndexOf(d.brand)
        if (ridx >= 0) idx = ridx
      }
      const victim = lst[idx]
      if (inbound.get(victim) <= 1) continue // would create a new orphan
      lst[idx] = orphan.id
      recount()
      done = true
      break
    }
    if (!done) break // no safe donor; leave as-is
  }
  return lists
}

/** Dist file for a page path, e.g. dist/zh/foods/<id>/index.html */
export function distFileFor(path) {
  const p = path.replace(/^\/+|\/+$/g, '')
  return p === '' ? 'index.html' : `${p}/index.html`
}
