import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

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
        dts({
            // merge all declarations into one file
            rollupTypes: true
        })
    ]
})
