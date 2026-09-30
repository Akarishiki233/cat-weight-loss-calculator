<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@vueuse/head'
import { localeFromPath } from '../lib/calc.js'
import { articleI18nKey, articlePagePath } from '../lib/article-pages.js'
import { toolPagePath } from '../lib/tool-pages.js'

const props = defineProps({ articleId: { type: String, required: true } })
const { t, tm } = useI18n()
const route = useRoute()
const locale = computed(() => localeFromPath(route.path))
const key = computed(() => articleI18nKey(props.articleId))
const ak = (k, params) => t(`${key.value}.${k}`, params)
const sections = computed(() => tm(`${key.value}.sections`))
const faqs = computed(() => tm(`${key.value}.faqs`))
const sources = computed(() => tm(`${key.value}.sources`))

const SITE = 'https://akarishiki233.github.io/cat-weight-loss-calculator'
const path = computed(() => articlePagePath(locale.value, props.articleId))
const homePath = computed(() => (locale.value === 'en' ? '/' : `/${locale.value}/`))
const waterToolPath = computed(() => toolPagePath(locale.value, 'water'))
const DATE_PUBLISHED = '2026-09-30'

useHead({
  htmlAttrs: { lang: computed(() => (locale.value === 'zh' ? 'zh-CN' : locale.value)) },
  title: computed(() => ak('title')),
  meta: [
    { name: 'description', content: computed(() => ak('metaDesc')) },
    { property: 'og:title', content: computed(() => ak('title')) },
    { property: 'og:description', content: computed(() => ak('metaDesc')) },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: DATE_PUBLISHED },
  ],
  link: [{ rel: 'canonical', href: computed(() => SITE + path.value) }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: ak('title'),
          description: ak('metaDesc'),
          inLanguage: 'zh-CN',
          datePublished: DATE_PUBLISHED,
          author: { '@type': 'Organization', name: '猫咪喂食量计算器' },
          mainEntityOfPage: SITE + path.value,
        }),
      ),
    },
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.value.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }),
      ),
    },
    {
      type: 'application/ld+json',
      innerHTML: computed(() =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: ak('crumbHome'),
              item: SITE + homePath.value,
            },
            { '@type': 'ListItem', position: 2, name: ak('title') },
          ],
        }),
      ),
    },
  ],
})
</script>

<template>
  <main class="article-page">
    <nav class="crumbs">
      <RouterLink :to="homePath">{{ ak('crumbHome') }}</RouterLink>
      <span class="sep">/</span>
      <span>{{ ak('title') }}</span>
    </nav>

    <h1>{{ ak('title') }}</h1>
    <p class="meta">{{ ak('dateLine') }}</p>
    <p class="lede">{{ ak('lede') }}</p>

    <section v-for="(s, i) in sections" :key="i" class="card">
      <h2>{{ s.h }}</h2>
      <p v-for="(para, j) in s.body" :key="j">{{ para }}</p>
      <ul v-if="s.list" class="tips">
        <li v-for="(li, k) in s.list" :key="k">{{ li }}</li>
      </ul>
    </section>

    <section class="card cta">
      <h2>{{ ak('ctaTitle') }}</h2>
      <p>{{ ak('ctaBody') }}</p>
      <RouterLink class="btn" :to="waterToolPath">{{ ak('ctaBtn') }}</RouterLink>
    </section>

    <section class="card">
      <h2>{{ ak('faqTitle') }}</h2>
      <div v-for="(f, i) in faqs" :key="i" class="faq-item">
        <h3>{{ f.q }}</h3>
        <p>{{ f.a }}</p>
      </div>
    </section>

    <section class="card">
      <h2>{{ ak('sourcesTitle') }}</h2>
      <ul class="tips">
        <li v-for="(src, i) in sources" :key="i">
          <a :href="src.url" target="_blank" rel="noopener">{{ src.name }}</a>
        </li>
      </ul>
    </section>

    <p class="disclaimer">{{ ak('disclaimer') }}</p>
  </main>
</template>

<style scoped>
.article-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 16px 48px;
}
.crumbs {
  font-size: 0.85rem;
  color: var(--muted, #8a7f72);
  margin: 8px 0 4px;
}
.crumbs a {
  color: inherit;
}
.crumbs .sep {
  margin: 0 6px;
}
h1 {
  font-size: 1.6rem;
  line-height: 1.4;
  margin: 8px 0 8px;
}
.meta {
  color: var(--muted, #8a7f72);
  font-size: 0.88rem;
  margin: 0 0 12px;
}
.lede {
  color: var(--muted, #8a7f72);
  line-height: 1.7;
  margin: 0 0 20px;
  font-size: 1.03rem;
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
  padding-left: 10px;
  border-left: 4px solid var(--accent, #e07b39);
  line-height: 1.4;
}
.card p {
  line-height: 1.75;
  margin: 0 0 12px;
}
.card p:last-child {
  margin-bottom: 0;
}
.tips {
  padding-left: 20px;
  margin: 0 0 4px;
}
.tips li {
  line-height: 1.75;
  margin-bottom: 8px;
}
.tips a {
  color: var(--accent, #e07b39);
}
.faq-item {
  padding: 12px 0;
  border-bottom: 1px dashed var(--card-border, #e8e2d9);
}
.faq-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.faq-item h3 {
  font-size: 1.02rem;
  margin: 2px 0 6px;
  line-height: 1.5;
}
.faq-item p {
  margin: 0 0 4px;
  line-height: 1.7;
}
.disclaimer {
  font-size: 0.85rem;
  color: var(--muted, #8a7f72);
  line-height: 1.6;
  margin: 4px 2px 20px;
}
.cta {
  text-align: center;
  background: linear-gradient(180deg, #fff6ec 0%, var(--card-bg, #fff) 85%);
  border: 1.5px solid #f0d9b8;
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
