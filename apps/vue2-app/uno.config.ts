import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

// https://unocss.dev/interactive/
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: false
      // ignoreAttributes: []
    }),
    presetRemToPx()
  ],
  // rules: [[/^opacity-brand-(\w+)$/, ([, d]) => ({ opacity: `var(--${d}-opacity)` })]],
  theme: {
    colors: {
      primary: '#0077fa', // class="text-primary"
      primaryHover: '#2997ff',
      primaryActive: '#005fd4',
      success: '#52c41a',
      successHover: '#73d13d',
      successActive: '#389e0d',
      warning: '#faad14',
      warningHover: '#ffc53d',
      warningActive: '#d48806',
      error: '#f5222d',
      errorHover: '#ff4d4f',
      errorActive: '#cf1322',
      title: 'rgba(0, 0, 0, 0.85)',
      text: 'rgba(0, 0, 0, 0.65)',
      text2: 'rgba(0, 0, 0, 0.45)',
      text3: 'rgba(0, 0, 0, 0.25)',
      disabled: 'rgba(0, 0, 0, 0.25)',
      border: '#d9d9d9'
    }
  }
})
