import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/*'],
            root: fileURLToPath(new URL('./', import.meta.url)),
            transformMode: {
                web: [/\.[jt]sx$/]
            },
            // 测试覆盖率
            coverage: {
                provider: 'istanbul', // or 'v8'
                reporter: ['text', 'json', 'html']
            }
        }
    })
)
