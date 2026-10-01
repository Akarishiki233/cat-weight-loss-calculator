<script setup>
import { watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  open: { type: Boolean, default: false },
  petName: { type: String, default: '' },
  targetW: { type: String, default: '' },
  startW: { type: [Number, String], default: '' },
  wUnit: { type: String, default: '' },
  grams: { type: [Number, String], default: '' },
  dateStr: { type: String, default: '' },
})
const emit = defineEmits(['close', 'update:petName', 'update:targetW'])
const { t } = useI18n()

// Pattern class per BCS score — dual encoding (color lightness + pattern +
// numeric label) so the strip stays readable in black-and-white print.
function bcsPat(n) {
  if (n <= 3) return 'pat-dots'
  if (n <= 5) return 'pat-ideal'
  if (n <= 7) return 'pat-stripes'
  return 'pat-cross'
}

watch(
  () => props.open,
  (v) => {
    if (typeof document === 'undefined') return
    document.body.classList.toggle('printing-sheet', !!v)
  },
  { immediate: true },
)
onUnmounted(() => {
  if (typeof document !== 'undefined') document.body.classList.remove('printing-sheet')
})

function doPrint() {
  window.print()
}
function onName(e) {
  emit('update:petName', e.target.value)
}
function onTarget(e) {
  emit('update:targetW', e.target.value)
}
</script>

