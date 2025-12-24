<script setup lang="ts">
const { episodes } = useEpisodes()
</script>

<template>
  <div class="py-10">
    <div v-for="episode in episodes" :key="episode.title">
      <NuxtLink :to="episode.link" class="text-green">
        <div class="flex gap-2">
          <div>EP{{ episode.episode.toString().padStart(2, '0') }}: </div>
          <div>{{ episode.title }}</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
