<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { shareCardModel, SHARE_CARD_WEEKS } from '../lib/share-card.js'

const props = defineProps({
  open: { type: Boolean, default: false },
  petName: { type: String, default: '' },
  targetW: { type: String, default: '' },
  startW: { type: [Number, String], default: '' },
  wUnit: { type: String, default: '' },
  dateStr: { type: String, default: '' },
})
const emit = defineEmits(['close', 'update:petName', 'update:targetW'])
const { t } = useI18n()
const canvas = ref(null)

const CJK = '"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans CJK SC","Noto Sans SC",sans-serif'

function drawPaw(ctx, x, y, s, color) {
  ctx.fillStyle = color
  ctx.beginPath(); ctx.ellipse(x, y + 8 * s, 11 * s, 9 * s, 0, 0, Math.PI * 2); ctx.fill()
  const toes = [[-16, -6], [-6, -14], [6, -14], [16, -6]]
  for (const [dx, dy] of toes) {
    ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, 5.2 * s, 0, Math.PI * 2); ctx.fill()
  }
}

function draw() {
  const el = canvas.value
  if (!el || typeof document === 'undefined') return
  const model = shareCardModel({ startW: props.startW, targetW: props.targetW, unitLabel: props.wUnit })
  const { W, H } = model
  el.width = W; el.height = H
  const ctx = el.getContext('2d')

  // background
  ctx.fillStyle = '#FFF9F2'
  ctx.fillRect(0, 0, W, H)
  drawPaw(ctx, 130, 150, 2.2, 'rgba(217,115,78,0.10)')
  drawPaw(ctx, 950, 880, 2.6, 'rgba(217,115,78,0.08)')
  drawPaw(ctx, 900, 170, 1.4, 'rgba(62,142,138,0.08)')

  // top brand line
  ctx.textAlign = 'center'
  try { ctx.letterSpacing = '10px' } catch (e) { /* older canvas */ }
  ctx.fillStyle = '#D9734E'
  ctx.font = `700 34px ${CJK}`
  ctx.fillText(`NEKOLIFE · ${t('tracker.cardPlan')}`, W / 2, 120)
  try { ctx.letterSpacing = '0px' } catch (e) { /* noop */ }

  // divider paw
  drawPaw(ctx, W / 2, 190, 1.1, '#EAD9C4')

  let cy = 430
  if (props.petName) {
    ctx.fillStyle = '#8A7A6B'
    ctx.font = `600 44px ${CJK}`
    ctx.fillText(`\u{1F43E} ${props.petName}`, W / 2, 300)
    cy = 470
  }

  // hero: delta or start state
  if (model.hasGoal) {
    ctx.fillStyle = '#3A2D26'
    ctx.font = `800 170px ${CJK}`
    ctx.fillText(model.deltaText, W / 2, cy + 60)
    ctx.fillStyle = '#8A7A6B'
    ctx.font = `600 52px ${CJK}`
    ctx.fillText(`${t('tracker.cardFrom')} ${model.startText}  →  ${t('tracker.cardTo')} ${model.targetText}`, W / 2, cy + 150)
  } else {
    ctx.fillStyle = '#3A2D26'
    ctx.font = `800 120px ${CJK}`
    ctx.fillText(t('tracker.cardStart'), W / 2, cy + 40)
    ctx.fillStyle = '#8A7A6B'
    ctx.font = `600 52px ${CJK}`
    ctx.fillText(model.startText, W / 2, cy + 130)
  }

  // 12-week mini progress (empty segments = journey ahead)
  const segW = 64, segH = 26, gap = 14
  const totalW = SHARE_CARD_WEEKS * segW + (SHARE_CARD_WEEKS - 1) * gap
  let sx = (W - totalW) / 2
  const sy = 760
  ctx.strokeStyle = '#D9734E'
  ctx.lineWidth = 3
  for (let i = 0; i < SHARE_CARD_WEEKS; i++) {
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(sx + i * (segW + gap), sy, segW, segH, 13)
    else ctx.rect(sx + i * (segW + gap), sy, segW, segH)
    ctx.stroke()
  }
  ctx.fillStyle = '#B9A68F'
  ctx.font = `500 30px ${CJK}`
  ctx.fillText(`12 ${t('tracker.thWeek')}`, W / 2, sy + 70)

  // footer
  ctx.fillStyle = '#4A3B32'
  ctx.font = `800 54px ${CJK}`
  ctx.fillText('nekolife.com', W / 2, 950)
  ctx.fillStyle = '#8A7A6B'
  ctx.font = `500 34px ${CJK}`
  ctx.fillText(t('tracker.cardHook'), W / 2, 1000)
}

function download() {
  const el = canvas.value
  if (!el || typeof document === 'undefined' || !el.toBlob) return
  el.toBlob((blob) => {
    if (!blob) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `nekolife-plan-card-${props.dateStr || 'card'}.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(a.href), 4000)
  }, 'image/png')
}

function onName(e) { emit('update:petName', e.target.value) }
function onTarget(e) { emit('update:targetW', e.target.value) }

watch(
  () => [props.open, props.petName, props.targetW, props.startW, props.wUnit],
  ([isOpen]) => {
    if (isOpen) nextTick(draw)
  },
  { immediate: true },
)
onUnmounted(() => {})
</script>

<template>
  <Teleport to="body">
  <div v-if="open" class="share-modal" role="dialog" aria-modal="true" :aria-label="t('tracker.cardTitle')">
    <div class="no-print sheet-toolbar">
      <b>{{ t('tracker.cardTitle') }}</b>
      <label>{{ t('tracker.catName') }}<input :value="petName" :placeholder="t('tracker.catNamePh')" @input="onName" /></label>
      <label>{{ t('tracker.targetW') }} ({{ wUnit }})<input :value="targetW" :placeholder="t('tracker.targetWPh')" inputmode="decimal" @input="onTarget" /></label>
      <button class="tbtn primary" @click="download">{{ t('tracker.cardDl') }}</button>
      <button class="tbtn" @click="emit('close')">{{ t('tracker.closeBtn') }}</button>
    </div>
    <div class="card-stage">
      <canvas ref="canvas" class="share-canvas" width="1080" height="1080"></canvas>
    </div>
  </div>
  </Teleport>
</template>

<style scoped>
.share-modal {
  position: fixed; inset: 0; z-index: 80;
  overflow-y: auto; background: rgba(74, 59, 50, 0.45);
  padding: 18px 12px 40px;
}
.sheet-toolbar {
  max-width: 640px; margin: 0 auto 12px; padding: 12px 16px;
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
.card-stage { display: flex; justify-content: center; }
.share-canvas {
  width: min(92vw, 560px); height: auto; border-radius: 18px;
  box-shadow: 0 10px 40px rgba(74, 59, 50, 0.35); background: #fff9f2;
}
</style>
