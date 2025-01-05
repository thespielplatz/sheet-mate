// https://nuxt.com/docs/api/configuration/nuxt-config
import packageJson from './package.json' assert { type: 'json' }

const packageJsonTyped = packageJson as {
  version: string
  meta?: { 'special-version'?: string }
}

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { 
    enabled: true,
  },
  runtimeConfig: {
    public: {
      releasedVersion: packageJsonTyped.version,
      version: packageJsonTyped.meta?.['special-version'] || packageJsonTyped.version,
      githubLink: 'https://github.com/thespielplatz/sheet-mate'
    },
  },
  modules: [
    '@thespielplatz/nuxt-auth',
  ],
  css: [
    '@/assets/css/tailwind.css',
    '@/assets/css/global.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    typeCheck: true
  },
  build: {
    transpile: [
      'vue-barcode-reader',
      '@zxing/library',
    ],
  },
})
