<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const items = tm('faq.items')
</script>

<template>
  <div v-reveal class="card faq">
    <h2>{{ t('faq.title') }}</h2>
    <details v-for="(item, i) in items" :key="i" :open="i === 0 ? true : undefined">
      <summary>{{ item.q }} <span class="chev">▼</span></summary>
      <div class="acc-body"><div class="acc-inner"><p v-html="item.a"></p></div></div>
    </details>
  </div>
</template>
