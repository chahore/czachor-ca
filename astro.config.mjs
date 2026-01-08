// @ts-check
import siteMap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://czachor.ca',
  integrations: [siteMap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
