import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        createHtmlPlugin({
            minify: true,
            entry: 'src/main.tsx',
            inject: {
                data: {
                    title: 'Title',
                    theme: 'dark'
                }
            }
        })
    ]
})
