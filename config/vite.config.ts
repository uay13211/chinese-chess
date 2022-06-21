import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    root: path.resolve(__dirname, '../src'),
    build: {
        outDir: path.resolve(__dirname, '../dist')
    },
    server: {
        port: 3500,
        https: true
    },
    plugins: [tsconfigPaths({ projects: [path.resolve(__dirname, '../', 'tsconfig.json')] }), react()]
})
