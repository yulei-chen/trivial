<script setup lang="ts">
const { episodes } = useEpisodes()
</script>

<template>
  <div class="py-10">
    <div v-for="episode in episodes" :key="episode.title">
      <NuxtLink :to="episode.link" class="text-green">
        <span>EP{{ episode.episode.toString().padStart(2, '0') }}: </span>
        <span>{{ episode.title }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
