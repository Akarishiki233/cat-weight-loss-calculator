import Calculator from './pages/Calculator.vue'
import FoodPage from './pages/FoodPage.vue'
import ToolPage from './pages/ToolPage.vue'
import { allFoodPages } from './lib/food-pages.js'
import { allToolPages } from './lib/tool-pages.js'
import foodsData from './data/cat-foods.json'

// Four locale homepages + one programmatic "how much to feed" page per
// food per locale where it's sold (cn-market foods only get a zh page)
// + calculator-matrix tool pages (water / bcs / age × 4 locales).
// All are prerendered to static HTML by vite-ssg.
const routes = [
  { path: '/', component: Calculator },
  { path: '/zh/', component: Calculator },
  { path: '/ja/', component: Calculator },
  { path: '/ko/', component: Calculator },
]

for (const p of allFoodPages(foodsData.foods)) {
  routes.push({ path: p.path, component: FoodPage, props: { foodId: p.id } })
}

for (const p of allToolPages()) {
  routes.push({ path: p.path, component: ToolPage, props: { toolId: p.id } })
}

export default routes
