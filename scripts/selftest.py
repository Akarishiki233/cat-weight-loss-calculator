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
SITE = 'https://akarishiki233.github.io/test-for-muse'

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
check('sitemap has 4 urls', sm.count('<loc>') == 4, f'found {sm.count("<loc>")}')

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
           'messagePh', 'submit', 'sending', 'success', 'error']
for loc in ['en', 'zh', 'ja', 'ko']:
    src = (ROOT / f'src/i18n/{loc}.js').read_text(encoding='utf-8')
    m = re.search(r'feedback:\s*\{(.*?)\},', src, re.S)
    missing = [k for k in FB_KEYS if not m or f'{k}:' not in m.group(1)]
    check(f'{loc}.js: feedback keys complete', not missing,
          f'missing {missing}' if missing else '')
js_blobs = ' '.join(p.read_text(encoding='utf-8', errors='ignore')
                    for p in (DIST / 'assets').glob('*.js'))
check('formsubmit endpoint bundled', 'formsubmit.co/ajax/akrishiki4869@gmail.com' in js_blobs)
check('feedback honeypot present', '_honey' in js_blobs)

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

print()
if fails:
    print(f'SELFTEST FAILED: {len(fails)} check(s)')
    for f in fails:
        print(' -', f)
    sys.exit(1)
print('SELFTEST PASSED: all green, safe to push.')
