<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import foods from '../data/cat-foods.json'
import { foodDbFor, foodBrand, foodProduct, searchFoods } from '../lib/calc.js'

const props = defineProps({
  locale: { type: String, required: true }, // en | zh | ja | ko
})
const picked = defineModel({ default: null })

const { t } = useI18n()
const query = ref('')

const isZh = computed(() => props.locale === 'zh')
// zh sees all foods; other locales only see intl-market foods
const db = computed(() => foodDbFor(props.locale, foods.foods))
const results = computed(() => searchFoods(db.value, query.value))
const noMatch = computed(() => query.value.trim().length >= 2 && results.value.length === 0)

const brandOf = (f) => foodBrand(f, isZh.value)
const productOf = (f) => foodProduct(f, isZh.value)

function pick(f) {
  picked.value = f
  query.value = ''
}
function clear() {
  picked.value = null
}
</script>

<template>
  <div v-if="!picked">
    <input
      v-model="query"
      type="search"
      :placeholder="t('density.searchPlaceholder')"
      :aria-label="t('density.search')"
      autocomplete="off"
    />
    <div v-if="results.length" class="food-results">
      <button
        v-for="f in results"
        :key="f.id"
        type="button"
        class="food-item"
        @click="pick(f)"
      >
        <span><span class="fn">{{ brandOf(f) }}</span><small>{{ productOf(f) }}</small></span>
        <span class="fk">{{ f.kcal_per_kg }} kcal/kg</span>
      </button>
    </div>
    <p v-if="noMatch" class="hint">{{ t('foodDb.none') }}</p>
    <p class="hint">{{ t('foodDb.loaded', { n: db.length }) }}</p>
  </div>
  <div v-else class="food-picked">
    <span><span class="fn">{{ brandOf(picked) }} · {{ productOf(picked) }}</span><br /><small>{{ picked.kcal_per_kg }} kcal/kg</small></span>
    <button type="button" @click="clear">{{ t('foodDb.clear') }}</button>
  </div>
</template>
