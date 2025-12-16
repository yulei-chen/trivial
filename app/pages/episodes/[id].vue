<script setup lang="ts">
const { getEpisode } = useEpisodes()

const route = useRoute()
// @ts-expect-error - fix this
const episode = getEpisode(Number(route.params.id))

const titleWithEpisode = computed(() => {
  return `EP${episode?.episode.toString().padStart(2, '0')}: ${episode?.title}`
})
const durationFormatted = computed(() => {
  return new Date((episode?.duration ?? 0) * 1000).toISOString().slice(11, 19)
})
</script>

<template>
  <div>
    <AudioPlayer :url="episode?.audioUrl" :title="titleWithEpisode" />

    <div class="pt-10">
      <h1>{{ titleWithEpisode }}</h1>
      <p class="text-sm text-gray">
        时长：{{ durationFormatted }}
      </p>
      <p class="text-sm">
        简介：{{ episode?.description }}
      </p>
    </div>
  </div>
</template>
