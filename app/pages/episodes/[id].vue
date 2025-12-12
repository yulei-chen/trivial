<script setup lang="ts">
const { getEpisode } = useEpisodes()

const route = useRoute()
// @ts-expect-error - fix this
const episode = getEpisode(Number(route.params.id))
</script>

<template>
  <div>
    网页制作中...
    <AudioPlayer :url="episode?.audioUrl" />
    <div>
      <h1><span>EP{{ episode?.episode.toString().padStart(2, '0') }}: </span>{{ episode?.title }}</h1>
    </div>
    <div>
      <p>{{ episode?.description }}</p>
    </div>
  </div>
</template>
