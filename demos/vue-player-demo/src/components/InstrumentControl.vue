<template>
  <div class="mb-4">
    <h3 class="text-sm font-semibold text-slate-700">{{ instrument.Name }}</h3>
    <div v-for="(voice, index) in instrument.Voices" :key="index" class="mt-2">
      <h4 class="text-xs font-medium text-slate-500">{{ voice.Name }}</h4>
      <select
        class="mb-2 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        :value="playbackEngine.getPlaybackInstrument(voice.VoiceId).midiId"
        @change="(e) => setPlaybackInstrument(voice, Number(e.target.value))"
      >
        <option v-for="opt in instruments" :key="opt.value" :value="opt.value">
          {{ opt.text }}
        </option>
      </select>
      <VolumeSlider
        :volume="voice.Volume"
        @update:volume="(val) => (voice.Volume = val)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import VolumeSlider from "./VolumeSlider.vue";

const props = defineProps({
  instrument: { type: Object, required: true },
  playbackEngine: { type: Object, required: true },
});

const instruments = computed(() => {
  if (!props.playbackEngine.availableInstruments) return [];
  return props.playbackEngine.availableInstruments.map((i) => ({
    text: i.name,
    value: i.midiId,
  }));
});

const setPlaybackInstrument = (voice, midiInstrumentId) => {
  props.playbackEngine.setInstrument(voice.VoiceId, midiInstrumentId);
};
</script>
