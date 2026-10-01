// Pure, canvas-free spec for the 1080x1080 share card.
// All drawing parameters are derived here so the logic is unit-testable
// in node (see scripts/selftest-lib.mjs); ShareCard.vue only paints.
export const SHARE_CARD_SIZE = 1080
export const SHARE_CARD_WEEKS = 12

export function fmtW(v, unitLabel) {
  const n = Number(v)
  const s = Number.isInteger(n) ? String(n) : n.toFixed(1)
  return `${s} ${unitLabel}`
}

// targetW: number|string|''|null. A goal only counts when it is a positive
// number strictly below the start weight (we never invent a target).
export function shareCardModel({ startW, targetW, unitLabel }) {
  const s = Number(startW)
  const tg = targetW === '' || targetW == null ? null : Number(targetW)
  const hasGoal = tg != null && !Number.isNaN(tg) && tg > 0 && tg < s
  const delta = hasGoal ? +(s - tg).toFixed(1) : 0
  return {
    W: SHARE_CARD_SIZE,
    H: SHARE_CARD_SIZE,
    weeks: SHARE_CARD_WEEKS,
    startText: fmtW(s, unitLabel),
    targetText: hasGoal ? fmtW(tg, unitLabel) : null,
    // e.g. "−1.0 kg" — null when there is no goal yet (start-state card).
    deltaText: hasGoal ? `\u2212${fmtW(delta, unitLabel)}` : null,
    hasGoal,
  }
}
