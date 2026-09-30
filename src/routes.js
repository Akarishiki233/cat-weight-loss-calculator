import Calculator from './pages/Calculator.vue'
import FoodPage from './pages/FoodPage.vue'
import { allFoodPages } from './lib/food-pages.js'
import foodsData from './data/cat-foods.json'

// Four locale homepages + one programmatic "how much to feed" page per
// food per locale where it's sold (cn-market foods only get a zh page).
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

export default routes
