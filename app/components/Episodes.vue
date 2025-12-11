<script setup lang="ts">
const { episodes } = useEpisodes()
</script>

<template>
  <div v-for="episode in episodes" :key="episode.title">
    <span>EP{{ episode.episode.toString().padStart(2, '0') }}: </span><NuxtLink :to="episode.link">
      {{ episode.title }}
    </NuxtLink>
  </div>
</template>

<style scoped></style>
