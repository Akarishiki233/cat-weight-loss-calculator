import Calculator from './pages/Calculator.vue'

// One page, four locale routes — each prerendered to static HTML by vite-ssg.
export default [
  { path: '/', component: Calculator },
  { path: '/zh/', component: Calculator },
  { path: '/ja/', component: Calculator },
  { path: '/ko/', component: Calculator },
]
