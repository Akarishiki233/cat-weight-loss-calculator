// Self-test for src/lib/calc.js — pure logic, no DOM.
// Run: node scripts/selftest-lib.mjs   (exit 0 = all pass)
import {
  rer, derFactor, calculate, toKg, fromKg,
  foodDbFor, foodBrand, foodProduct, searchFoods, localeFromPath,
} from '../src/lib/calc.js'
import foods from '../src/data/cat-foods.json' with { type: 'json' }

let pass = 0, fail = 0
const ok = (name, cond, extra = '') => {
  if (cond) { pass++; console.log(`  ok   ${name}`) }
  else { fail++; console.log(`  FAIL ${name} ${extra}`) }
}
const approx = (a, b, eps = 0.01) => Math.abs(a - b) < eps

console.log('== calc math ==')
ok('rer(4.5) ≈ 216', approx(rer(4.5), 216, 1), `got ${rer(4.5)}`)
const base = calculate({ weightKg: 4.5, stage: 'adult', neutered: 'yes', activity: 'mid', goal: 'maintain', density: 3600 })
ok('baseline 281 kcal', base.kcal === 281, `got ${base.kcal}`)
ok('baseline 78 g', base.grams.toFixed(0) === '78', `got ${base.grams}`)
ok('baseline rer field', base.rer === 216)
const lose = calculate({ weightKg: 4.5, stage: 'adult', neutered: 'yes', activity: 'mid', goal: 'lose', density: 3600 })
ok('lose goal 173 kcal', lose.kcal === 173, `got ${lose.kcal}`)
ok('lose tip key', lose.tip === 'tipLose')
const kit = calculate({ weightKg: 2, stage: 'kitten', neutered: 'yes', activity: 'mid', goal: 'maintain', density: 3600 })
ok('kitten factor 2.5', kit.kcal === Math.round(rer(2) * 2.5), `got ${kit.kcal}`)
ok('kitten tip key', kit.tip === 'tipKitten')
const senior = calculate({ weightKg: 4.5, stage: 'senior', neutered: 'yes', activity: 'low', goal: 'maintain', density: 3600 })
ok('senior low factor 1.1', senior.kcal === Math.round(rer(4.5) * 1.1))
const intact = calculate({ weightKg: 4.5, stage: 'adult', neutered: 'no', activity: 'high', goal: 'maintain', density: 3600 })
ok('intact high factor 1.6', intact.kcal === Math.round(rer(4.5) * 1.6))
ok('grams scale with density', approx(
  calculate({ weightKg: 4.5, stage: 'adult', neutered: 'yes', activity: 'mid', goal: 'maintain', density: 1800 }).grams,
  base.grams * 2, 0.5))

console.log('== units ==')
ok('zh: 4.5kg -> 9 jin', fromKg(4.5, 'kg', 'zh') === 9)
ok('zh: 9 jin -> 4.5kg', approx(toKg(9, 'alt', 'zh'), 4.5))
ok('en: 4.5kg -> 9.9 lb (ui rounds)', +fromKg(4.5, 'kg', 'en').toFixed(1) === 9.9)
ok('en: 9.9 lb -> 4.5kg', approx(toKg(9.9, 'alt', 'en'), 4.5, 0.05))
ok('alt passthrough', fromKg(9, 'alt', 'zh') === 9 && toKg(4.5, 'kg', 'en') === 4.5)
ok('ja/ko use lb too', fromKg(1, 'kg', 'ja') === fromKg(1, 'kg', 'en'))

console.log('== food db market filter ==')
ok('total 35 foods', foods.foods.length === 35, `got ${foods.foods.length}`)
const zhDb = foodDbFor('zh', foods.foods)
const enDb = foodDbFor('en', foods.foods)
ok('zh sees all 35', zhDb.length === 35)
ok('en sees 28 intl', enDb.length === 28, `got ${enDb.length}`)
ok('ja/ko same as en', foodDbFor('ja', foods.foods).length === 28 && foodDbFor('ko', foods.foods).length === 28)
ok('en has no cn-market', enDb.every((f) => f.market !== 'cn'))
ok('zh has 7 cn-market', zhDb.filter((f) => f.market === 'cn').length === 7)

console.log('== food search ==')
ok('needs 2 chars', searchFoods(enDb, 'r').length === 0)
ok('en finds royal', searchFoods(enDb, 'royal').length > 0)
ok('en cannot find 弗列加特', searchFoods(enDb, '弗列加特').length === 0)
ok('zh finds 弗列加特', searchFoods(zhDb, '弗列加特').length > 0)
ok('max 8 results', searchFoods(enDb, 'chicken').length <= 8)
const f0 = foods.foods[0]
ok('brand zh preferred', foodBrand(f0, true) === (f0.brand_zh || f0.brand))
ok('brand en only', foodBrand(f0, false) === f0.brand)
ok('product en only', foodProduct(f0, false) === f0.product)

console.log('== routing ==')
ok('/ -> en', localeFromPath('/') === 'en')
ok('/zh/ -> zh', localeFromPath('/zh/') === 'zh')
ok('/ja/ -> ja', localeFromPath('/ja/') === 'ja')
ok('/ko/ -> ko', localeFromPath('/ko/') === 'ko')

console.log(`\nlib: ${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
