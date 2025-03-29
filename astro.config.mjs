// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import siteMap from '@astrojs/sitemap'
// https://astro.build/config
export default defineConfig({
	site: 'https://czachor.ca',
	integrations: [siteMap()],
	vite: {
		plugins: [tailwindcss()],
	},
})
