import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'remove-leaflet-preload',
      transformIndexHtml(html) {
        // Keep aesthetic but remove leaflet preload on entry — leaflet loads lazy only when map pages are visited
        return html.replace(/<link[^>]*leaflet[^>]*>\s*/g, '')
      },
    },
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) return 'react'
          if (id.includes('node_modules/leaflet') || id.includes('node_modules/react-leaflet')) return 'leaflet'
          if (id.includes('node_modules/motion')) return 'motion'
          if (id.includes('node_modules/@supabase')) return 'supabase'
        },
      },
    },
  },
})
