// Auto-generated from the v3.x static pages — edit copy here, rebuild to publish.
export default {
  meta: { title: "Cat Calorie Calculator – How Much Should I Feed My Cat?", description: "Free cat calorie calculator: enter your cat's weight, breed, age and activity level to get daily calorie needs and feeding amounts. Based on veterinary RER/DER formulas.", ogDescription: "Get your cat's daily calorie target and food amount in seconds. Free, vet-formula based." },
  header: { title: "Cat Calorie <span class=\"hl\">Calculator</span>", sub: "How much should you feed your cat? Answer a few quick questions and get a daily calorie target based on the veterinary RER&nbsp;/&nbsp;DER formulas." },
  breed: { title: "Breed <small class=\"opt\">· optional</small>", placeholder: "Mixed breed / I know the weight", hint: "Breed doesn't change the formula — it just pre-fills a typical adult weight. Always adjust to your cat's actual weight.",
    options: [
      { value: "4.0", label: "Domestic Shorthair — typical 4.0 kg" },
      { value: "3.5", label: "Siamese — typical 3.5 kg" },
      { value: "4.0", label: "Persian — typical 4.0 kg" },
      { value: "6.5", label: "Maine Coon — typical 6.5 kg" },
      { value: "6.0", label: "Ragdoll — typical 6.0 kg" },
      { value: "5.5", label: "British Shorthair — typical 5.5 kg" },
      { value: "5.0", label: "Bengal — typical 5.0 kg" },
      { value: "4.0", label: "Scottish Fold — typical 4.0 kg" },
      { value: "4.0", label: "Russian Blue — typical 4.0 kg" },
      { value: "4.5", label: "Sphynx — typical 4.5 kg" },
      { value: "3.5", label: "Abyssinian — typical 3.5 kg" },
      { value: "5.5", label: "Norwegian Forest Cat — typical 5.5 kg" },
    ] },
  weight: { title: "Weight" },
  unit: { kg: "kg", alt: "lb", hint: "" },
  lifestyleTitle: "Life stage & lifestyle",
  lifeStage: { label: "Life stage", options: [
      { value: "kitten", emoji: "🍼", label: "Kitten", sub: "< 1 year" },
      { value: "adult", emoji: "🐈", label: "Adult", sub: "1 – 7 years" },
      { value: "senior", emoji: "🧶", label: "Senior", sub: "7+ years" },
    ] },
  neuter: { label: "Neutered / spayed?", options: [
      { value: "yes", emoji: "", label: "Yes", sub: "" },
      { value: "no", emoji: "", label: "No", sub: "" },
    ] },
  activity: { label: "Activity level <small>— be honest 😺</small>", options: [
      { value: "low", emoji: "🛋️", label: "Couch potato", sub: "barely moves" },
      { value: "mid", emoji: "🚶", label: "Normal", sub: "plays a little daily" },
      { value: "high", emoji: "🏃", label: "Zoomies", sub: "runs the house" },
    ] },
  goal: { label: "Goal", options: [
      { value: "maintain", emoji: "", label: "Maintain weight", sub: "" },
      { value: "lose", emoji: "", label: "Lose weight", sub: "" },
    ] },
  density: { label: "Food calorie density <small>— kcal/kg</small>", manual: "✍️ Enter manually", search: "🔍 Find my cat food",
    manualHint: "Typical dry food ≈ 3600 kcal/kg · wet food ≈ 800–1200 kcal/kg — check the package", searchPlaceholder: "Search brand or product, e.g. Royal Canin" },
  foodDb: { loading: "Loading food database…", loaded: "Database: {n} foods · updated Sep 30, 2026 · type 2+ letters to search", failed: "Could not load the food database — please enter the value manually.", none: "No matches. Try the brand name in English, or enter the value manually.", clear: "Clear", disclaimer: "Calorie data is compiled from public sources (updated Sep 30, 2026) and may vary by region, batch or formula changes — always check your package. This tool gives estimates only and is not veterinary advice." },
  calcBtn: "Calculate daily feeding 🐾",
  result: { title: "🎯 Your cat's daily target", perDay: "kcal<br>per day", portion: "Daily portion",
    gramsLabel: "️ Food per day", gramsTpl: "{g} g / day",
    mealsLabel: "Suggested meals", mealsTpl: "2 meals × ~{g} g <span class=\"tag\">ideal</span>",
    rerLabel: "Resting need (RER)", portionTpl: "{g} g of food",
    tipLose: "Weight-loss mode: feeding 80% of resting needs. Aim for 0.5–2% loss per week and check with your vet — never crash-diet a cat.", tipKitten: "Kittens are growing fast and need lots of energy. Feed kitten-formulated food and let your vet guide portions.", tipSenior: "Seniors (7+) often need fewer calories but more protein. Watch weight trends and ask your vet about senior formulas.",
    tipLow: "Indoor couch potatoes gain weight easily — measured meals (no free-feeding) make the biggest difference.", tipDefault: "Split the daily amount into 2–3 meals. Treats should stay under 10% of daily calories." },
  tracker: {
    openSheet: "Download tracking sheet 📋",
    modalTitle: "Cat Weight Management Log",
    catName: "Cat's name", catNamePh: "Optional — leave blank to handwrite",
    targetW: "Target weight", targetWPh: "Optional — leave blank to handwrite",
    printBtn: "Print / Save as PDF 🖨️", closeBtn: "Close",
    sheetTitle: "Cat Weight Management Log",
    sheetSub: "Use with your NekoLife weight-loss plan · Weigh at the same time each week",
    pName: "Name", pStartW: "Start weight", pTargetW: "Target weight", pDate: "Start date", pFood: "Daily food",
    perDay: "/ day",
    bcsTitle: "Body Condition Score (BCS) quick guide (1–9)",
    bcsUnder: "Under", bcsIdeal: "Ideal", bcsOver: "Over", bcsObese: "Obese",
    bcsNote: "4–5 is ideal ｜ Ribs should feel thinly covered, waist visible",
    thWeek: "Week", thDate: "Date", thWeight: "Weight", thDelta: "Δ vs last wk", thBcs: "BCS", thFood: "Food", thNote: "Notes",
    safety: "Safe rate: lose no more than 1–2% of body weight per week. If weight stalls for two weeks or drops over 2% in one week, revisit your plan; if your cat seems lethargic or refuses food, see a vet promptly.",
    hook: "Weigh in weekly — come back and update your plan",
    brandTag: "NEKOLIFE · CAT HEALTH",
    sheetDisclaimer: "This log is a tracking tool only and not a substitute for veterinary advice. Consult your vet before starting a weight-loss plan.",
  },
  faq: { title: "Common questions", items: [
    { q: "How many calories does a cat need per day?", a: "An average 4.5&nbsp;kg (10&nbsp;lb) neutered indoor cat needs roughly 200–280&nbsp;kcal per day. Kittens need much more for growth (about 2.5× their resting requirement), while seniors and couch potatoes need less. Use the calculator above for a personalized number." },
    { q: "Does breed affect how much I should feed?", a: "Not directly. Veterinary formulas don't use breed multipliers — calorie needs come from weight, age, neuter status and activity. Breed mostly hints at <em>typical adult weight</em> (a Maine Coon is naturally heavier than a Siamese), which is why the calculator above lets you pick a breed to pre-fill a typical weight. Always adjust to your cat's actual weight and body condition." },
    { q: "How much should I feed my cat?", a: "Divide the daily calorie target by your food's calorie density (printed on the package as kcal/kg). Example: 280&nbsp;kcal ÷ 3600&nbsp;kcal/kg ≈ 78&nbsp;g of dry food per day, split into 2–3 meals." },
    { q: "How can I help my cat lose weight safely?", a: "Start with a vet check — your vet can confirm an ideal weight and rule out medical causes. Then follow this plan:<br><br><strong>An 8-week safe weight-loss plan:</strong><br><strong>Week 1 – Baseline.</strong> Weigh your cat on the same scale at the same time of day, and measure everything it eats for 3–7 days, treats included.<br><strong>Weeks 2–3 – Transition.</strong> Switch to 2–3 measured meals a day (no free-feeding) and gradually cut down to 80% of the resting energy requirement for its current weight — the calculator\u2019s \u201cLose weight\u201d mode does this math. Keep treats under 10% of daily calories.<br><strong>Weeks 4–8 – Monitor.</strong> Weigh weekly and aim for 0.5–2% body-weight loss per week. Add two 10–15 minute play sessions a day.<br><strong>Adjust.</strong> No loss after 4 weeks? Cut another 10% (ask your vet first). Losing too fast? Add food back.<br><strong>Maintain.</strong> At the ideal weight, switch back to maintenance calories and keep the measuring habit.<br><br>\u26a0\ufe0f Rapid weight loss can cause fatty liver disease in cats. If your cat stops eating for more than 24–48 hours, see a vet immediately." },
    { q: "What is RER in cat nutrition?", a: "RER (Resting Energy Requirement) = 70 × (body weight in kg)<sup>0.75</sup>. It's the baseline vets use; daily needs (DER) are RER multiplied by a factor for life stage and activity (e.g. 1.2–1.4 for a neutered indoor adult cat)." },
    ] },
  feedback: { title: "Have an idea? 💡",
    desc: "Want us to cover a topic, add a cat food, or fix something? Send us a note — we read everything.",
    name: "Name", namePh: "Your name (optional)",
    email: "Email", emailPh: "you＠example.com (optional)",
    message: "Message", messagePh: "Tell us your idea, or what you'd like us to add…",
    submit: "Send feedback 📮", sending: "Sending…",
    success: "Thanks! Your message is on its way. 🐾",
    error: "Hmm, that didn't send. Please try again in a moment.",
    fallback: "Still not working? Email us directly →" },
  disclaimer: "<b>Disclaimer:</b> This calculator gives an estimate based on standard veterinary formulas (RER/DER). Every cat is different — metabolism, breed and health conditions matter. Adjust based on weight trends and <b>consult your veterinarian</b>, especially for weight loss, kittens, or cats with medical conditions.",
  footer: "Made for cats everywhere · v2.0",
  food: {
    title: "How much {name} should I feed my cat per day?",
    metaDesc: "{name} has {kcal} kcal per kg. Daily feeding guide in grams for 3–6 kg cats — for weight maintenance and safe weight loss. Estimated with veterinary RER/DER formulas.",
    kcalLabel: "Metabolizable energy",
    perKg: "kcal/kg",
    note: "Example: an average neutered adult cat with moderate activity.",
    tableTitle: "Daily feeding guide (grams per day)",
    thWeight: "Cat weight",
    thMaintain: "Maintain weight",
    thLose: "Safe weight loss",
    methodTitle: "How it's calculated",
    methodBody: "Resting Energy Requirement (RER) = 70 × weight in kg ^ 0.75. Daily Energy Requirement (DER) = RER × lifestyle factor (1.3 for a neutered adult with moderate activity, 0.8 for safe weight loss). Grams per day = DER ÷ kcal per kg × 1000.",
    faqTitle: "Feeding questions",
    faq1q: "How many grams of {name} per day for a 4 kg cat?",
    faq1a: "About {g} g per day to maintain weight (roughly {kcal} kcal).",
    faq2q: "Can I use {name} for weight loss?",
    faq2a: "Yes — feed about 80% of the maintenance amount, weigh your cat weekly, and aim for 1–2% loss per week. Talk to your veterinarian before starting.",
    disclaimer: "Feeding amounts are estimates from standard veterinary formulas. Calorie data is compiled from public sources and may vary by region, batch or formula changes — always check your package. This is not veterinary advice.",
    ctaTitle: "Your cat is different?",
    ctaBody: "Use the full calculator with your cat's weight, age, activity level and goal.",
    ctaBtn: "Open the calculator 🐾",
    relatedTitle: "Related feeding guides",
    guideTitle: "Further reading",
    guideBody: "Overwhelmed by dozens of cat foods on the shelf? This guide teaches you to read ME values and labels, and pick the right food for your cat's life stage.",
    guideBtn: "Read the Cat Food Buying Guide"
  },
  tools: {
    title: "More cat tools",
    sub: "Free calculators for your cat's health."
  },
  guides: {
    title: "Cat knowledge base",
    sub: "In-depth original guides to help you raise a healthier cat.",
    wlName: "Complete Guide to Cat Weight Loss",
    wlTag: "Spotting obesity, safe loss speed and feeding plans",
    cfName: "Cat Food Buying Guide",
    cfTag: "Reading labels, ME values and portions"
  },
  toolwater: {
    name: "Water intake calculator",
    tagline: "How much water should your cat drink?",
    title: "How Much Water Should My Cat Drink Per Day?",
    metaDesc: "Cat water intake calculator: a 4 kg cat needs about 200 ml of water per day. Enter your cat's weight for a personalized daily target, plus a weight chart.",
    intro: "Cats are desert animals and often don't drink enough. Use 50 ml per kg of body weight per day as a rule of thumb, and count the moisture in wet food too.",
    weightLabel: "Cat weight (kg)",
    resultMl: "{ml} ml per day",
    rangeNote: "Typical range: {lo}–{hi} ml — adjust for diet, weather and activity.",
    tableTitle: "Daily water needs by weight",
    thWeight: "Cat weight",
    thWater: "Water per day",
    methodTitle: "How it's calculated",
    methodBody: "The rule of thumb is 50 ml of water per kg of body weight per day (40–60 ml range). Wet food is about 75% water, so cats on wet food drink less from the bowl — that's normal.",
    faqTitle: "Water questions",
    faq1q: "How much water should a 4 kg cat drink per day?",
    faq1a: "About 200 ml per day, with a normal range of 160–240 ml depending on diet and activity.",
    faq2q: "Does wet food count toward my cat's water intake?",
    faq2a: "Yes. Wet food is roughly 75% water, so a cat eating only wet food may barely touch the water bowl and still be fine.",
    faq3q: "How can I tell if my cat is dehydrated?",
    faq3a: "Gently pinch the skin on the scruff: in a hydrated cat it snaps back instantly. Also check for dry gums and sunken eyes — but these are rough checks, not a diagnosis.",
    faq4q: "Can I give my cat milk instead of water?",
    faq4a: "No — most adult cats are lactose intolerant, and milk can cause diarrhea, which dehydrates further. Fresh water only.",
    whyTitle: "Why hydration matters so much for cats",
    whyBody: "Cats evolved from desert hunters and have a naturally low thirst drive — in the wild they got most of their water from prey. A chronically under-hydrated cat is more prone to urinary crystals, bladder inflammation and kidney strain, especially on an all-dry diet.",
    factorsTitle: "What changes your cat's water needs",
    factorsBody: "Diet is the biggest factor: a cat eating only dry food may need to drink a full bowl a day, while one on wet food gets most of its water from meals. Hot weather, active play, kittens, nursing mothers and cats with kidney or thyroid conditions all need more.",
    signsTitle: "Signs your cat isn't drinking enough",
    signsBody: "Watch for very dark or strong-smelling urine, constipation, dry or tacky gums, low energy, and skin that stays tented when you gently pinch the scruff. Any of these lasting more than a day deserves a vet call.",
    tipsTitle: "6 ways to get your cat to drink more",
    tipsList: [
      "Put water bowls in several rooms — cats drink more when water is easy to find.",
      "Try a pet water fountain: many cats prefer running water.",
      "Keep bowls away from food — cats instinctively avoid water near their 'kill'.",
      "Use wide, shallow bowls so whiskers don't touch the sides.",
      "Add wet food or a splash of water to meals.",
      "Refresh the water daily; some cats refuse stale water."
    ],
    vetTitle: "When to call the vet",
    vetBody: "Call promptly if drinking suddenly doubles, nearly stops, or comes with vomiting, lethargy or appetite loss. Both extremes can signal diabetes, kidney disease or hyperthyroidism.",
    disclaimer: "Estimates only. A sudden change in drinking — much more or much less — can signal illness; see your veterinarian.",
    ctaTitle: "Want the full picture?",
    ctaBody: "Calculate daily calories and food portions too.",
    ctaBtn: "Open the calorie calculator 🐾"
  },
  toolbcs: {
    name: "BCS body condition checker",
    tagline: "Is my cat overweight?",
    title: "Cat Body Condition Score (BCS): Is My Cat Overweight?",
    metaDesc: "Check your cat's body condition score on the 1–9 scale: feel the ribs, look for a waist, and get an ideal-weight estimate. Free, vet-style chart.",
    intro: "The 9-point Body Condition Score is what vets use: 1 is emaciated, 9 is severely obese, 4–5 is ideal. Pick the score that matches your cat.",
    scoreLabel: "Body condition score",
    weightLabel: "Current weight (kg)",
    catUnder: "Underweight",
    catIdeal: "Ideal condition",
    catOver: "Overweight",
    idealNote: "Very rough ideal-weight estimate: about {w} kg. Confirm with your vet before any diet.",
    descs: [
      "1 — Emaciated: ribs, spine and pelvis easily visible, no body fat, extreme tummy tuck.",
      "2 — Very thin: ribs and spine visible with minimal fat, obvious waist.",
      "3 — Thin: ribs easily felt, visible waist behind the ribs.",
      "4 — Lean: ribs felt with a thin fat cover, clear waist.",
      "5 — Ideal: ribs felt without excess fat, waist visible.",
      "6 — Slightly overweight: ribs felt under a little extra fat, waist slightly visible.",
      "7 — Overweight: ribs hard to feel under fat, no clear waist.",
      "8 — Obese: ribs can't be felt under heavy fat, no waist, fat deposits on belly and legs.",
      "9 — Severely obese: massive fat deposits everywhere, distended belly."
    ],
    methodTitle: "How it's assessed",
    methodBody: "BCS is a hands-on, visual 1–9 scale used by veterinarians. Each point above 5 is roughly 10% extra body weight, which is how the ideal-weight estimate is derived — it's approximate, not a diagnosis.",
    faqTitle: "BCS questions",
    faq1q: "What is the ideal body condition score for a cat?",
    faq1a: "4 to 5 out of 9: you can feel the ribs with a slight fat cover and see a waist behind the ribs.",
    faq2q: "My cat scores 7 — what should I do?",
    faq2a: "Aim for slow, steady loss (1–2% of body weight per week) with measured meals, and check with your vet first — fast weight loss is dangerous for cats.",
    faq3q: "How often should I check my cat's BCS?",
    faq3a: "Once a month. It takes a minute, and you'll catch slow weight creep long before the scale looks alarming.",
    faq4q: "My cat is heavy but very fluffy — could the score be wrong?",
    faq4a: "That's exactly why BCS uses touch, not eyes: part the fur and feel the ribs. Fluff hides fat, fingers don't.",
    howTitle: "How to check BCS at home (60 seconds)",
    stepsList: [
      "Rib check: run your hands along the sides. You should feel ribs under a thin fat layer — not see them, not dig for them.",
      "Overhead check: look down at your cat. Behind the ribs there should be a visible waist tucking in.",
      "Side check: from the side, the belly should tuck up behind the ribs, not hang straight or sag."
    ],
    chartTitle: "The 9-point BCS chart",
    chartTh1: "Score",
    chartTh2: "What it looks like",
    overTitle: "If your cat is overweight (6–9)",
    overBody: "Aim for slow loss: 1–2% of body weight per week. Weigh meals with a kitchen scale, cut treats to under 10% of calories, add daily play sessions, and weigh your cat every 2 weeks. Never crash-diet a cat — losing weight too fast can trigger fatal liver disease (hepatic lipidosis).",
    underTitle: "If your cat is underweight (1–3)",
    underBody: "Don't just feed more — sudden weight loss in cats is often medical (thyroid, kidneys, teeth, parasites). Book a vet check first, then follow a refeeding plan.",
    disclaimer: "Educational only. BCS doesn't replace a vet exam, and never put a cat on a crash diet — rapid weight loss can cause liver disease.",
    ctaTitle: "Overweight? Start with food.",
    ctaBody: "Calculate exactly how much to feed for safe weight loss.",
    ctaBtn: "Open the calorie calculator 🐾"
  },
  toolage: {
    name: "Cat age converter",
    tagline: "Cat years to human years",
    title: "Cat Years to Human Years Converter",
    metaDesc: "How old is your cat in human years? A 5-year-old cat is about 36 in human years. Enter any age for the conversion plus a full 1–20 year chart.",
    intro: "Cats age fast in their first two years — a 1-year-old cat is roughly 15 in human years — then about 4 human years per cat year.",
    ageLabel: "Cat age (years)",
    resultAge: "≈ {h} human years",
    stageKitten: "Life stage: kitten",
    stageAdult: "Life stage: adult",
    stageSenior: "Life stage: senior (11+)",
    tableTitle: "Cat to human years chart",
    thCat: "Cat years",
    thHuman: "Human years",
    methodTitle: "How it's converted",
    methodBody: "Year one counts as 15 human years, year two adds 9 (total 24), and each year after adds about 4. It's an approximation — breed and lifestyle shift it.",
    faqTitle: "Age questions",
    faq1q: "How old is a 5-year-old cat in human years?",
    faq1a: "About 36 human years.",
    faq2q: "When is a cat considered senior?",
    faq2a: "Around 11 years old (about 60 in human years) — that's when twice-yearly vet checkups are usually recommended.",
    faq3q: "Do indoor cats live longer than outdoor cats?",
    faq3a: "On average, yes — indoor cats often reach 15+ years while outdoor cats average far less, mostly due to traffic, fights and infections.",
    faq4q: "How can I tell a rescued cat's age?",
    faq4a: "Vets estimate from teeth: clean white teeth suggest under 2, tartar buildup 3–5, worn or missing teeth 10+. It's an estimate within a couple of years.",
    whyTitle: "Why your cat's 'human age' matters",
    whyBody: "Care changes with life stage: kittens need calorie-dense food and vaccines, adults need weight maintenance, seniors need twice-yearly vet checks and often fewer calories. Knowing the stage helps you feed and monitor correctly.",
    stagesTitle: "Cat life stages",
    stagesList: [
      "Kitten (0–1 yr ≈ 0–15 human yrs): rapid growth, vaccinations, spay/neuter planning.",
      "Junior (1–2 yrs ≈ 15–24): young adult — high energy, establish healthy weight now.",
      "Prime (3–6 yrs ≈ 28–40): peak physical condition; keep weight stable.",
      "Mature (7–10 yrs ≈ 44–56): early aging — annual vet checks, watch weight creep.",
      "Senior (11–14 yrs ≈ 60–72): vet checks twice a year; kidney and thyroid screening.",
      "Geriatric (15+ yrs ≈ 76+): comfort-focused care, softer food, easy litter-box access."
    ],
    seniorTitle: "Caring for a senior cat",
    seniorBody: "Older cats often need 20–30% fewer calories but more digestible protein. Keep fresh water everywhere (kidneys work harder with age), add low-entry litter boxes and ramps, and don't skip dental checks — mouth pain is a top reason seniors stop eating.",
    disclaimer: "Approximation for fun and planning. Individual cats age differently.",
    ctaTitle: "Senior cat? Watch the calories.",
    ctaBody: "Older cats often need fewer calories — calculate the right amount.",
    ctaBtn: "Open the calorie calculator 🐾",
    guideTitle: "Further reading",
    guideBody: "Cats enter their senior years at age 7, and diet, checkups and daily life all need adjusting. Our complete guide covers everything about senior cat care in one place.",
    guideBtn: "Read the Senior Cat Care Guide"

  },
  articleguides_weightloss: {
    title: "Cat Weight Loss Guide: Safe Diet Plan for Overweight Cats",
    metaDesc: "A complete cat weight loss guide: BCS self-checks, safe fat loss of 1 to 2% per week, calorie plans by ideal weight, and maintenance tips to prevent rebound.",
    dateLine: "Published 2026-10-01 · 8 min read",
    lede: "Excess weight is one of the most common health problems in house cats, and one of the most overlooked. This guide walks you from spotting overweight to building a feeding plan, so your cat can slim down safely.",
    crumbHome: "Home",
    sections: [
      {
        h: "1. Is your cat really overweight?",
        body: [
          "Overweight means 10-20% above ideal body weight, and obesity means more than 20% over, according to VCA. A 2022 survey found 61% of cats in North America were overweight: extra weight is the norm for house cats, not the exception.",
          "Vets judge body condition on a 9-point BCS scale, where 5 is ideal: you should see a waist from above and feel the ribs without seeing them. Weigh your cat at the same time each month and track the trend: the curve matters more than any single number."
        ],
        list: [
          "Feel the ribs: easy to feel under a thin fat layer, not buried",
          "Check the waist from above: a visible tuck, not a barrel shape",
          "Look from the side: the belly tucks up slightly, not sagging",
          "Weigh monthly and keep a weight chart"
        ]
      },
      {
        h: "2. Why obesity is dangerous for cats",
        body: [
          "Obesity is not just cute chubbiness: it is a chronic condition that shortens lives. Overweight cats face higher risks of diabetes, arthritis, urinary stones, and anesthesia complications.",
          "The most dangerous risk is hepatic lipidosis, or fatty liver disease: if an obese cat stops eating for more than a day or two, fat floods the liver and it can be fatal. So your cat must keep eating every day during weight loss. Skipping meals is not a diet strategy for cats."
        ],
        list: [
          "Diabetes: obesity is the top preventable risk factor",
          "Arthritis: extra weight wears joints down faster",
          "Urinary stones: less active and less water means higher risk",
          "Hepatic lipidosis: fasting for 1-2 days can be fatal in obese cats"
        ]
      },
      {
        h: "3. Safe pace: slow is fast",
        body: [
          "A safe rate is about 1-2% of body weight per week. For a 6 kg cat, that is 60-120 grams a week. It looks slow, but it adds up to nearly a kilo in three months, with almost no rebound.",
          "Cats cannot crash-diet like people. Too large a calorie deficit risks fatty liver, muscle loss, a dull coat, and low energy. Weight loss is a long game: slower is steadier."
        ]
      },
      {
        h: "4. Build the feeding plan around ideal weight",
        body: [
          "The key step: calculate calories from ideal weight, not current weight. First compute resting energy requirement, RER = 70 x weight in kg to the power of 0.75, then multiply by about 0.8 for weight loss. For a cat with an ideal weight of 5 kg, RER is about 234 kcal and the daily weight-loss target is about 187 kcal.",
          "Do not just halve the current food. VCA warns that simply cutting back the existing diet leads to protein and micronutrient deficiencies. Work with your vet to pick a weight-loss formula or a measured plan, and weigh food in grams with a kitchen scale."
        ]
      },
      {
        h: "5. Make the plan stick: measure, schedule, enrich",
        body: [
          "Nine out of ten weight-loss attempts fail on execution. Split the daily ration into 2-3 scheduled meals and put away the all-day buffet. A kitchen scale is non-negotiable: the gap between 'about a cup' and 80 grams is exactly why the weight stalls.",
          "Keep all treats under 10% of daily calories, feed multi-cat households separately, and add play: 10-15 minutes of wand play a day plus puzzle feeders burn calories for free."
        ],
        list: [
          "Scheduled meals: 2-3 times a day, no free feeding",
          "Weigh food in grams, never eyeball it",
          "Treat limit: under 10% of daily calories",
          "Multi-cat homes: feed separately to stop food stealing",
          "10-15 minutes of interactive play plus puzzle feeders daily"
        ]
      },
      {
        h: "6. Maintenance: keeping it off",
        body: [
          "Do not go back to the old feeding habits the day your cat hits its target weight, or the pounds return within months. Maintenance calories are usually 10-20% above the weight-loss level. Keep weighing monthly and watch.",
          "Keep the habits that worked: scheduled feeding, monthly weigh-ins, BCS self-checks. If weight climbs back more than 5%, dial the calories back early."
        ]
      }
    ],
    faqTitle: "Weight loss FAQ",
    faqs: [
      { q: "How soon will I see results from my cat's diet?", a: "At the safe pace of 1-2% per week, a 6 kg cat shows visible change in about 2-3 months. The scale is more honest than your eyes: weigh monthly and track the curve." },
      { q: "Can I just cut my cat's food in half?", a: "No. VCA warns that simply reducing the current food causes micronutrient deficiencies. Work with your vet on a weight-loss formula or a measured plan, and weigh portions in grams." },
      { q: "Can an obese cat fast to lose weight?", a: "Absolutely not. An obese cat that stops eating for more than 1-2 days can develop fatal hepatic lipidosis. Your cat must eat every day during weight loss: only the total calories are controlled." },
      { q: "Can I still give treats?", a: "Yes, but all treats together should stay under 10% of daily calories. You can swap high-calorie treats for a few kibbles as training rewards." }
    ],
    sourcesTitle: "References",
    sources: [
      { name: "VCA Animal Hospitals: Obesity in Cats", url: "https://vcahospitals.com/know-your-pet/obesity-in-cats" },
      { name: "FelineVMA (formerly AAFP) Feline Practice Guidelines", url: "https://catvets.com/guidelines/practice-guidelines/" }
    ],
    ctaTitle: "How much should your cat eat per day?",
    ctaBody: "Enter the ideal weight to get the daily calorie target and grams to feed for the weight-loss phase.",
    ctaBtn: "Open the cat weight loss calculator",
    disclaimer: "This guide is for general information and everyday care only, and is not a substitute for veterinary diagnosis. Consult a licensed veterinarian with any health concerns."
  },
  articleguides_catfood: {
    title: "Choosing the Best Cat Food: A Complete Guide to Cat Nutrition",
    metaDesc: "Learn how to choose the best cat food: read labels, compare metabolizable energy and protein, pick wet vs dry, and feed by life stage. Skip the common mistakes.",
    dateLine: "Published 2026-10-01 · 8 min read",
    lede: "Shelves full of cat food can be overwhelming. This guide walks you through reading labels, choosing between wet and dry, feeding by life stage, calculating portions, transitioning foods, and avoiding common mistakes — so you can feed your cat with confidence.",
    crumbHome: "Home",
    sections: [
      { h: "1. Read the numbers on the bag: metabolizable energy, protein, and fat", body: ["Before comparing brands, learn to read the guaranteed analysis panel. The three numbers that matter most are metabolizable energy (ME, in kcal/kg), crude protein, and crude fat — together they define the food's calorie density and nutritional backbone.", "Metabolizable energy tells you how many calories your cat can actually use. Two foods with similar protein levels can differ by hundreds of kcal/kg in ME, so feeding by cups or scoops can be way off. Calculating portions from ME is far more accurate.", "Treat the feeding guide on the package as a starting point only. It is calculated for an average cat, and your cat's age, body condition, and neuter status will shift the real number."] },
      { h: "2. Dry vs wet food: no universal winner, only what suits your cat", body: ["Dry food is about 10 percent water. It is convenient, shelf-stable, and economical, but cats that drink little water can end up chronically under-hydrated. Wet food is about 75 to 80 percent water, which helps hydration a lot, but it needs refrigeration after opening and costs more.", "Many households mix both: dry food as the nutritional base, wet food as a hydrating top-up. The key is keeping the combined total within your cat's daily calorie needs.", "If your cat has a history of urinary issues or barely drinks, lean toward more wet food. When in doubt about ratios, ask your veterinarian rather than relying on forum opinions."], list: ["Cats that drink little: raise the wet food share", "On a budget: quality dry food plus a water routine", "Sensitive stomachs: settle on one stable food before mixing"] },
      { h: "3. Feed by life stage: kittens, adults, and seniors need different things", body: ["Kittens grow fast and need higher protein and calorie density. Choose a kitten formula and feed it until about 12 months. Free-feeding kittens is not recommended — it easily leads to juvenile obesity.", "For adult cats, an adult formula plus weight control is the whole game. Neutered cats need fewer calories, and many cats start gaining weight right after neutering.", "Senior cats (from around 11 to 12 years) move less and may develop joint or kidney issues. Switch to a senior formula and adjust the diet with your veterinarian during regular checkups."] },
      { h: "4. Portion sizes: the package guide is only a starting point", body: ["Package feeding guides assume an average cat. A better starting point is to calculate daily calories from your cat's target weight, then divide by the food's ME to get the grams per day.", "Adult cats should eat at least 2 meals a day on a schedule. Free-feeding (food always in the bowl) makes many cats overeat. Scheduled meals also help you notice appetite changes sooner — a sudden change in eating habits is often an early sign of illness.", "Recheck body condition after two or three weeks. If you cannot feel the ribs and the waistline is gone, cut back. If your cat keeps slimming down, add a little. Numbers guide you, but the cat's body has the final word."], list: ["Calculate daily calories from target weight with our calculator", "Divide by the food's ME (kcal/kg) to get daily grams", "Split into 2 to 3 scheduled meals, adjust after a few weeks"] },
      { h: "5. Transition slowly: the 7 to 10 day method", body: ["Cats have sensitive stomachs, and switching foods overnight often causes diarrhea or food refusal. Transition over 7 to 10 days: new food at one quarter for days 1 to 3, then raise the share every 2 to 3 days until fully switched.", "If stools soften during the transition, do not panic and revert. Drop back to the previous ratio, hold for two days, then continue. If diarrhea lasts more than two days or your cat seems off, stop and consult your veterinarian.", "Use the transition as an observation window: note palatability, stool quality, and coat condition."] },
      { h: "6. Treats, myths, and saving money the right way", body: ["Keep treats (including freeze-dried snacks) under 10 percent of daily calories, or the balanced nutrition of the main diet gets skewed. A few kibbles set aside from meals work just as well for training rewards.", "Common myths, corrected: higher protein is not automatically better — excess protein is not ideal for senior cats with kidney strain. Expensive does not mean better — read the guaranteed analysis and watch real results instead of the price tag. Wet food is not automatically superior to dry — it depends on the product and whether your cat will eat it.", "The honest way to save money is buying bigger bags with airtight storage and watching for official-channel promotions — not buying unbranded bulk food of unknown origin. Once opened, keep food dry and sealed, and discard it if it smells rancid."], list: ["Keep treats under 10 percent of daily calories", "Ignore marketing buzzwords like natural or grain-free; read the guaranteed analysis", "Big bags plus an airtight container; watch the shelf life after opening"] }
    ],
    faqTitle: "Cat food FAQ",
    faqs: [
      { q: "How do I choose cat food — brand or ingredients first?", a: "Ingredients and the guaranteed analysis come first, brand reputation second. Check that ME, crude protein, and crude fat suit your cat's life stage, then judge by real results: body condition, coat, and stool quality. Brand is a bonus, not the deciding factor." },
      { q: "Is wet food better than dry food?", a: "Neither wins outright. Wet food is about 75 to 80 percent water and suits cats that drink little; dry food is about 10 percent water and is convenient and economical. Many households mix both — the key is keeping total calories within the daily need." },
      { q: "How much cat food should I feed per day?", a: "The package guide is only a starting point. Calculate daily calories from your cat's target weight, divide by the food's ME (kcal/kg) to get grams, split into 2 to 3 scheduled meals, and fine-tune after a few weeks based on body condition. Our calculator does the math for you." },
      { q: "My cat has diarrhea after switching food — what should I do?", a: "Most likely the switch was too fast. Use the 7 to 10 day transition; if stools soften, step back to the previous ratio for two days. If diarrhea lasts more than two days, or your cat refuses food or seems unwell, stop and consult your veterinarian." }
    ],
    sourcesTitle: "References",
    sources: [
      { name: "VCA Animal Hospitals: Feeding Times and Frequency for Cats", url: "https://vcahospitals.com/know-your-pet/feeding-times-and-frequency-for-cats" },
      { name: "FelineVMA (formerly AAFP) Feline Practice Guidelines", url: "https://catvets.com/guidelines/practice-guidelines/" }
    ],
    ctaTitle: "Check your cat food's calories",
    ctaBody: "Our database covers the metabolizable energy of 35 cat foods. Search your brand and the calories fill in automatically — then pair it with the calculator to get exact daily portions.",
    ctaBtn: "Search the cat food database",
    disclaimer: "This guide is for general information and everyday care only, and is not a substitute for veterinary diagnosis. Consult a licensed veterinarian with any health concerns."
  },
  articleguides_senior: {
    title: "Senior Cat Care: A Complete Guide for Cats Aged 7 and Older",
    metaDesc: "From age 7, a cat is a senior. This senior cat care guide covers diet changes, twice-yearly vet checks, warning signs, and home tweaks for an aging cat.",
    dateLine: "Published 2026-10-01 · 7 min read",
    lede: "Age 7 is a turning point in a cat's life. From here on, your cat is officially a senior: jumping less, eating a little less, sleeping a lot more. Most of these changes are normal aging, but some can hide early disease. This guide covers it all — diet, vet care, home setup, and companionship — so your older cat's golden years are comfortable and dignified.",
    crumbHome: "Home",
    sections: [
      {
        h: "1. When is a cat considered a senior: the 7-year line",
        body: [
          "Veterinary consensus puts the senior threshold at 7 years and up. Our own cat age converter uses the same split: under 1 is a kitten, 1 to 7 is an adult, and 7-plus is a senior.",
          "The 7-year line is not arbitrary. Around this age a cat's metabolism, immune function, and organ performance start declining noticeably, and many chronic conditions — kidney disease, hyperthyroidism, and others — tend to surface. Knowing your cat is 'old' lets you act early instead of reacting late.",
          "Curious how old your cat is in human years? Run it through our cat age calculator and see which life stage it is in."
        ]
      },
      {
        h: "2. What is changing inside your aging cat's body",
        body: [
          "The first thing owners notice is muscle: the hind legs and spine slowly get thinner, and weight may quietly drop. This is not just 'eating less' — aging brings real muscle wasting, and digestion absorbs less from food.",
          "The senses fade too: vision, hearing, and smell all dull. That is why some older cats suddenly go 'off' their usual food — they may simply not smell it well anymore. Joints stiffen, jumping becomes hesitant, and even using the litter box can turn into an effort.",
          "As metabolism slows, chronic disease risk climbs: kidney disease, hyperthyroidism, diabetes, arthritis, and cognitive decline similar to human dementia. These conditions are quiet at first, which makes regular vet checks almost the only way to catch them early."
        ]
      },
      {
        h: "3. Diet adjustments: smaller, more frequent, easy to digest",
        body: [
          "Senior cats usually have smaller appetites and weaker digestion. Three to four small meals a day beats two big ones: it is gentler on the gut and lets you track exactly how much is eaten at each meal — one of the earliest clues that something is wrong.",
          "Choose food that is easy to digest, with good-quality protein and strong palatability. For cats with bad teeth, soak dry food until soft or raise the share of wet food — wet food is also higher in moisture, which is kinder to aging kidneys. Transition foods slowly over 7 to 10 days; a senior stomach does not forgive abrupt switches.",
          "Weight is the single most useful health gauge for an older cat. Weigh it once a month on a fixed day (step on the scale holding the cat, then subtract your own weight) and write it down. Slow weight loss can be aging — or an early sign of hyperthyroidism, kidney disease, or diabetes. Do not guess; bring the log to your vet."
        ],
        list: [
          "Scheduled feeding: same times, measured portions, leftovers picked up — so appetite changes stand out fast.",
          "Make water easy: several bowls in different spots, away from food bowls and the litter box. Easier drinking means less strain on the kidneys.",
          "Skip random supplements: ask your vet before adding nutritional pastes or powders — the wrong supplement can burden the kidneys and liver."
        ]
      },
      {
        h: "4. Vet checks and warning signs: at least twice a year",
        body: [
          "The FelineVMA (formerly AAFP) 2021 Feline Senior Care guidelines recommend stepping up checkup frequency for older cats: at least twice a year. Many senior conditions show no obvious symptoms early, and by the time an owner notices, the disease has often progressed. A check every six months catches problems earlier.",
          "A senior checkup typically covers weight trends, blood pressure, and blood and urine tests, adjusted to the cat's age and history. Do not skip it just because your cat 'looks fine' — cats are masters at hiding pain, and by the time they show it, things may be serious.",
          "At home, be the daily monitor. Eating, drinking, litter habits, activity, favorite sleeping spots — a sudden change in any of these is a signal. VCA Hospitals also notes that a regular feeding routine makes abnormalities visible sooner, which matters even more for seniors."
        ],
        list: [
          "Sudden appetite loss or surge, or a clear change in water intake — book a vet visit soon.",
          "Noticeable weight drop within a month, or visibly thinning hind legs — do not write it off as 'just old'.",
          "Hesitant jumping, stiff walking, trouble with stairs — possible arthritis.",
          "Nighttime yowling, going outside the litter box, not recognizing family — possible cognitive decline.",
          "Vomiting, diarrhea, worsening bad breath, or a rough coat that does not improve for two weeks — all worth a check."
        ]
      },
      {
        h: "5. Home setup: 6 changes that make a senior cat comfortable",
        body: [
          "Older cats tolerate change less and less — the more stable the environment, the calmer they feel. These tweaks cost little but genuinely raise quality of life:"
        ],
        list: [
          "Low-entry litter box: switch to one with a low front, or cut a lower entry into the current box, so arthritic cats can get in and out without a struggle.",
          "Anti-slip: put non-slip mats along favorite routes and around the litter box and water bowls — a fall is a serious injury for old bones.",
          "Warm resting spots: senior cats feel the cold. Move the favorite bed somewhere draft-free and warm, reachable without jumping; a thermostat-controlled pet heating pad helps in winter.",
          "Zero-barrier water: keep bowls on the floors and in the rooms your cat actually uses — no stair climbing just to drink. Wide, shallow bowls are kinder to whiskers.",
          "Raise the food bowl slightly: elevating it to about chest height eases the neck and joints during meals.",
          "Keep the 'old layout': do not move the bed, litter box, or bowls on a whim. Seniors navigate by memory and habit; reshuffling the furniture makes them anxious."
        ]
      },
      {
        h: "6. Companionship and quality of life: routine, patience, and a little readiness",
        body: [
          "What a senior cat needs most is predictability: fixed feeding times, fixed playtime, familiar people. It may not play hard anymore, but a few minutes of gentle interaction each day — brushing, petting, a slow wand toy — still keeps muscles and mood up.",
          "Bring extra patience: it may not hear you call, may yowl at night, may miss the litter box now and then. Most of this is aging, not misbehavior. Punishment only adds anxiety; adjusting the environment (an extra litter box, a night light left on) works far better than scolding.",
          "Finally, the lesson every senior-cat owner eventually faces: learn the quality-of-life yardsticks for euthanasia decisions in advance (such as lasting pain that cannot be relieved, or a complete loss of joy in life) and talk them through with your vet. This is not cursing your cat — it is how you make a clear, regret-free decision for it when that day truly comes."
        ]
      }
    ],
    faqTitle: "Senior cat FAQ",
    faqs: [
      { q: "My older cat suddenly stopped eating. Is that urgent?", a: "Yes. A cat that goes 24 to 48 hours without eating risks fatty liver disease, and the risk is higher in seniors. Check the water and food for spoilage, look for big environmental changes, and watch for lethargy or vomiting. If it still will not eat after a day, or anything else seems off, see a vet — do not wait it out." },
      { q: "My senior cat keeps getting thinner. Is that normal?", a: "Slow, small weight loss can be part of aging, but steady ongoing loss is not. Hyperthyroidism, kidney disease, and diabetes all slim senior cats down. Weigh monthly, keep a log, and bring the trend to your vet — a weight chart says far more than 'it looks thinner'." },
      { q: "Should I switch to a senior cat food?", a: "It is a good idea. Senior formulas are usually easier to digest, lower in phosphorus (kinder to kidneys), and moderately calorie-dense. Transition over 7 to 10 days. If your cat already has diagnosed kidney disease or another chronic condition, follow your vet on food — it may need a prescription diet." },
      { q: "My old cat yowls at night and seems lost indoors. Is it dementia?", a: "It could be cognitive decline, but hyperthyroidism, high blood pressure, or pain such as arthritis can cause the same signs. Start with a full vet checkup to rule out treatable causes. If it is cognitive, a stable environment, a night light, and a fixed routine help a lot." }
    ],
    sourcesTitle: "References",
    sources: [
      { name: "FelineVMA (formerly AAFP) feline practice guidelines, incl. 2021 Feline Senior Care guidelines", url: "https://catvets.com/guidelines/practice-guidelines/" },
      { name: "VCA Hospitals: Feeding Times and Frequency for Cats", url: "https://vcahospitals.com/know-your-pet/feeding-times-and-frequency-for-cats" }
    ],
    ctaTitle: "How old is your cat in human years?",
    ctaBody: "Enter your cat's age and instantly see its human-age equivalent, plus whether it is a kitten, adult, or senior.",
    ctaBtn: "Open the cat age calculator",
    disclaimer: "This guide is for general information and everyday care only, and is not a substitute for veterinary diagnosis. Consult a licensed veterinarian with any health concerns."
  },
}
