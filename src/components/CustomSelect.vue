<script setup>
/**
 * Custom dropdown replacing the native <select>.
 * - Big touch targets, consistent look on PC & mobile
 * - Closes on outside click / Escape
 * - First option is always the placeholder (clears the selection)
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, required: true }, // [{ value, label }]
  placeholder: { type: String, default: '' },
  ariaLabel: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue', 'pick'])

const open = ref(false)
const root = ref(null)

const allOptions = computed(() => [
  { value: '', label: props.placeholder },
  ...props.options,
])
const selectedLabel = computed(() => {
  const o = props.options.find((o) => o.value === props.modelValue)
  return o ? o.label : props.placeholder
})

function toggle() {
  open.value = !open.value
}
function close() {
  open.value = false
}
function pick(o) {
  emit('update:modelValue', o.value)
  emit('pick', o)
  close()
}
function onDocClick(e) {
  if (root.value && !root.value.contains(e.target)) close()
}
function onKey(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="cselect" :class="{ open }">
    <button
      type="button"
      class="cselect-btn"
      :aria-label="ariaLabel || placeholder"
      aria-haspopup="listbox"
      :aria-expanded="open ? 'true' : 'false'"
      @click="toggle"
    >
      <span class="cselect-text" :class="{ dim: !modelValue }">{{ selectedLabel }}</span>
      <span class="cselect-chev" aria-hidden="true">▼</span>
    </button>
    <Transition name="cselect-pop">
      <ul v-if="open" class="cselect-list" role="listbox">
        <li
          v-for="o in allOptions"
          :key="o.value + '|' + o.label"
          role="option"
          :aria-selected="o.value === modelValue ? 'true' : 'false'"
          :class="{ sel: o.value === modelValue }"
        >
          <button type="button" @click="pick(o)">
            <span class="cselect-dot" aria-hidden="true"></span>{{ o.label }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
