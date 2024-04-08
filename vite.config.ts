import path from 'node:path';
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig(({mode}) => {
    /** 环境变量 */
    const env = loadEnv(mode, process.cwd(), ['VITE_','APP_']);
    console.log('env23',env.APP_HTTP_URL);
    return {
        base: env.APP_BASE,
        // 环境变量前缀
        envPrefix: 'APP_',
        // 路径别名
        resolve: {
            alias: {
                '~': path.resolve(__dirname, './src'),
                '@': path.resolve(__dirname, './src'),
            },
        },
        plugins: [
            vue(),
            AutoImport({
                imports: ['vue','@vueuse/core','vue-router'],
                dts: 'types/auto-import.d.ts',
                dirs: []
            })
        ],
        server: {
            port: 9527,
            host: true,
            proxy: {
                // 接口
                '/go': {
                    target: 'https://www.baidu.com',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/go/, ''),
                },
            },
        },
    }
})
