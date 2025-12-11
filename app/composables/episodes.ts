export interface Episode {
  title: string
  description: string
  link: string
  pubDate: Date
  audioUrl: string
  duration: number
  episode: number
  episodeType: 'full' | 'trailer' | 'bonus'
}

export function useEpisodes() {
  const episodes = useState<Episode[]>('episodes', () => [])

  function setEpisodes(eps: Episode[]) {
    episodes.value = eps
  }

  function getEpisodes() {
    return episodes.value
  }

  function getEpisode(epNum: number) {
    return episodes.value.find(episode => episode.episode === epNum)
  }

  return {
    episodes,
    setEpisodes,
    getEpisodes,
    getEpisode,
  }
}
