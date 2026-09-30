import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import routes from './routes'
import en from './i18n/en.js'
import zh from './i18n/zh.js'
import ja from './i18n/ja.js'
import ko from './i18n/ko.js'
import { localeFromPath } from './lib/calc.js'
import './style.css'

export const createApp = ViteSSG(
  App,
  { routes, base: '/test-for-muse/' },
  ({ app, router, isClient }) => {
    const i18n = createI18n({
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
      messages: { en, zh, ja, ko },
    })
    app.use(i18n)

    // Each route is a fixed locale — set it before render (SSG) and on navigation.
    const applyLocale = (path) => {
      i18n.global.locale.value = localeFromPath(path)
    }
    router.beforeEach((to) => applyLocale(to.path))

    // Scroll-reveal animation (client only). Mirrors the old static site:
    // cards fade in on scroll, with a fallback that never leaves content hidden.
    app.directive('reveal', {
      mounted(el) {
        el.classList.add('reveal')
        if ('IntersectionObserver' in window) {
          const io = new IntersectionObserver(
            (entries) =>
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  e.target.classList.add('in')
                  io.unobserve(e.target)
                }
              }),
            { threshold: 0.08 },
          )
          io.observe(el)
        } else {
          el.classList.add('in')
        }
      },
    })
    if (isClient) {
      setTimeout(
        () =>
          document
            .querySelectorAll('.reveal:not(.in)')
            .forEach((el) => el.classList.add('in')),
        1500,
      )
    }
  },
)
