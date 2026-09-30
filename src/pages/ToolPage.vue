<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'
import { localeFromPath } from '../lib/calc.js'
import { TOOL_LOCALES, toolI18nKey, toolPagePath } from '../lib/tool-pages.js'

const props = defineProps({ toolId: { type: String, required: true } })
const { t, tm } = useI18n()
const route = useRoute()
const locale = computed(() => localeFromPath(route.path))
const key = computed(() => toolI18nKey(props.toolId))
const tk = (k, params) => t(`${key.value}.${k}`, params)

/* ---------- water ---------- */
const waterWeight = ref(4.5)
const waterMl = computed(() => Math.round(waterWeight.value * 50))
const waterLo = computed(() => Math.round(waterWeight.value * 40))
const waterHi = computed(() => Math.round(waterWeight.value * 60))
const waterRows = computed(() => [2, 3, 4, 5, 6, 7, 8].map((w) => ({ w, ml: w * 50 })))

/* ---------- bcs ---------- */
const bcsScore = ref(5)
const bcsWeight = ref(4.5)
const bcsDescs = computed(() => tm('toolbcs.descs'))
const bcsCat = computed(() =>
  bcsScore.value < 4 ? tk('catUnder') : bcsScore.value <= 5 ? tk('catIdeal') : tk('catOver'),
)
const bcsIdeal = computed(() =>
  bcsScore.value > 5
    ? (bcsWeight.value / (1 + 0.1 * (bcsScore.value - 5))).toFixed(1)
    : null,
)

/* ---------- age ---------- */
const catAge = ref(5)
const humanYears = computed(() => {
  const a = catAge.value
  if (a <= 0) return 0
  if (a <= 1) return Math.round(a * 15)
  if (a <= 2) return Math.round(15 + (a - 1) * 9)
  return 24 + Math.round((a - 2) * 4)
})
const ageStage = computed(() =>
  catAge.value < 1 ? tk('stageKitten') : catAge.value < 11 ? tk('stageAdult') : tk('stageSenior'),
)
const ageRows = computed(() =>
  Array.from({ length: 20 }, (_, i) => {
    const a = i + 1
    return { a, h: a <= 1 ? 15 : a <= 2 ? 24 : 24 + (a - 2) * 4 }
  }),
)

/* ---------- SEO ---------- */
const SITE = 'https://akarishiki233.github.io/cat-weight-loss-calculator'
const pathFor = (l) => toolPagePath(l, props.toolId)
const hreflangOf = (l) => (l === 'zh' ? 'zh-CN' : l)
const faqItems = computed(() => [
  { q: tk('faq1q'), a: tk('faq1a') },
  { q: tk('faq2q'), a: tk('faq2a') },
])

useHead({
  htmlAttrs: { lang: computed(() => hreflangOf(locale.value)) },
  title: computed(() => tk('title')),
  meta: [
    { name: 'description', content: computed(() => tk('metaDesc')) },
    { property: 'og:title', content: computed(() => tk('title')) },
    { property: 'og:description', content: computed(() => tk('metaDesc')) },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: computed(() => SITE + pathFor(locale.value)) },
    ...TOOL_LOCALES.map((l) => ({
      rel: 'alternate',
      hreflang: hreflangOf(l),
      href: SITE + pathFor(l),
    })),
    { rel: 'alternate', hreflang: 'x-default', href: SITE + pathFor('en') },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.value.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }),
      ),
    },
  ],
})
</script>

