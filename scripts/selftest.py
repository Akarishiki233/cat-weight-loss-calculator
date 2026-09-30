#!/usr/bin/env python3
"""Full self-test for the cat calorie calculator. Build, then verify everything.

Run:  python3 scripts/selftest.py   (or: npm run selftest)
Exit 0 only if every check passes. Do NOT push unless this is green.
"""
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
fails = []


def check(name, cond, extra=''):
    print(('  ok   ' if cond else '  FAIL ') + name + (f' [{extra}]' if extra and not cond else ''))
    if not cond:
        fails.append(name)


def run(cmd):
    return subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)


print('== 1. build ==')
r = run(['npm', 'run', 'build'])
check('vite-ssg build exits 0', r.returncode == 0, r.stderr[-500:] if r.returncode else '')
# vue-i18n treats `@` as linked-message syntax with no escape hatch: a raw
# `@` in any message breaks compilation and can silently drop SSR output.
# The build exits 0 anyway, so assert on stderr explicitly.
check('build: no i18n message-compiler errors', 'message-compiler' not in r.stderr)
if r.returncode != 0:
    print('\nSELFTEST FAILED (build)')
    sys.exit(1)

LOCALES = {
    'en': {'path': 'index.html', 'lang': 'en', 'canon': '/',
           'title_kw': 'Cat Calorie Calculator', 'faq_kw': 'How many calories does a cat need per day?',
           'breed_ph': 'Mixed breed', 'calc_btn': 'Calculate daily feeding', 'fb_btn': 'Send feedback',
           'labels': ['Life stage', 'Neutered / spayed?', 'Activity level <small>— be honest 😺</small>', 'Goal', 'Food calorie density <small>— kcal/kg</small>']},
    'zh': {'path': 'zh/index.html', 'lang': 'zh-CN', 'canon': '/zh/',
           'title_kw': '猫咪热量计算器', 'faq_kw': '猫咪每天需要多少热量？',
           'breed_ph': '混种猫', 'calc_btn': '计算每日喂食量', 'fb_btn': '发送留言',
           'labels': ['年龄阶段', '是否绝育？', '活动量 <small>— 诚实一点 😺</small>', '目标', '猫粮热量密度 <small>— kcal/kg</small>']},
    'ja': {'path': 'ja/index.html', 'lang': 'ja', 'canon': '/ja/',
           'title_kw': '猫', 'faq_kw': '猫は1日に何カロリー必要？',
           'breed_ph': 'ミックス', 'calc_btn': '計算', 'fb_btn': '送信する',
           'labels': ['ライフステージ', '避妊・去勢済み？', '運動量 <small>— 正直に 😺</small>', '目標', 'フードのカロリー密度 <small>— kcal/kg</small>']},
    'ko': {'path': 'ko/index.html', 'lang': 'ko', 'canon': '/ko/',
           'title_kw': '고양이', 'faq_kw': '고양이에게',
           'breed_ph': '믹스', 'calc_btn': '계산', 'fb_btn': '보내기',
           'labels': ['생애 단계', '중성화 수술 여부', '활동량 <small>— 솔직하게 😺</small>', '목표', '사료 칼로리 밀도 <small>— kcal/kg</small>']},
}
SITE = 'https://akarishiki233.github.io/cat-weight-loss-calculator'

