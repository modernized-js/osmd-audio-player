<template>
  <div class="border-t border-slate-200 bg-white shadow-inner">
    <div class="mx-auto max-w-3xl px-4 py-3">
      <input
        v-if="playbackEngine && playbackEngine.iterationSteps > 0"
        type="range"
        class="mb-2 w-full accent-blue-500"
        :min="0"
        :max="playbackEngine.iterationSteps"
        :step="1"
        :value="playbackEngine.currentIterationStep"
        @input="(e) => playbackEngine.jumpToStep(Number(e.target.value))"
      />
      <div class="flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">
          {{ scoreTitle }}
        </div>
        <div class="flex items-center gap-1">
          <button
            v-if="playbackEngine.state !== 'PLAYING'"
            type="button"
            class="rounded-full p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Play"
            @click="playbackEngine.play()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button
            v-else
            type="button"
            class="rounded-full p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Pause"
            @click="playbackEngine.pause()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
          </button>
          <button
            type="button"
            class="rounded-full p-2 text-slate-700 hover:bg-slate-100"
            aria-label="Stop"
            @click="playbackEngine.stop()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h12v12H6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  playbackEngine: { type: Object, required: true },
  scoreTitle: { type: String, default: "" },
});
</script>
