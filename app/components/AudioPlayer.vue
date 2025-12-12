<script setup lang="ts">
const { url } = defineProps<{
  url: string | undefined
}>()
const canvasRef = ref<HTMLCanvasElement>()
const audioRef = ref<HTMLAudioElement>()
const playing = ref(false)

function play() {
  const audioCtx = new AudioContext()
  const oscillator = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()
  gainNode.gain.value = 0.1
  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)
  oscillator.type = 'square'
  oscillator.start()
  setTimeout(() => {
    oscillator.stop()
  }, 50)

  wave()
}

function wave() {
  // const audio = new Audio(url)
  audioRef.value!.play()
  playing.value = true

  const audioCtx = new AudioContext()
  const source = audioCtx.createMediaElementSource(audioRef.value!)
  const analyser = audioCtx.createAnalyser()
  analyser.fftSize = 128
  source.connect(analyser)
  analyser.connect(audioCtx.destination)
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  const barWidth = canvasRef.value!.width / bufferLength
  let barHeight = 0
  let x = 0
  const ctx = canvasRef.value!.getContext('2d')

  function animate() {
    if (audioRef.value!.paused) {
      ctx!.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)
      x = 0
      return
    }
    x = 0
    ctx!.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)
    analyser.getByteFrequencyData(dataArray)
    console.warn('==> dataArray', dataArray)
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]!
      ctx!.fillStyle = 'white'
      ctx!.fillRect(x, canvasRef.value!.height - barHeight, barWidth, barHeight)
      x += barWidth
    }
    if (!playing.value) {
      return
    }
    requestAnimationFrame(animate)
  }
  animate()
}

function stop() {
  audioRef.value!.pause()
  playing.value = false
}
</script>

<template>
  <div>
    <canvas ref="canvasRef" width="600" height="400" />
    <audio ref="audioRef" :src="url" controls />
    <button v-if="!playing" @click="play">
      Play
    </button>
    <button v-if="playing" @click="stop">
      Stop
    </button>
  </div>
</template>

<style scoped></style>
