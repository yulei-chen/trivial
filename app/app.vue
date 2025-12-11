<script setup lang="ts">
import { appName } from '~/constants'
import rss from '../public/index.rss?raw'

useHead({
  title: appName,
})

const { setEpisodes } = useEpisodes()

watchEffect(() => {
  const itemMatches = rss.match(/<item>([\s\S]*?)<\/item>/g)

  if (!itemMatches) {
    return
  }

  const episodes = itemMatches.map((item) => {
    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/s)
    const title = titleMatch?.[1] || titleMatch?.[2] || ''

    const descriptionMatch = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>|<description>(.*?)<\/description>/s)
    const description = descriptionMatch?.[1] || descriptionMatch?.[2] || ''

    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/s)
    const pubDate = pubDateMatch?.[1]?.trim() || ''

    const durationMatch = item.match(/<itunes:duration>(.*?)<\/itunes:duration>/s)
    const duration = Number.parseInt(durationMatch?.[1]?.trim() || '0', 10)

    const episodeMatch = item.match(/<itunes:episode>(.*?)<\/itunes:episode>/s)
    const episode = Number.parseInt(episodeMatch?.[1]?.trim() || '0', 10)

    const episodeTypeMatch = item.match(/<itunes:episodeType>(.*?)<\/itunes:episodeType>/s)
    const episodeType = (episodeTypeMatch?.[1]?.trim() || 'full') as 'full' | 'trailer' | 'bonus'

    return {
      title: title.trim(),
      description: description.trim(),
      link: `/episodes/${episode}`,
      pubDate: new Date(pubDate),
      audioUrl: `/assets/audio/${episode}.mp3`,
      duration,
      episode,
      episodeType,
    }
  })

  // console.log('==> episodes', episodes)
  setEpisodes(episodes)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  color-scheme: dark;
}
</style>
