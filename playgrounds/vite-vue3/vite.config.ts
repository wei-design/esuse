import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import pkg from './package.json'

export default defineConfig(({ command }) => ({
    plugins: [Vue()],
    server: {
        port: 10086,
        host: true
    },
    resolve:
        command === 'build'
            ? {}
            : {
                  alias: {
                      // development mode use local package
                      '@wei-design/es-toolkit': resolve(__dirname, '../../packages/es-toolkit/index.ts')
                  }
              },
    define: {
        'import.meta.env.APP_NAME': JSON.stringify(pkg.name)
    },
    build: {
        minify: false,
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
                entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
                assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
                manualChunks(id: any, { getModuleInfo }) {
                    if (id.includes('@wei-design/es-toolkit')) return '@wei-design/es-toolkit'
                    // 打包依赖
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                    const reg = /(.*)\/src\/components\/(.*)/
                    if (reg.test(id)) {
                        const importersLen = getModuleInfo(id)?.importers.length
                        // 被多处引用
                        if (importersLen && importersLen > 1) {
                            return 'common'
                        }
                    }
                }
            }
        }
    }
}))
