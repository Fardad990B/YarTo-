import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils', '@vite-pwa/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
    mongodbDb: process.env.MONGODB_DB || 'yarto',
    session: { password: process.env.NUXT_SESSION_PASSWORD || '' }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      meta: [
        { name: 'theme-color', content: '#0f766e' },
        { name: 'description', content: 'یار تو؛ دستیار ساده زندگی روزمره' }
      ]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'یار تو', short_name: 'یار تو', description: 'دستیار ساده زندگی روزمره',
      lang: 'fa', dir: 'rtl', theme_color: '#0f766e', background_color: '#f8fafc', display: 'standalone',
      icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }]
    },
    workbox: { navigateFallback: '/' }
  },
  typescript: { strict: true, typeCheck: true }
})
