import { defineConfig } from 'vite'
import pkg from './package.json'
const { name } = pkg

export default defineConfig({
    build: {
        lib: {
            entry: './lib/main.ts',
            name: name,
            fileName: 'index'
        }
    }
})
