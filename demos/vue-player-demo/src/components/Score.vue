<template>
  <div>
    <div v-if="scoreLoading || !ready" class="py-8 text-center">
      <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
    <div
      ref="scoreDiv"
      v-show="!scoreLoading"
      class="w-full rounded-md bg-white p-4 shadow-md"
      :style="{ opacity: ready ? 1 : 0 }"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

const props = defineProps({
  score: { type: String, default: null },
  ready: { type: Boolean, default: false },
});

const emit = defineEmits(["osmd-init", "score-loaded"]);

const scoreDiv = ref(null);
const scoreLoading = ref(false);
let osmd = null;

const loadScore = async (scoreUrl) => {
  scoreLoading.value = true;
  const res = await fetch(scoreUrl);
  if (!res.ok) throw new Error(`Failed to fetch score: ${res.status} ${scoreUrl}`);
  const scoreXml = await res.text();
  await osmd.load(scoreXml);
  scoreLoading.value = false;
  await nextTick();
  await osmd.render();
  emit("score-loaded");
};

watch(
  () => props.score,
  (val, oldVal) => {
    if (!val || val === oldVal) return;
    loadScore(val);
  }
);

onMounted(() => {
  osmd = new OpenSheetMusicDisplay(scoreDiv.value, {
    followCursor: true,
    autoResize: false,
  });
  emit("osmd-init", osmd);
  if (props.score) loadScore(props.score);
});
</script>

<style>
.w-full img {
  z-index: 1 !important;
}
</style>
