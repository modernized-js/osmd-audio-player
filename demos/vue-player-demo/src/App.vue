<template>
  <div class="flex h-screen flex-col bg-slate-50">
    <header class="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
      <button
        type="button"
        class="rounded-md p-2 text-slate-600 hover:bg-slate-100"
        :aria-label="drawer ? 'Hide sidebar' : 'Show sidebar'"
        @click="drawer = !drawer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <h1 class="text-lg font-semibold text-slate-700">OSMD Audio Player — Vue Demo</h1>
    </header>

    <div class="flex min-h-0 flex-1">
      <aside
        v-if="drawer"
        class="w-80 shrink-0 overflow-y-auto border-r border-slate-200 bg-white"
      >
        <div class="border-b border-slate-200 px-4 py-3">
          <h2 class="text-base font-semibold text-slate-700">Playback settings</h2>
        </div>
        <PlaybackSidebar v-if="pbEngineReady" :playback-engine="pbEngine" />
        <div v-else class="px-4 py-6 text-sm text-slate-500">Loading...</div>
      </aside>

      <main class="min-w-0 flex-1 overflow-y-auto p-4">
        <label class="mb-4 block">
          <span class="mb-1 block text-sm font-medium text-slate-600">Select Score</span>
          <select
            v-model="selectedScore"
            class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            @change="scoreChanged"
          >
            <option :value="null" disabled>-- choose --</option>
            <option v-for="s in scores" :key="s.value" :value="s.value">{{ s.text }}</option>
          </select>
        </label>

        <Score
          v-if="mounted"
          :score="selectedScore"
          :ready="pbEngineReady"
          @osmd-init="osmdInit"
          @score-loaded="scoreLoaded"
        />
      </main>
    </div>

    <PlaybackControls :playback-engine="pbEngine" :score-title="scoreTitle" />
  </div>
</template>

<script setup>
import { ref, shallowRef, onMounted } from "vue";
import PlaybackEngine from "@modernized-js/osmd-audio-player";

import PlaybackSidebar from "./components/PlaybackSidebar.vue";
import PlaybackControls from "./components/PlaybackControls.vue";
import Score from "./components/Score.vue";

import scores from "./scores";

const pbEngine = shallowRef(new PlaybackEngine());
const pbEngineReady = ref(false);
const selectedScore = ref(null);
const osmd = shallowRef(null);
const scoreTitle = ref("");
const drawer = ref(true);
const mounted = ref(false);

const osmdInit = (instance) => {
  osmd.value = instance;
  selectedScore.value = scores[2].value;
};

const scoreLoaded = async () => {
  if (osmd.value?.sheet?.title) scoreTitle.value = osmd.value.sheet.title.text;
  await pbEngine.value.loadScore(osmd.value);
  pbEngineReady.value = true;
};

const scoreChanged = () => {
  if (pbEngine.value.state === "PLAYING") pbEngine.value.stop();
  pbEngineReady.value = false;
};

onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 200);
});
</script>
