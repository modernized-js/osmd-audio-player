<template>
  <div class="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 9v6h4l5 5V4l-5 5H7z" />
    </svg>
    <input
      type="range"
      class="flex-1 accent-blue-500"
      :min="0"
      :max="2"
      :step="0.05"
      :value="volume"
      @input="(e) => emit('update:volume', Number(e.target.value))"
    />
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06A7 7 0 0 1 14 18.71v2.06A9 9 0 0 0 14 3.23z" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  volume: { type: Number, required: true },
});

const emit = defineEmits(["update:volume"]);
</script>
