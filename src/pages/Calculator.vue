<script setup>
import { ref, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'
import SegControl from '../components/SegControl.vue'
import CustomSelect from '../components/CustomSelect.vue'
import FoodSearch from '../components/FoodSearch.vue'
import FaqSection from '../components/FaqSection.vue'
import FeedbackForm from '../components/FeedbackForm.vue'
import { calculate, toKg, fromKg, localeFromPath } from '../lib/calc.js'
import { TOOL_IDS, toolI18nKey, toolPagePath } from '../lib/tool-pages.js'

const { t, tm } = useI18n()
const route = useRoute()
const locale = computed(() => localeFromPath(route.path))

/* Calculator-matrix tool pages for internal linking. */
const toolsLinks = computed(() =>
  TOOL_IDS.map((id) => ({
    name: t(`${toolI18nKey(id)}.name`),
    tagline: t(`${toolI18nKey(id)}.tagline`),
    path: toolPagePath(locale.value, id),
  })),
)

/* ---------------- SEO head (per locale, prerendered by vite-ssg) ---------------- */
const SITE = 'https://akarishiki233.github.io/cat-weight-loss-calculator'
const pathFor = (l) => (l === 'en' ? '/' : `/${l}/`)
const stripHtml = (s) =>
  String(s)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

useHead({
  htmlAttrs: { lang: computed(() => (locale.value === 'zh' ? 'zh-CN' : locale.value)) },
  title: computed(() => t('meta.title')),
  meta: [
    { name: 'description', content: computed(() => t('meta.description')) },
    { property: 'og:title', content: computed(() => t('meta.title')) },
    { property: 'og:description', content: computed(() => t('meta.ogDescription')) },
    { property: 'og:type', content: 'website' },
  ],
  link: [
    { rel: 'canonical', href: computed(() => SITE + pathFor(locale.value)) },
    ...['en', 'zh', 'ja', 'ko'].map((l) => ({
      rel: 'alternate',
      hreflang: l === 'zh' ? 'zh-CN' : l,
      href: SITE + pathFor(l),
    })),
    { rel: 'alternate', hreflang: 'x-default', href: SITE + '/' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: tm('faq.items').map((item) => ({
            '@type': 'Question',
            name: stripHtml(item.q),
            acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.a) },
          })),
        }),
      ),
    },
  ],
})

/* ---------------- state ---------------- */
const breed = ref('')
const weight = ref(4.5)
const weightInput = ref(null)
const weightFlash = ref(false)
const unit = ref('kg') // 'kg' | 'alt' (lb, or 斤 on zh)
const stage = ref('adult')
const neutered = ref('yes')
const activity = ref('mid')
const goal = ref('maintain')
const densityMode = ref('manual')
const density = ref(3600)
const pickedFood = ref(null)
const result = ref(null)
const kcalShown = ref(0)
const portionWidth = ref(0)
const resultCard = ref(null)

/* ---------------- unit toggle ---------------- */
function setUnit(u) {
  if (unit.value === u) return
  const w = parseFloat(weight.value)
  if (!isNaN(w) && w > 0) {
    weight.value = +(
      u === 'kg' ? toKg(w, 'alt', locale.value) : fromKg(w, 'kg', locale.value)
    ).toFixed(1)
  }
  unit.value = u
}

/* ---------------- breed ---------------- */
function onBreedPick(o) {
  if (!o.value) return // placeholder = clear
  unit.value = 'kg'
  weight.value = parseFloat(o.value)
  weightFlash.value = true
  setTimeout(() => (weightFlash.value = false), 900)
}

/* ---------------- calculate ---------------- */
function countUp(target, dur = 900) {
  const t0 = performance.now()
  const tick = (t) => {
    const p = Math.max(0, Math.min(1, (t - t0) / dur))
    const e = 1 - Math.pow(1 - p, 3)
    kcalShown.value = Math.round(target * e)
    if (p < 1) requestAnimationFrame(tick)
    else kcalShown.value = target
  }
  requestAnimationFrame(tick)
}

