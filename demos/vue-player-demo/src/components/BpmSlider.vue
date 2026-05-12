<template>
  <div class="flex items-center gap-3">
    <input
      type="range"
      class="flex-1 accent-blue-500"
      :min="0"
      :max="200"
      :step="1"
      :value="bpm"
      :disabled="disabled"
      @input="(e) => emit('update:bpm', Number(e.target.value))"
    />
    <span class="w-12 text-right text-sm tabular-nums text-slate-600">{{ bpm }}</span>
  </div>
</template>

<script setup>
defineProps({
  bpm: { type: Number, required: true },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:bpm"]);
</script>
