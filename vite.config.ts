import path from 'node:path'
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
            vue({
                script: {
                    defineModel: true,
                    propsDestructure: true,
                }
            }),
            // 自动导入vue方法
            AutoImport({
                imports: ['vue','@vueuse/core','vue-router'],
                dts: path.resolve(__dirname, './types/auto-import.d.ts'),
                dirs: [
                    path.resolve(__dirname, './src/stores'),
                ],
                resolvers: [
                    ElementPlusResolver(),
                ],
            }),
            // 自动导入使用到的组件
            Components({
                dts: path.resolve(__dirname, './types/components.d.ts'),
                dirs: [
                    path.resolve(__dirname, './src/components'),
                ],
                resolvers: [
                    // 自动导入 Naive UI 组件
                    ElementPlusResolver(),
                    // 自动导入图标
                    IconsResolver({ prefix: 'i' })
                ],
            }),
            // 文件路由系统
            Pages({
                dirs: 'src/views',
                extensions: ['vue', 'jsx'],
                // 排除文件
                exclude: ['**/components'],
            }),
            // 布局
            Layouts({
                layoutsDirs: 'src/layouts',
            }),
            // unocss
            UnoCSS(),
            // iconify图标
            Icons(),
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
