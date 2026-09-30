# Cat Calorie Calculator 🐱

Free tool: **how much should I feed my cat?**

Enter breed (optional, pre-fills typical weight), weight, life stage, neuter status and activity level → get a daily calorie target (kcal/day) plus food amount in grams, based on the standard veterinary **RER / DER** formulas:

- `RER = 70 × weight_kg^0.75`
- `DER = RER × factor` (1.2–1.4 neutered adult · 1.4–1.6 intact · 2.5 kitten · 1.1–1.3 senior · 0.8 weight loss)

Note: veterinary nutrition has no breed-specific calorie multipliers — breed is only used to suggest a typical adult weight. Always adjust to the actual weight.

## Stack

Vue 3 + Vite + vite-ssg (static pre-rendering) + vue-i18n + vue-router. One codebase, four locale routes (`/`, `/zh/`, `/ja/`, `/ko/`), each pre-rendered to static HTML — so SEO (titles, meta, hreflang, JSON-LD FAQ) stays fully static.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # pre-render to dist/
```

Push to `master` → GitHub Actions builds and deploys to GitHub Pages automatically.

## Project layout

- `src/pages/Calculator.vue` — the whole page (all locales)
- `src/components/` — `SegControl`, `CustomSelect` (replaces native `<select>`), `FoodSearch`, `FaqSection`
- `src/i18n/{en,zh,ja,ko}.js` — all copy; edit text here, rebuild to publish
- `src/data/cat-foods.json` — cat food calorie database (bundled at build)
- `src/lib/calc.js` — pure RER/DER math + food search helpers (unit-testable)
- `public/` — `sitemap.xml`, `robots.txt`, `404.html`, Search Console verification file

## SEO

Semantic HTML, per-locale meta descriptions, canonical + hreflang, JSON-LD `FAQPage` schema (generated from the same FAQ data rendered on-page).

## Disclaimer

Estimates only, not veterinary advice. Always consult your vet, especially for weight loss.