function calc() {
  const w = parseFloat(weight.value)
  if (!w || w <= 0) {
    weightInput.value?.focus()
    return
  }
  const kg = toKg(w, unit.value, locale.value)
  const d =
    densityMode.value === 'search' && pickedFood.value
      ? pickedFood.value.kcal_per_kg
      : parseFloat(density.value) || 3600
  const r = calculate({
    weightKg: kg,
    stage: stage.value,
    neutered: neutered.value,
    activity: activity.value,
    goal: goal.value,
    density: d,
  })
  result.value = r
  portionWidth.value = 0
  countUp(r.kcal)
  nextTick(() => {
    requestAnimationFrame(() => {
      portionWidth.value = Math.min(100, (r.grams / 150) * 100)
    })
    setTimeout(
      () => resultCard.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      60,
    )
  })
}

const densityModes = computed(() => [
  { value: 'manual', label: t('density.manual') },
  { value: 'search', label: t('density.search') },
])

const gramsText = computed(() =>
  result.value ? t('result.gramsTpl', { g: result.value.grams.toFixed(0) }) : '',
)
const mealsHtml = computed(() =>
  result.value
    ? t('result.mealsTpl', { g: (result.value.grams / 2).toFixed(0) })
    : '',
)
const portionText = computed(() =>
  result.value ? t('result.portionTpl', { g: result.value.grams.toFixed(0) }) : '',
)
const tipText = computed(() =>
  result.value ? '💡 ' + t('result.' + result.value.tip) : '',
)
</script>

