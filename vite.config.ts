import { defineConfig, loadEnv } from 'vite'

import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            react(),
            createHtmlPlugin({
                minify: true,
                entry: 'src/main.tsx',
                inject: {
                    data: {
                        title: env.VITE_TITLE,
                        theme: env.VITE_THEME
                    }
                }
            })
        ]
    }
})
