// Pure cat-calorie math. No DOM, no Vue — unit-testable in Node.

/** Resting Energy Requirement: 70 × weight_kg^0.75 */
export function rer(weightKg) {
  return 70 * Math.pow(weightKg, 0.75)
}

/**
 * DER multiplier + which i18n tip key to show.
 * Mirrors the v3.x static pages exactly.
 */
export function derFactor({ stage, neutered, activity, goal }) {
  if (goal === 'lose') return { factor: 0.8, tip: 'tipLose' }
  if (stage === 'kitten') return { factor: 2.5, tip: 'tipKitten' }
  if (stage === 'senior')
    return { factor: { low: 1.1, mid: 1.2, high: 1.3 }[activity], tip: 'tipSenior' }
  const table =
    neutered === 'yes'
      ? { low: 1.2, mid: 1.3, high: 1.4 }
      : { low: 1.4, mid: 1.5, high: 1.6 }
  return {
    factor: table[activity],
    tip: activity === 'low' ? 'tipLow' : 'tipDefault',
  }
}

/** Full calculation: returns { rer, kcal, grams, tip } */
export function calculate({ weightKg, stage, neutered, activity, goal, density }) {
  const r = rer(weightKg)
  const { factor, tip } = derFactor({ stage, neutered, activity, goal })
  const kcal = Math.round(r * factor)
  const grams = (kcal / density) * 1000
  return { rer: Math.round(r), kcal, grams, tip }
}

// --- units ---
// en/ja/ko: kg ⇄ lb (2.20462). zh: kg ⇄ 斤 (2 per kg).
const ALT_PER_KG = { zh: 2, en: 2.20462, ja: 2.20462, ko: 2.20462 }

export function toKg(value, unit, locale) {
  if (unit === 'kg') return value
  return value / (ALT_PER_KG[locale] || 2.20462)
}

export function fromKg(kg, unit, locale) {
  if (unit === 'kg') return kg
  return kg * (ALT_PER_KG[locale] || 2.20462)
}

// --- cat food database helpers ---
export function foodDbFor(locale, foods) {
  return locale === 'zh' ? foods : foods.filter((f) => f.market !== 'cn')
}

export function foodBrand(f, isZh) {
  if (isZh) {
    const zh = f.brand_zh || f.brand
    return zh !== f.brand ? `${zh} (${f.brand})` : zh
  }
  return f.brand
}

export function foodProduct(f, isZh) {
  if (isZh) {
    const zh = f.product_zh || f.product
    return zh !== f.product ? `${zh} · ${f.product}` : zh
  }
  return f.product
}

export function searchFoods(db, query, limit = 8) {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  return db
    .filter((f) =>
      [f.brand, f.brand_zh, f.product, f.product_zh].some((s) =>
        (s || '').toLowerCase().includes(q),
      ),
    )
    .slice(0, limit)
}

export function localeFromPath(path) {
  const m = path.match(/\/(zh|ja|ko)(?=\/|$)/)
  return m ? m[1] : 'en'
}