<template>
  <header>
    <svg class="cat-face" viewBox="0 0 100 100" aria-hidden="true">
      <polygon points="22,38 14,10 40,24" fill="#fbbf24" />
      <polygon points="78,38 86,10 60,24" fill="#fbbf24" />
      <polygon points="24,32 19,16 36,25" fill="#f59e0b" />
      <polygon points="76,32 81,16 64,25" fill="#f59e0b" />
      <circle cx="50" cy="58" r="34" fill="#fbbf24" />
      <ellipse class="eye" cx="38" cy="54" rx="5" ry="7" fill="#2e2620" />
      <ellipse class="eye right" cx="62" cy="54" rx="5" ry="7" fill="#2e2620" />
      <circle cx="40" cy="52" r="1.8" fill="#fff" /><circle cx="64" cy="52" r="1.8" fill="#fff" />
      <polygon points="50,66 44,60 56,60" fill="#e8734a" />
      <path d="M50,66 Q50,72 44,72 M50,66 Q50,72 56,72" stroke="#2e2620" stroke-width="2" fill="none" stroke-linecap="round" />
      <g stroke="#b45309" stroke-width="1.6" stroke-linecap="round">
        <line x1="20" y1="60" x2="6" y2="56" /><line x1="20" y1="66" x2="7" y2="68" />
        <line x1="80" y1="60" x2="94" y2="56" /><line x1="80" y1="66" x2="93" y2="68" />
      </g>
      <ellipse cx="30" cy="64" rx="6" ry="4" fill="#f59e0b" opacity=".5" />
      <ellipse cx="70" cy="64" rx="6" ry="4" fill="#f59e0b" opacity=".5" />
    </svg>
    <h1 v-html="t('header.title')"></h1>
    <p class="sub" v-html="t('header.sub')"></p>
  </header>

  <div v-reveal class="card">
    <h2><span class="step">1</span> <span v-html="t('breed.title')"></span></h2>
    <CustomSelect
      v-model="breed"
      :options="tm('breed.options')"
      :placeholder="t('breed.placeholder')"
      :aria-label="t('breed.placeholder')"
      @pick="onBreedPick"
    />
    <p class="hint" v-html="t('breed.hint')"></p>

    <h2 style="margin-top: 22px"><span class="step">2</span> {{ t('weight.title') }}</h2>
    <div class="row">
      <div>
        <input
          ref="weightInput"
          v-model="weight"
          type="number"
          min="0.5"
          max="30"
          step="0.1"
          inputmode="decimal"
          :aria-label="t('weight.title')"
          :class="{ flash: weightFlash }"
        />
      </div>
      <div style="max-width: 140px">
        <div class="unit-toggle" :class="{ lb: unit !== 'kg' }">
          <div class="pill"></div>
          <button type="button" :class="{ active: unit === 'kg' }" @click="setUnit('kg')">{{ t('unit.kg') }}</button>
          <button type="button" :class="{ active: unit !== 'kg' }" @click="setUnit('alt')">{{ t('unit.alt') }}</button>
        </div>
      </div>
    </div>
    <p v-if="t('unit.hint')" class="hint">{{ t('unit.hint') }}</p>
  </div>

  <div v-reveal class="card">
    <h2><span class="step">3</span> {{ t('lifestyleTitle') }}</h2>
    <label v-html="t('lifeStage.label')"></label>
    <SegControl v-model="stage" :options="tm('lifeStage.options')" :cols="3" />

    <div id="neuterRow" :class="{ hide: stage !== 'adult' }">
      <label v-html="t('neuter.label')"></label>
      <SegControl v-model="neutered" :options="tm('neuter.options')" :cols="2" />
    </div>

    <label v-html="t('activity.label')"></label>
    <SegControl v-model="activity" :options="tm('activity.options')" :cols="3" />

    <label v-html="t('goal.label')"></label>
    <SegControl v-model="goal" :options="tm('goal.options')" :cols="2" />

    <div class="density-block">
      <label v-html="t('density.label')"></label>
      <SegControl v-model="densityMode" :options="densityModes" :cols="2" />
      <div class="density-input" v-show="densityMode === 'manual'">
        <input v-model="density" type="number" min="1000" max="6000" step="50" />
        <p class="hint" v-html="t('density.manualHint')"></p>
      </div>
      <div class="density-input" v-show="densityMode === 'search'">
        <FoodSearch v-model="pickedFood" :locale="locale" />
      </div>
    </div>
    <p class="disclaimer" v-html="t('foodDb.disclaimer')"></p>

    <button class="calc" @click="calc">{{ t('calcBtn') }}</button>
  </div>

  <div v-if="result" id="result" class="show">
    <div ref="resultCard" class="card">
      <h2 v-html="t('result.title')"></h2>
      <div class="kcal-line">
        <div class="big-num">{{ kcalShown }}</div>
        <div class="big-num-unit" v-html="t('result.perDay')"></div>
      </div>
      <div class="portion">
        <div class="portion-top"><span>{{ t('result.portion') }}</span><span>{{ portionText }}</span></div>
        <div class="portion-bar"><div class="portion-fill" :style="{ width: portionWidth + '%' }"></div></div>
      </div>
      <div style="margin-top: 10px">
        <div class="stat"><span>{{ t('result.gramsLabel') }}</span><b>{{ gramsText }}</b></div>
        <div class="stat"><span>{{ t('result.mealsLabel') }}</span><b v-html="mealsHtml"></b></div>
        <div class="stat"><span>{{ t('result.rerLabel') }}</span><b>{{ result.rer }} kcal</b></div>
      </div>
      <div class="tip">{{ tipText }}</div>
    </div>
  </div>

  <FaqSection />

  <section v-reveal class="more-foods">
    <h2>{{ t('tools.title') }}</h2>
    <p class="sub">{{ t('tools.sub') }}</p>
    <div class="tool-cards">
      <RouterLink v-for="tl in toolsLinks" :key="tl.path" :to="tl.path" class="tool-card">
        <b>{{ tl.name }}</b>
        <span>{{ tl.tagline }}</span>
      </RouterLink>
    </div>
  </section>

  <FeedbackForm />

  <div v-reveal class="disclaimer" v-html="t('disclaimer')"></div>

  <footer>
    <div class="paws">🐾 🐾 🐾</div>
    {{ t('footer') }}
  </footer>
</template>

<style>
.more-foods {
  margin: 28px 0;
}
.more-foods h2 {
  font-size: 1.2rem;
  margin: 0 0 6px;
}
.more-foods .sub {
  color: var(--muted, #8a7f72);
  font-size: 0.92rem;
  margin: 0 0 14px;
}
.tool-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}
.tool-card {
  display: block;
  padding: 14px 16px;
  border: 1px solid var(--card-border, #e8e2d9);
  border-radius: 14px;
  color: inherit;
  text-decoration: none;
  background: var(--card-bg, #fff);
}
.tool-card:hover {
  border-color: var(--accent, #e07b39);
}
.tool-card b {
  display: block;
  margin-bottom: 4px;
}
.tool-card span {
  font-size: 0.85rem;
  color: var(--muted, #8a7f72);
}
</style>
