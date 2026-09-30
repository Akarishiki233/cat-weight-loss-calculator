<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'
import { rer, localeFromPath, foodBrand, foodProduct } from '../lib/calc.js'
import { pageLocales, foodPagePath } from '../lib/food-pages.js'
import foodsData from '../data/cat-foods.json'

const props = defineProps({ foodId: { type: String, required: true } })
const { t } = useI18n()
const route = useRoute()
const locale = computed(() => localeFromPath(route.path))
const isZh = computed(() => locale.value === 'zh')

const food = computed(() => foodsData.foods.find((f) => f.id === props.foodId))
const name = computed(() => {
  const f = food.value
  return `${foodBrand(f, isZh.value)} ${foodProduct(f, isZh.value)}`
})

// Feeding table: example adult weights × maintain (DER 1.3) / safe loss (0.8).
const rows = computed(() => {
  const kcalPerKg = food.value.kcal_per_kg
  return [3, 4, 5, 6].map((w) => {
    const r = rer(w)
    const kcalMaintain = Math.round(r * 1.3)
    const kcalLose = Math.round(r * 0.8)
    return {
      w,
      kcalMaintain,
      kcalLose,
      gMaintain: Math.round((kcalMaintain / kcalPerKg) * 1000),
      gLose: Math.round((kcalLose / kcalPerKg) * 1000),
    }
  })
})
const row4 = computed(() => rows.value.find((r) => r.w === 4))

const faqItems = computed(() => [
  {
    q: t('food.faq1q', { name: name.value }),
    a: t('food.faq1a', {
      g: row4.value.gMaintain,
      kcal: row4.value.kcalMaintain,
    }),
  },
  { q: t('food.faq2q', { name: name.value }), a: t('food.faq2a') },
])

/* ---------------- SEO head (per locale, prerendered by vite-ssg) ---------------- */
const SITE = 'https://akarishiki233.github.io/cat-weight-loss-calculator'
const pathFor = (l) => foodPagePath(l, props.foodId)
const hreflangOf = (l) => (l === 'zh' ? 'zh-CN' : l)

useHead({
  htmlAttrs: { lang: computed(() => hreflangOf(locale.value)) },
  title: computed(() => t('food.title', { name: name.value })),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        t('food.metaDesc', { name: name.value, kcal: food.value.kcal_per_kg }),
      ),
    },
    { property: 'og:title', content: computed(() => t('food.title', { name: name.value })) },
    {
      property: 'og:description',
      content: computed(() =>
        t('food.metaDesc', { name: name.value, kcal: food.value.kcal_per_kg }),
      ),
    },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: computed(() => SITE + pathFor(locale.value)) },
    ...pageLocales(food.value).map((l) => ({
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
  <main class="food-page">
    <h1>{{ t('food.title', { name }) }}</h1>

    <section class="card data-card">
      <div class="kcal-line">
        <span class="kcal-label">{{ t('food.kcalLabel') }}</span>
        <strong class="kcal-value">{{ food.kcal_per_kg }} {{ t('food.perKg') }}</strong>
      </div>
      <p class="note">{{ t('food.note') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('food.tableTitle') }}</h2>
      <table class="feed-table">
        <thead>
          <tr>
            <th>{{ t('food.thWeight') }}</th>
            <th>{{ t('food.thMaintain') }}</th>
            <th>{{ t('food.thLose') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.w">
            <td>{{ r.w }} kg</td>
            <td><strong>{{ r.gMaintain }} g</strong></td>
            <td><strong>{{ r.gLose }} g</strong></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="card">
      <h2>{{ t('food.methodTitle') }}</h2>
      <p>{{ t('food.methodBody') }}</p>
    </section>

    <section class="card">
      <h2>{{ t('food.faqTitle') }}</h2>
      <div v-for="(item, i) in faqItems" :key="i" class="faq-item">
        <h3>{{ item.q }}</h3>
        <p>{{ item.a }}</p>
      </div>
    </section>

    <p class="disclaimer">{{ t('food.disclaimer') }}</p>

    <section class="card cta">
      <h2>{{ t('food.ctaTitle') }}</h2>
      <p>{{ t('food.ctaBody') }}</p>
      <RouterLink class="btn" :to="locale === 'en' ? '/' : `/${locale}/`">
        {{ t('food.ctaBtn') }}
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.food-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px 48px;
}
h1 {
  font-size: 1.6rem;
  line-height: 1.35;
  margin: 8px 0 20px;
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
  margin: 0 0 12px;
}
.kcal-line {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}
.kcal-value {
  font-size: 1.5rem;
  color: var(--accent, #e07b39);
  white-space: nowrap;
}
.note {
  color: var(--muted, #8a7f72);
  font-size: 0.9rem;
  margin: 10px 0 0;
}
.feed-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}
.feed-table th,
.feed-table td {
  padding: 10px 8px;
  text-align: center;
  border-bottom: 1px solid var(--card-border, #e8e2d9);
}
.feed-table th {
  font-size: 0.85rem;
  color: var(--muted, #8a7f72);
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
