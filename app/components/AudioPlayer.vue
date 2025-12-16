<script setup lang="ts">
const { url } = defineProps<{
  url: string | undefined
  title: string
}>()

const FFT_SIZE = 32
const COLS = FFT_SIZE - 6 // update gird-cols

const audio = useTemplateRef('audioRef')
const { playing, currentTime, rate } = useMediaControls(audio, {
  src: url,
})
const analyser = ref<AnalyserNode>()
const frequencyData = ref<Uint8Array>(new Uint8Array(COLS))

const currentTimeFormatted = computed(() => {
  return new Date(currentTime.value * 1000).toISOString().slice(11, 19)
})

useRafFn(() => {
  if (playing.value && analyser.value) {
    const dataArray = new Uint8Array(COLS)
    analyser.value.getByteFrequencyData(dataArray)
    frequencyData.value = dataArray
  }
})

function playButtonSound() {
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
}

function initAnalyser() {
  const audioCtx = new AudioContext()
  const source = audioCtx.createMediaElementSource(audio.value!)
  const anal = audioCtx.createAnalyser()
  anal.fftSize = FFT_SIZE * 2
  source.connect(anal)
  anal.connect(audioCtx.destination)

  analyser.value = anal
}

function play() {
  playButtonSound()
  playing.value = true
  initAnalyser()
}

function pause() {
  playButtonSound()
  playing.value = false
}
</script>

<template>
  <div>
    <audio ref="audioRef" class="hidden" :src="url" controls />

    <div class="text-xs grid grid-cols-26 h-[120px] max-w-[300px] items-end">
      <div v-for="(value, index) in frequencyData" :key="index">
        <div v-if="value > 300" class="text-fuschia mb-[100px]">
          ^
        </div>
        <div v-else-if="value > 270" class="text-fuschia mb-[90px]">
          *
        </div>
        <div v-else-if="value > 240" class="text-fuschia mb-[80px]">
          -
        </div>
        <div v-else-if="value > 210" class="text-orange mb-[70px]">
          ^
        </div>
        <div v-else-if="value > 180" class="text-orange mb-[60px]">
          %
        </div>
        <div v-else-if="value > 150" class="text-orange mb-[50px]">
          -
        </div>
        <div v-else-if="value > 120" class="text-yellow mb-[40px]">
          ^
        </div>
        <div v-else-if="value > 90" class="text-yellow mb-[30px]">
          &
        </div>
        <div v-else-if="value > 60" class="text-yellow mb-[20px]">
          *
        </div>
        <div v-else-if="value > 30" class="text-green mb-[10px]">
          ^
        </div>
        <div v-else class="text-green">
          -
        </div>
      </div>
    </div>

    <div>
      <div class="text-gray">
        {{ title }}
      </div>

      <div class="flex items-center justify-between">
        <div class="text-gray">
          {{ currentTimeFormatted }}
        </div>
        <button class="btn-purple" @click="currentTime -= 30">
          [-30s]
        </button>
        <button v-if="!playing" class="btn-green" @click="play">
          [play]
        </button>
        <button v-else class="btn-green" @click="pause">
          [pause]
        </button>
        <button class="btn-purple" @click="currentTime += 30">
          [+30s]
        </button>
      </div>

      <div class="flex gap-1 items-center">
        <button class="btn-blue" @click="rate = 1">
          [x1]
        </button>
        <button class="btn-blue" @click="rate = 1.5">
          [x1.5]
        </button>
        <button class="btn-blue" @click="rate = 2">
          [x2]
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
