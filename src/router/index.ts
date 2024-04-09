import { createRouter, createWebHashHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import type { RouteRecordRaw } from 'vue-router'

let routes:RouteRecordRaw[] = [];
generatedRoutes.forEach(v => {
    routes.push(v?.meta?.layout != false ? setupLayouts([v])[0] : v)
})
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
