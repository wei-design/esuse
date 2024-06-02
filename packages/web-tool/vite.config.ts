import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'index.ts'),
            name: 'webTool',
            fileName: 'index',
            formats: ['es', 'cjs', 'iife']
        },
        minify: false
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: './package.json',
                    dest: ''
                },
                {
                    src: '../../readme.md',
                    dest: ''
                }
            ]
        }),
        dts({
            // merge all declarations into one file
            rollupTypes: true
        })
    ]
})
