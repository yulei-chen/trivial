import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'cursor-pointer p-[1px]'],
    ['btn-green', 'btn text-green hover:text-black hover:bg-green'],
    ['btn-purple', 'btn text-purple hover:text-black hover:bg-purple'],
    ['btn-yellow', 'btn text-yellow hover:text-black hover:bg-yellow'],
    ['btn-orange', 'btn text-orange hover:text-black hover:bg-orange'],
    ['btn-fuschia', 'btn text-fuschia hover:text-black hover:bg-fuschia'],
    ['btn-blue', 'btn text-blue hover:text-black hover:bg-blue'],
    ['btn-grey', 'btn text-grey hover:text-black hover:bg-grey'],
    ['btn-white', 'btn text-white hover:text-black hover:bg-white'],
    ['btn-black', 'btn text-black hover:text-white hover:bg-black'],
  ],
  theme: {
    colors: {
      black: '#1a1a1a',
      white: '#e1e1e1',
      grey: '#898989',
      purple: '#b462ff',
      fuschia: '#ff45b4',
      blue: '#18b6ff',
      green: '#1beb9e',
      orange: '#ff9528',
      yellow: '#dddd25',
    },
  },
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      // scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'IBM Plex Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
