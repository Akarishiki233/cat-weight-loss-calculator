<script setup>
defineProps({
  modelValue: { type: String, required: true },
  options: { type: Array, required: true }, // [{ value, emoji?, label, sub? }]
  cols: { type: Number, default: 2 },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="seg" :class="'c' + cols">
    <button
      v-for="o in options"
      :key="o.value"
      type="button"
      :class="{ active: modelValue === o.value }"
      @click="$emit('update:modelValue', o.value)"
    ><span v-if="o.emoji" class="em">{{ o.emoji }}</span>{{ o.label }}<small v-if="o.sub">{{ o.sub }}</small></button>
  </div>
</template>