<template>
  <main class="tool-page">
    <h1>{{ tk('title') }}</h1>
    <p class="intro">{{ tk('intro') }}</p>

    <!-- water intake calculator -->
    <section v-if="toolId === 'water'" class="card">
      <label class="fld">
        <span>{{ tk('weightLabel') }}</span>
        <input v-model.number="waterWeight" type="number" min="1" max="15" step="0.5" />
      </label>
      <div class="big-result">{{ tk('resultMl', { ml: waterMl }) }}</div>
      <p class="note">{{ tk('rangeNote', { lo: waterLo, hi: waterHi }) }}</p>
      <h2>{{ tk('tableTitle') }}</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>{{ tk('thWeight') }}</th>
            <th>{{ tk('thWater') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in waterRows" :key="r.w">
            <td>{{ r.w }} kg</td>
            <td><strong>{{ r.ml }} ml</strong></td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- bcs assessment -->
    <section v-if="toolId === 'bcs'" class="card">
      <div class="fld">
        <span>{{ tk('scoreLabel') }}</span>
        <div class="bcs-btns">
          <button
            v-for="n in 9"
            :key="n"
            type="button"
            :class="{ active: bcsScore === n }"
            @click="bcsScore = n"
          >
            {{ n }}
          </button>
        </div>
      </div>
      <div class="big-result">{{ bcsCat }}</div>
      <p class="note">{{ bcsDescs[bcsScore - 1] }}</p>
      <div v-if="bcsIdeal" class="fld ideal-row">
        <label>
          <span>{{ tk('weightLabel') }}</span>
          <input v-model.number="bcsWeight" type="number" min="1" max="15" step="0.5" />
        </label>
        <p class="note">{{ tk('idealNote', { w: bcsIdeal }) }}</p>
      </div>
    </section>

    <!-- age converter -->
    <section v-if="toolId === 'age'" class="card">
      <label class="fld">
        <span>{{ tk('ageLabel') }}</span>
        <input v-model.number="catAge" type="number" min="0.5" max="25" step="0.5" />
      </label>
      <div class="big-result">{{ tk('resultAge', { h: humanYears }) }}</div>
      <p class="note">{{ ageStage }}</p>
      <h2>{{ tk('tableTitle') }}</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>{{ tk('thCat') }}</th>
            <th>{{ tk('thHuman') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in ageRows" :key="r.a">
            <td>{{ r.a }}</td>
            <td><strong>{{ r.h }}</strong></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="card">
      <h2>{{ tk('methodTitle') }}</h2>
      <p>{{ tk('methodBody') }}</p>
    </section>

    <section class="card">
      <h2>{{ tk('faqTitle') }}</h2>
      <div v-for="(item, i) in faqItems" :key="i" class="faq-item">
        <h3>{{ item.q }}</h3>
        <p>{{ item.a }}</p>
      </div>
    </section>

    <p class="disclaimer">{{ tk('disclaimer') }}</p>

    <section class="card cta">
      <h2>{{ tk('ctaTitle') }}</h2>
      <p>{{ tk('ctaBody') }}</p>
      <RouterLink class="btn" :to="locale === 'en' ? '/' : `/${locale}/`">
        {{ tk('ctaBtn') }}
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.tool-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px 48px;
}
h1 {
  font-size: 1.6rem;
  line-height: 1.35;
  margin: 8px 0 12px;
}
.intro {
  color: var(--muted, #8a7f72);
  line-height: 1.6;
  margin: 0 0 20px;
}
.card {
  background: var(--card-bg, #fff);
  border: 1px solid var(--card-border, #e8e2d9);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 16px;
}
.card h2 {
  font-size: 1.15rem;
  margin: 18px 0 12px;
}
.card h2:first-child {
  margin-top: 0;
}
.fld {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  font-weight: 600;
}
.fld input {
  width: 90px;
  padding: 10px 12px;
  font-size: 1rem;
  border: 1px solid var(--card-border, #e8e2d9);
  border-radius: 10px;
}
.big-result {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--accent, #e07b39);
  margin: 12px 0 4px;
}
.note {
  color: var(--muted, #8a7f72);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 6px 0 0;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th,
.data-table td {
  padding: 9px 8px;
  text-align: center;
  border-bottom: 1px solid var(--card-border, #e8e2d9);
}
.data-table th {
  font-size: 0.85rem;
  color: var(--muted, #8a7f72);
}
.bcs-btns {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.bcs-btns button {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--card-border, #e8e2d9);
  background: var(--card-bg, #fff);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}
.bcs-btns button.active {
  background: var(--accent, #e07b39);
  border-color: var(--accent, #e07b39);
  color: #fff;
}
.ideal-row {
  display: block;
  margin-top: 14px;
}
.ideal-row label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}
.faq-item h3 {
  font-size: 1rem;
  margin: 14px 0 6px;
}
.faq-item p {
  margin: 0 0 4px;
  line-height: 1.6;
}
.disclaimer {
  font-size: 0.85rem;
  color: var(--muted, #8a7f72);
  line-height: 1.6;
  margin: 4px 2px 20px;
}
.cta {
  text-align: center;
}
.btn {
  display: inline-block;
  margin-top: 8px;
  padding: 12px 28px;
  border-radius: 999px;
  background: var(--accent, #e07b39);
  color: #fff;
  font-weight: 700;
  text-decoration: none;
}
</style>
