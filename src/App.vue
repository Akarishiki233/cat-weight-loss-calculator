<script setup>
import { computed } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { localeFromPath } from './lib/calc.js'

const route = useRoute()
const locale = computed(() => localeFromPath(route.path))

const langs = [
  { code: 'en', label: 'EN', path: '/' },
  { code: 'zh', label: '中文', path: '/zh/' },
  { code: 'ja', label: '日本語', path: '/ja/' },
  { code: 'ko', label: '한국어', path: '/ko/' },
]
</script>

<template>
  <div class="wrap">
    <nav class="lang-switch" aria-label="Language">
      <RouterLink
        v-for="l in langs"
        :key="l.code"
        :to="l.path"
        :class="{ active: locale === l.code }"
      >{{ l.label }}</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
