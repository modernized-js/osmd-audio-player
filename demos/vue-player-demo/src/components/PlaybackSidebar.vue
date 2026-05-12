<template>
  <div class="space-y-5 p-4">
    <div v-if="playbackEngine.ready">
      <h2 class="mb-2 text-base font-semibold text-slate-700">
        BPM
        <span v-if="playbackEngine.denominator" class="text-slate-500">
          (1/{{ playbackEngine.denominator }})
        </span>
      </h2>
      <BpmSlider
        :bpm="playbackEngine.playbackSettings.bpm"
        :disabled="bpmDisabled"
        @update:bpm="(val) => playbackEngine.setBpm(val)"
      />

      <h2 class="mb-2 mt-6 text-base font-semibold text-slate-700">Levels</h2>
      <InstrumentControl
        v-for="instrument in scoreInstruments"
        :key="instrument.Id"
        :playback-engine="playbackEngine"
        :instrument="instrument"
      />

      <h2 class="mb-2 mt-6 text-base font-semibold text-slate-700">About</h2>
      <p class="text-sm text-slate-600">
        Vue.js demo for
        <a class="text-blue-600 hover:underline" href="https://github.com/jimutt/osmd-audio-player">
          OSMD Audio player</a>. Built by
        <a class="text-blue-600 hover:underline" href="https://twitter.com/jimutt">
          Jimmy Utterström</a>.
      </p>
    </div>
    <div v-else class="text-sm text-slate-500">Loading...</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import InstrumentControl from "./InstrumentControl.vue";
import BpmSlider from "./BpmSlider.vue";

const props = defineProps({
  playbackEngine: { type: Object, required: true },
});

const scoreInstruments = computed(() => props.playbackEngine.scoreInstruments);
const bpmDisabled = computed(() => props.playbackEngine.state === "PLAYING");
</script>