<template>
  <Teleport to="body">
  <div v-if="open" class="tracker-modal" role="dialog" aria-modal="true" :aria-label="t('tracker.modalTitle')">
    <div class="no-print sheet-toolbar">
      <b>{{ t('tracker.modalTitle') }}</b>
      <label>{{ t('tracker.catName') }}<input :value="petName" :placeholder="t('tracker.catNamePh')" @input="onName" /></label>
      <label>{{ t('tracker.targetW') }} ({{ wUnit }})<input :value="targetW" :placeholder="t('tracker.targetWPh')" inputmode="decimal" @input="onTarget" /></label>
      <button class="tbtn primary" @click="doPrint">{{ t('tracker.printBtn') }}</button>
      <button class="tbtn" @click="emit('close')">{{ t('tracker.closeBtn') }}</button>
    </div>

    <div class="tracker-sheet">
      <div class="top-row">
        <div class="brand">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#D9734E" aria-hidden="true"><ellipse cx="12" cy="15.5" rx="4.6" ry="3.8"/><circle cx="5.5" cy="10" r="2.2"/><circle cx="9.7" cy="6.8" r="2.2"/><circle cx="14.3" cy="6.8" r="2.2"/><circle cx="18.5" cy="10" r="2.2"/></svg>{{ t('tracker.brandTag') }}
        </div>
      </div>
      <h1>{{ t('tracker.sheetTitle') }}</h1>
      <div class="subtitle">{{ t('tracker.sheetSub') }}</div>

      <div class="profile">
        <div class="field"><div class="k">{{ t('tracker.pName') }}</div><div class="v">{{ petName }}</div></div>
        <div class="field"><div class="k">{{ t('tracker.pStartW') }}</div><div class="v">{{ startW }} <small>{{ wUnit }}</small></div></div>
        <div class="field"><div class="k">{{ t('tracker.pTargetW') }}</div><div class="v">{{ targetW }} <small v-if="targetW">{{ wUnit }}</small></div></div>
        <div class="field"><div class="k">{{ t('tracker.pDate') }}</div><div class="v date">{{ dateStr }}</div></div>
        <div class="field"><div class="k">{{ t('tracker.pFood') }}</div><div class="v">{{ grams }} <small>g{{ t('tracker.perDay') }}</small></div></div>
      </div>

      <div class="bcs">
        <div class="t">{{ t('tracker.bcsTitle') }}</div>
        <div class="bcs-cells">
          <div v-for="n in 9" :key="n" class="bcs-cell" :class="bcsPat(n)"><span>{{ n }}</span></div>
        </div>
        <div class="bcs-labels">
          <span>1–3 · {{ t('tracker.bcsUnder') }}</span>
          <span class="ideal">4–5 · {{ t('tracker.bcsIdeal') }}</span>
          <span>6–7 · {{ t('tracker.bcsOver') }}</span>
          <span>8–9 · {{ t('tracker.bcsObese') }}</span>
        </div>
        <div class="note">{{ t('tracker.bcsNote') }}</div>
      </div>

      <table class="log">
        <thead>
          <tr>
            <th>{{ t('tracker.thWeek') }}</th><th>{{ t('tracker.thDate') }}</th>
            <th>{{ t('tracker.thWeight') }} ({{ wUnit }})</th><th>{{ t('tracker.thDelta') }}</th>
            <th>{{ t('tracker.thBcs') }}</th><th>{{ t('tracker.thFood') }} (g)</th>
            <th class="note-col">{{ t('tracker.thNote') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 12" :key="n">
            <td class="wk">{{ n }}</td>
            <td>{{ n === 1 ? dateStr : '' }}</td>
            <td>{{ n === 1 ? startW : '' }}</td>
            <td>{{ n === 1 ? '—' : '' }}</td>
            <td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>

      <div class="safety">{{ t('tracker.safety') }}</div>

      <div class="brand-bar">
        <div class="url">nekolife.com</div>
        <div class="hook">{{ t('tracker.hook') }} →</div>
      </div>
      <div class="disclaimer">{{ t('tracker.sheetDisclaimer') }}</div>
    </div>
  </div>
  </Teleport>
</template>

<style scoped>
.tracker-modal {
  position: fixed; inset: 0; z-index: 80;
  overflow-y: auto; background: rgba(74, 59, 50, 0.45);
  padding: 18px 12px 40px;
}
.sheet-toolbar {
  max-width: 210mm; margin: 0 auto 12px; padding: 12px 16px;
  background: #fff; border-radius: 12px;
  display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-end;
  font-size: 13px; color: #4a3b32;
  box-shadow: 0 4px 18px rgba(74, 59, 50, 0.25);
}
.sheet-toolbar b { width: 100%; font-size: 15px; }
.sheet-toolbar label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: #8a7a6b; }
.sheet-toolbar input {
  border: 1.5px solid #ead9c4; border-radius: 8px; padding: 7px 10px;
  font-size: 14px; width: 170px; color: #4a3b32; background: #fffdf9;
}
.sheet-toolbar input:focus { outline: none; border-color: #d9734e; box-shadow: 0 0 0 3px rgba(217, 115, 78, 0.18); }
.tbtn {
  border: 1.5px solid #ead9c4; background: #fffdf9; color: #4a3b32;
  border-radius: 10px; padding: 8px 14px; font-size: 14px; cursor: pointer; font-weight: 600;
}
.tbtn.primary { background: #d9734e; border-color: #d9734e; color: #fff; }
.tbtn:hover { filter: brightness(0.97); }

/* ---------- A4 sheet ---------- */
.tracker-sheet {
  width: 210mm; min-height: 296mm;
  margin: 0 auto; padding: 9mm 10mm 8mm;
  background: #fffdf9; color: #4a3b32;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Noto Sans CJK SC", sans-serif;
  box-shadow: 0 6px 30px rgba(74, 59, 50, 0.25);
  border-radius: 4mm;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.top-row { margin-bottom: 3mm; }
.brand { font-size: 9pt; letter-spacing: 0.28em; color: #d9734e; font-weight: 700; }
.brand svg { vertical-align: -2px; margin-right: 2mm; }
.tracker-sheet h1 { font-size: 22pt; font-weight: 800; letter-spacing: 0.05em; margin-bottom: 1mm; color: #3a2d26; }
.subtitle { font-size: 9pt; color: #8a7a6b; margin-bottom: 4mm; }
.profile {
  display: grid; grid-template-columns: repeat(5, 1fr);
  margin-bottom: 3.5mm; border: 1.2pt solid #d9734e; border-radius: 2mm; overflow: hidden;
}
.field { padding: 2.2mm 3mm; border-right: 1pt solid #ead9c4; background: #fff; }
.field:last-child { border-right: none; }
.field .k { font-size: 7.5pt; color: #c07a4e; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 1mm; }
.field .v { font-size: 12pt; font-weight: 800; color: #3a2d26; min-height: 6.5mm; border-bottom: 1pt solid #ead9c4; }
.field .v.date { font-size: 10pt; }
.field .v small { font-size: 8.5pt; color: #8a7a6b; font-weight: 400; }

/* BCS strip — color lightness + pattern + numeric label: readable in B/W. */
.bcs { margin-bottom: 3.5mm; border: 1pt solid #ead9c4; border-radius: 2mm; padding: 2.2mm 4mm; background: #fff; }
.bcs .t { font-size: 8pt; font-weight: 700; color: #3a2d26; letter-spacing: 0.1em; margin-bottom: 1.8mm; }
.bcs-cells { display: flex; gap: 1mm; margin-bottom: 1.2mm; }
.bcs-cell {
  flex: 1; text-align: center; padding: 1.4mm 0; border-radius: 1.5mm;
  border: 1pt solid #d8c3ab;
}
.bcs-cell span { font-size: 9pt; font-weight: 800; color: #3a2d26; }
.pat-dots { background-color: #f3ece1; background-image: radial-gradient(#b9a68f 1px, transparent 1.5px); background-size: 5px 5px; }
.pat-ideal { background-color: #dcebe4; }
.pat-ideal span { color: #2e6f68; }
.pat-stripes {
  background-color: #f0dcc8;
  background-image: repeating-linear-gradient(45deg, rgba(74, 59, 50, 0.22) 0 2px, transparent 2px 6px);
}
.pat-cross {
  background-color: #e5cdb6;
  background-image:
    repeating-linear-gradient(45deg, rgba(74, 59, 50, 0.28) 0 2px, transparent 2px 6px),
    repeating-linear-gradient(-45deg, rgba(74, 59, 50, 0.28) 0 2px, transparent 2px 6px);
}
.bcs-labels { display: flex; justify-content: space-between; font-size: 7.5pt; color: #8a7a6b; margin-bottom: 1mm; }
.bcs-labels .ideal { color: #2e6f68; font-weight: 700; }
.bcs .note { font-size: 7.5pt; color: #8a7a6b; }

table.log { width: 100%; border-collapse: collapse; margin-bottom: 3.5mm; }
table.log th {
  background: #d9734e; color: #fff; font-size: 8pt; letter-spacing: 0.06em;
  padding: 2mm 1mm; font-weight: 700; border: 1pt solid #d9734e;
}
table.log td {
  border: 1pt solid #ead9c4; padding: 1mm; font-size: 9.5pt; text-align: center; height: 8mm;
  background: #fff;
}
table.log tr:nth-child(even) td { background: #fdf6ee; }
table.log td.wk { font-weight: 800; color: #b85a38; background: #f9efe3 !important; width: 8%; }
table.log th.note-col { width: 26%; }

.safety {
  border-left: 3pt solid #3e8e8a; background: #eef5f4; border-radius: 0 2mm 2mm 0;
  padding: 2.2mm 4mm; font-size: 8pt; color: #2f4a48; line-height: 1.65; margin-bottom: 4mm;
}
.brand-bar {
  background: #4a3b32; color: #fff; border-radius: 2mm;
  padding: 3.5mm 5mm; display: flex; justify-content: space-between; align-items: center;
}
.brand-bar .url { font-size: 13pt; font-weight: 800; letter-spacing: 0.1em; }
.brand-bar .hook { font-size: 9pt; color: #f4d9be; text-align: right; line-height: 1.6; }
.disclaimer { margin-top: 2mm; font-size: 7.5pt; color: #b9a68f; text-align: center; line-height: 1.6; }

@media print {
  .tracker-modal { position: static !important; overflow: visible !important; background: #fff !important; padding: 0 !important; }
}
</style>
