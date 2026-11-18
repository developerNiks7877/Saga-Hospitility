import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.GITHUB_ACTIONS ? '/Saga-Jawaai/' : '/'

const publicAssetCssBase = {
  name: 'public-asset-css-base',
  enforce: 'post',
  transform(code, id) {
    if (!id.endsWith('.css')) return null
    return code.replace(/url\((['"]?)\/(assets|fonts)\//g, `url($1${base}$2/`)
  },
}

export default defineConfig({
  base,
  plugins: [react(), publicAssetCssBase],
})