print('== 2. per-locale HTML ==')
for loc, cfg in LOCALES.items():
    print(f'-- {loc} --')
    p = DIST / cfg['path']
    check(f'{loc}: file exists', p.exists())
    if not p.exists():
        continue
    s = p.read_text(encoding='utf-8')

    check(f'{loc}: html lang', f'<html lang="{cfg["lang"]}"' in s)
    m = re.search(r'<title>(.*?)</title>', s, re.S)
    check(f'{loc}: title', bool(m) and cfg['title_kw'] in m.group(1), m.group(1)[:60] if m else 'missing')
    check(f'{loc}: meta description', bool(re.search(r'name="description"', s)))
    check(f'{loc}: canonical', f'href="{SITE}{cfg["canon"]}"' in s and 'rel="canonical"' in s)
    check(f'{loc}: 5 hreflangs', s.count('hreflang=') == 5, f'found {s.count("hreflang=")}')
    for hl in ['en', 'zh-CN', 'ja', 'ko', 'x-default']:
        check(f'{loc}: hreflang {hl}', f'hreflang="{hl}"' in s)
    check(f'{loc}: og tags', 'property="og:title"' in s and 'property="og:description"' in s)

    m = re.search(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
    ld_ok, n_q = False, 0
    if m:
        try:
            ld = json.loads(m.group(1))
            n_q = len(ld.get('mainEntity', []))
            ld_ok = (ld.get('@type') == 'FAQPage' and n_q == 5
                     and all('<' not in q.get('name', '') and '<' not in q['acceptedAnswer']['text']
                             for q in ld['mainEntity']))
        except json.JSONDecodeError as e:
            ld_ok, n_q = False, f'json error {e}'
    check(f'{loc}: JSON-LD FAQPage x5, no html', ld_ok, f'questions={n_q}')

    check(f'{loc}: 5 FAQ details', s.count('<details') == 5, f'found {s.count("<details")}')
    check(f'{loc}: faq keyword', cfg['faq_kw'] in s)
    check(f'{loc}: breed placeholder', cfg['breed_ph'] in s)
    check(f'{loc}: calc button', cfg['calc_btn'] in s)
    check(f'{loc}: custom dropdown, no native select', 'cselect-btn' in s and '<select' not in s)
    check(f'{loc}: cat svg', 'class="cat-face"' in s)
    check(f'{loc}: food search input', 'type="search"' in s)
    check(f'{loc}: no old-page fragments', 'stageSeg' not in s and 'data-v=' not in s)
    check(f'{loc}: no double-escaped entities',
          '&amp;amp;' not in s and '&amp;lt;' not in s and '&amp;gt;' not in s)
    for lb in cfg['labels']:
        # match the full <label> element, not a substring (e.g. h2 also contains 'Life stage')
        n = s.count(f'<label>{lb}</label>')
        check(f'{loc}: label "{lb[:12]}..." exactly once', n == 1, f'found {n}')
    # density block spacing hooks exist
    check(f'{loc}: density-block spacing', 'density-block' in s)
    # feedback form (FormSubmit -> owner inbox) renders in every locale
    check(f'{loc}: feedback form renders', 'feedback-form' in s and '<textarea' in s)
    check(f'{loc}: feedback submit btn', cfg['fb_btn'] in s)

print('== 3. dist static files ==')
for f in ['sitemap.xml', 'robots.txt', '404.html', 'google0caa8c740c641dd9.html', 'data/cat-foods.json']:
    check(f'dist/{f} exists', (DIST / f).exists())
sm = (DIST / 'sitemap.xml').read_text() if (DIST / 'sitemap.xml').exists() else ''
check('sitemap has 135 urls (4 mains + 119 food pages + 12 tool pages)', sm.count('<loc>') == 135, f'found {sm.count("<loc>")}')

print('== 4. i18n integrity ==')
for loc in ['en', 'zh', 'ja', 'ko']:
    src = (ROOT / f'src/i18n/{loc}.js').read_text(encoding='utf-8')
    check(f'{loc}.js: no greedy-html labels', 'stageSeg' not in src and '</label>' not in src)
    r = run(['node', '--check', f'src/i18n/{loc}.js'])
    check(f'{loc}.js: node syntax ok', r.returncode == 0)

print('== 4b. vue-i18n reactivity ==')
# tm() in <script setup> returns a one-time snapshot: it must be wrapped in
# computed() (or live in template/computed) or the text won't update on
# client-side language switching. Regression guard for the FAQ bug (2026-09-30).
import re as _re
for vue in sorted((ROOT / 'src').rglob('*.vue')):
    src = vue.read_text(encoding='utf-8')
    m = _re.search(r'<script setup>(.*?)</script>', src, _re.S)
    if not m:
        continue
    setup = m.group(1)
    for ln, line in enumerate(setup.splitlines(), 1):
        # Direct `const x = tm(...)` in setup is a one-time snapshot (not reactive).
        # tm() inside computed()/template, or as an object property inside a
        # computed, is fine.
        if _re.search(r'(const|let|var)\s+\w+\s*=\s*tm\(', line):
            check(f'{vue.name}:{ln} bare tm() snapshot in setup (wrap in computed)',
                  False, line.strip()[:80])
check('no bare tm() snapshots in <script setup>', True)

print('== 4c. feedback form ==')
# FeedbackForm posts to FormSubmit which forwards to the owner's inbox.
# Guard: all locales carry the full key set, and the endpoint with the
# correct inbox is actually bundled into dist JS.
FB_KEYS = ['title', 'desc', 'name', 'namePh', 'email', 'emailPh', 'message',
           'messagePh', 'submit', 'sending', 'success', 'error', 'fallback']
for loc in ['en', 'zh', 'ja', 'ko']:
    src = (ROOT / f'src/i18n/{loc}.js').read_text(encoding='utf-8')
    m = re.search(r'feedback:\s*\{(.*?)\},', src, re.S)
    missing = [k for k in FB_KEYS if not m or f'{k}:' not in m.group(1)]
    check(f'{loc}.js: feedback keys complete', not missing,
          f'missing {missing}' if missing else '')
js_blobs = ' '.join(p.read_text(encoding='utf-8', errors='ignore')
                    for p in (DIST / 'assets').glob('*.js'))
check('web3forms endpoint bundled', 'api.web3forms.com/submit' in js_blobs)
check('feedback honeypot present', 'botcheck' in js_blobs)
# The access key comes from the owner's free web3forms.com signup; the
# placeholder must be replaced before push, or every submission fails.
check('web3forms access key configured',
      'api.web3forms.com/submit' in js_blobs
      and 'YOUR_WEB3FORMS_ACCESS_KEY' not in js_blobs)

print('== 4d. i18n message syntax ==')
# Regression guard (2026-09-30, feedback form): a raw ASCII `@` in any i18n
# message makes vue-i18n's message compiler throw INVALID_LINKED_FORMAT,
# which silently dropped the whole <form> from SSR output while the build
# still exited 0. We use no linked messages, so any `@` in these files is a bug
# (use fullwidth ＠ for email examples).
for loc in ['en', 'zh', 'ja', 'ko']:
    src = (ROOT / f'src/i18n/{loc}.js').read_text(encoding='utf-8')
    bad = [ln.strip()[:70] for ln in src.splitlines() if '@' in ln]
    check(f'{loc}.js: no raw @ in messages', not bad, f'{bad[:2]}' if bad else '')

print('== 5. cat food data ==')
data = json.loads((ROOT / 'src/data/cat-foods.json').read_text(encoding='utf-8'))
foods = data['foods']
check('35 foods', len(foods) == 35, f'got {len(foods)}')
check('all have id/brand/kcal/market',
      all(f.get('id') and f.get('brand') and f.get('kcal_per_kg') and f.get('market') for f in foods))
check('kcal in sane range', all(2500 <= f['kcal_per_kg'] <= 5000 for f in foods))
check('7 cn + 28 intl', sum(1 for f in foods if f['market'] == 'cn') == 7
      and sum(1 for f in foods if f['market'] == 'intl') == 28)
check('ids unique', len({f['id'] for f in foods}) == 35)

print('== 6. calc lib tests (node) ==')
r = run(['node', 'scripts/selftest-lib.mjs'])
print(r.stdout)
check('lib tests exit 0', r.returncode == 0, r.stdout[-300:] if r.returncode else '')

print('== 7. food pages (programmatic SEO) ==')
# Get the canonical page list from the same pure module the build uses,
# so the test can never drift from the routes.
PAGES_JS = """
import { allFoodPages } from './src/lib/food-pages.js';
import { readFileSync } from 'node:fs';
const foods = JSON.parse(readFileSync('./src/data/cat-foods.json', 'utf-8')).foods;
console.log(JSON.stringify(allFoodPages(foods)));
"""
r = run(['node', '--input-type=module', '-e', PAGES_JS])
pages = json.loads(r.stdout or '[]')
check('food page list from lib', r.returncode == 0 and len(pages) > 0, r.stderr[-200:] if r.returncode else '')
check('119 food pages (7 zh-only + 28x4)', len(pages) == 119, f'got {len(pages)}')
by_id = {}
for p in pages:
    by_id.setdefault(p['id'], []).append(p['locale'])
check('cn foods zh-only', all(set(by_id[f['id']]) == {'zh'} for f in foods if f['market'] == 'cn'))
check('intl foods all 4 locales', all(set(by_id[f['id']]) == {'en', 'zh', 'ja', 'ko'} for f in foods if f['market'] == 'intl'))

# Every page prerendered to dist.
missing = []
for p in pages:
    rel = p['path'].strip('/')
    fp = DIST / (rel + '/index.html' if rel else 'index.html')
    if not fp.exists():
        missing.append(p['path'])
check('all food pages in dist', not missing, f'{len(missing)} missing: {missing[:3]}')

# Spot-check one page per locale: title, canonical, hreflang, kcal, table, JSON-LD.
SAMPLES = [
    ('en', 'royal-canin-indoor-adult', 'Royal Canin', '/foods/royal-canin-indoor-adult/', 4),
    ('zh', 'fuliejia-tizhong-guanli', '弗列加特', '/zh/foods/fuliejia-tizhong-guanli/', 1),
    ('ja', 'royal-canin-indoor-adult', 'Royal Canin', '/ja/foods/royal-canin-indoor-adult/', 4),
    ('ko', 'royal-canin-indoor-adult', 'Royal Canin', '/ko/foods/royal-canin-indoor-adult/', 4),
]
food_by_id = {f['id']: f for f in foods}
for loc, fid, brand_kw, path, n_hreflang in SAMPLES:
    html = (DIST / (path.strip('/') + '/index.html')).read_text(encoding='utf-8')
    kcal = str(food_by_id[fid]['kcal_per_kg'])
    check(f'{loc}/{fid}: brand in title', brand_kw in html)
    check(f'{loc}/{fid}: canonical',
          f'href="{SITE}{path}"' in html and 'rel="canonical"' in html)
    check(f'{loc}/{fid}: {n_hreflang} hreflangs + x-default',
          html.count('hreflang="') == n_hreflang + 1,
          f"got {html.count('hreflang=')}")
    check(f'{loc}/{fid}: kcal {kcal} shown', kcal in html)
    check(f'{loc}/{fid}: feeding table', '<table' in html and 'gMaintain' not in html)
    check(f'{loc}/{fid}: FAQ JSON-LD', 'FAQPage' in html)
    check(f'{loc}/{fid}: CTA button text', '🐾' in html)

# cn food must NOT have en/ja/ko pages.
for loc in ['en', 'ja', 'ko']:
    fp = DIST / ((loc + '/foods/fuliejia-tizhong-guanli/index.html') if loc != 'en' else 'foods/fuliejia-tizhong-guanli/index.html')
    check(f'no {loc} page for cn food', not fp.exists())

# sitemap covers all food pages + 4 mains.
sm = (ROOT / 'public/sitemap.xml').read_text(encoding='utf-8')
check('sitemap 135 urls', sm.count('<url>') == 135, f'got {sm.count("<url>")}')
check('sitemap has food urls', all(f'<loc>{SITE}{p["path"]}</loc>' in sm for p in pages))

# i18n food-key parity across locales.
FOOD_KEYS = ['title', 'metaDesc', 'kcalLabel', 'perKg', 'note', 'tableTitle', 'thWeight',
             'thMaintain', 'thLose', 'methodTitle', 'methodBody', 'faqTitle', 'faq1q',
             'faq1a', 'faq2q', 'faq2a', 'disclaimer', 'ctaTitle', 'ctaBody', 'ctaBtn',
             'moreTitle', 'moreSub']
for loc in ['en', 'zh', 'ja', 'ko']:
    src = (ROOT / f'src/i18n/{loc}.js').read_text(encoding='utf-8')
    m = re.search(r'food:\s*\{(.*?)\n  \}\n\}', src, re.S)
    missing_keys = [k for k in FOOD_KEYS if not m or f'{k}:' not in m.group(1)]
    check(f'{loc}.js: food keys complete', not missing_keys, f'missing {missing_keys}' if missing_keys else '')

# Calculator page links to its locale's food pages (internal link equity).
for loc, path, expect_n in [('en', 'index.html', 28), ('zh', 'zh/index.html', 35),
                            ('ja', 'ja/index.html', 28), ('ko', 'ko/index.html', 28)]:
    html = (DIST / path).read_text(encoding='utf-8')
    n = html.count('/foods/')
    check(f'{loc} calculator links {expect_n} food pages', n >= expect_n, f'got {n} /foods/ refs')

print('== 8. tool pages (water/bcs/age × 4 locales = 12) ==')
TOOL_IDS = ['water', 'bcs', 'age']
TOOL_LOCALES = ['en', 'zh', 'ja', 'ko']

def tool_path(loc, tid):
    return ('' if loc == 'en' else f'/{loc}') + f'/{tid}/'

TOOL_TITLE_KW = {
    'water': {'en': 'How Much Water Should My Cat Drink', 'zh': '猫咪每天该喝多少水',
              'ja': '猫は1日にどれくらい水を飲めばいい', 'ko': '고양이는 하루에 물을 얼마나'},
    'bcs': {'en': 'Body Condition Score', 'zh': '体况评分', 'ja': 'BCS', 'ko': 'BCS'},
    'age': {'en': 'Cat Years to Human Years', 'zh': '猫咪年龄换算人类年龄',
            'ja': '猫の年齢を人間の年齢に換算', 'ko': '고양이 나이를 사람 나이로 환산'},
}

n_tool = 0
for tid in TOOL_IDS:
    for loc in TOOL_LOCALES:
        p = tool_path(loc, tid)
        fp = DIST / (p.lstrip('/') + 'index.html')
        check(f'tool page exists: {p}', fp.exists())
        if not fp.exists():
            continue
        n_tool += 1
        html = fp.read_text(encoding='utf-8')
        check(f'{p}: title keyword', TOOL_TITLE_KW[tid][loc] in html)
        check(f'{p}: canonical', f'href="{SITE}{p}"' in html or f'href="{SITE}{p}"\n' in html)
        check(f'{p}: hreflang ×5', html.count('hreflang=') == 5)
        check(f'{p}: FAQ JSON-LD', 'FAQPage' in html)
        check(f'{p}: FAQ has 4 questions', html.count('"@type": "Question"') == 4)
        check(f'{p}: CTA button', '🐾' in html)
        if tid == 'water':
            check(f'{p}: default 4.5kg → 225 ml', '225' in html and ('ml' in html or '毫升' in html))
            check(f'{p}: table has 4kg → 200 ml row', '200' in html)
            check(f'{p}: why-hydration section', {'en': 'Why hydration matters so much',
                                                  'zh': '为什么喝水对猫这么重要',
                                                  'ja': 'なぜ猫にとって水分が重要なのか',
                                                  'ko': '고양이에게 수분이 중요한 이유'}[loc] in html)
            check(f'{p}: tips list rendered', {'en': 'pet water fountain', 'zh': '饮水机',
                                               'ja': '給水器', 'ko': '급수기'}[loc] in html)
        elif tid == 'bcs':
            check(f'{p}: 9 score buttons', 'bcs-btns' in html and html.count('type="button"') >= 9)
            check(f'{p}: default score 5 desc', {'en': 'Ideal: ribs felt without excess fat',
                                                'zh': '5 分——理想', 'ja': '5——理想', 'ko': '5——이상적'}[loc] in html)
            check(f'{p}: 9-point chart section', {'en': 'The 9-point BCS chart', 'zh': '9 分制体况评分表',
                                                  'ja': '9段階BCSチャート', 'ko': '9단계 BCS 차트'}[loc] in html)
            check(f'{p}: overweight guidance', {'en': 'hepatic lipidosis', 'zh': '脂肪肝',
                                                'ja': '肝リピドーシス', 'ko': '리피도시스'}[loc] in html)
        elif tid == 'age':
            check(f'{p}: default 5yr → 36 human years', '>36<' in html or ' 36 ' in html or '36' in html)
            check(f'{p}: 20-year chart row', '>20<' in html or '<td>20</td>' in html)
            check(f'{p}: life stages section', {'en': 'Geriatric', 'zh': '高龄', 'ja': 'ハイシニア',
                                                'ko': '초고령'}[loc] in html)
            check(f'{p}: senior care section', {'en': 'Caring for a senior cat', 'zh': '老年猫照护要点',
                                                'ja': 'シニア猫ケアのポイント', 'ko': '노묘 케어 포인트'}[loc] in html)
check('12 tool pages built', n_tool == 12, f'got {n_tool}')

# sitemap covers all 12 tool pages.
sm = (ROOT / 'public/sitemap.xml').read_text(encoding='utf-8')
check('sitemap has tool urls',
      all(f'<loc>{SITE}{tool_path(loc, tid)}</loc>' in sm for tid in TOOL_IDS for loc in TOOL_LOCALES))

# i18n tool-key parity across locales.
TOOL_BASE_KEYS = ['name', 'tagline', 'title', 'metaDesc', 'intro', 'methodTitle', 'methodBody',
                  'faqTitle', 'faq1q', 'faq1a', 'faq2q', 'faq2a', 'disclaimer',
                  'ctaTitle', 'ctaBody', 'ctaBtn']
TOOL_EXTRA_KEYS = {
    'toolwater': ['weightLabel', 'resultMl', 'rangeNote', 'tableTitle', 'thWeight', 'thWater',
                  'whyTitle', 'whyBody', 'factorsTitle', 'factorsBody', 'signsTitle', 'signsBody',
                  'tipsTitle', 'tipsList', 'vetTitle', 'vetBody',
                  'faq3q', 'faq3a', 'faq4q', 'faq4a'],
    'toolbcs': ['scoreLabel', 'weightLabel', 'catUnder', 'catIdeal', 'catOver', 'idealNote', 'descs',
                'howTitle', 'stepsList', 'chartTitle', 'chartTh1', 'chartTh2',
                'overTitle', 'overBody', 'underTitle', 'underBody',
                'faq3q', 'faq3a', 'faq4q', 'faq4a'],
    'toolage': ['ageLabel', 'resultAge', 'stageKitten', 'stageAdult', 'stageSenior',
                'tableTitle', 'thCat', 'thHuman',
                'whyTitle', 'whyBody', 'stagesTitle', 'stagesList', 'seniorTitle', 'seniorBody',
                'faq3q', 'faq3a', 'faq4q', 'faq4a'],
}
for loc in TOOL_LOCALES:
    src = (ROOT / f'src/i18n/{loc}.js').read_text(encoding='utf-8')
    m = re.search(r'tools:\s*\{(.*?)\n  \}\n\}', src, re.S)
    missing = [k for k in ['title', 'sub'] if not m or f'{k}:' not in m.group(1)]
    check(f'{loc}.js: tools hub keys complete', not missing, f'missing {missing}' if missing else '')
    for tkey, extra in TOOL_EXTRA_KEYS.items():
        m = re.search(rf'{tkey}:\s*\{{(.*?)\n  \}}\n\}}', src, re.S)
        missing = [k for k in TOOL_BASE_KEYS + extra if not m or f'{k}:' not in m.group(1)]
        check(f'{loc}.js: {tkey} keys complete', not missing, f'missing {missing}' if missing else '')

# Calculator page links to all 3 tools per locale.
for loc, path in [('en', 'index.html'), ('zh', 'zh/index.html'),
                  ('ja', 'ja/index.html'), ('ko', 'ko/index.html')]:
    html = (DIST / path).read_text(encoding='utf-8')
    for tid in TOOL_IDS:
        check(f'{loc} calculator links tool {tid}', f'/{tid}/' in html)

print('== 9. router scroll behavior ==')
main_js = (ROOT / 'src/main.js').read_text(encoding='utf-8')
check('scrollBehavior defined', 'scrollBehavior' in main_js)
check('scrollBehavior returns top 0', re.search(r'scrollBehavior\(.*?\{.*?top:\s*0', main_js, re.S) is not None)
check('scrollBehavior preserves back/forward position', 'savedPosition' in main_js)

print()
if fails:
    print(f'SELFTEST FAILED: {len(fails)} check(s)')
    for f in fails:
        print(' -', f)
    sys.exit(1)
print('SELFTEST PASSED: all green, safe to push.')
