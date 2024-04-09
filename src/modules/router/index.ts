import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import type { RouteRecordRaw } from 'vue-router'

import NotFound from '@/views/404/index.vue'

let routes:RouteRecordRaw[] = [];
generatedRoutes.forEach(v => {
    routes.push(v?.meta?.layout != false ? setupLayouts([v])[0] : v)
})
routes.push({
    path: '/:catchAll(.*)', // 捕获所有未匹配到的路径
    component: NotFound,
})
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
