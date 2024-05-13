import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const { name } = pkg

export default defineConfig({
    build: {
        lib: {
            entry: './index.ts',
            name: name,
            fileName: 'index'
        }
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: './package.json',
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
