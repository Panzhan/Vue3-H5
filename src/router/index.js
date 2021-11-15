
import { createWebHistory, createRouter } from 'vue-router'
import { defineAsyncComponent } from 'vue'
const history = createWebHistory()

const router = createRouter({
    history, // 路由模式
    routes: [
        // 首页
        // 官网首页
        { path: '/', name: 'webindex', component: () => defineAsyncComponent(() => import('@/views/empty/index')), meta: { title: '' } },
        { path: '/website', name: 'website', component: () => defineAsyncComponent(() => import('@/views/website/index')), meta: { title: '' } },
        //airwallex
        { path: '/airwallex/index', name: 'airwallex', component: () => defineAsyncComponent(() => import('@/views/airwallex/index')), meta: { title: '' } },
        //banner check
        { path: '/banner/check', name: 'bannercheck', component: () => defineAsyncComponent(() => import('@/views/banner/check')), meta: { title: '' } },
        // 原pc官网隐私政策
        { path: '/website/terms', name: 'terms', component: () => defineAsyncComponent(() => import('@/views/website/terms')), meta: { title: '' } },
        // 原pc官网法律政策
        { path: '/website/legal', name: 'legal', component: () => defineAsyncComponent(() => import('@/views/website/legal')), meta: { title: '' } },
        // solestage download
        { path: '/solestage/download', name: 'download', component: () => defineAsyncComponent(() => import('@/views/download/index')), meta: { title: '' } },
        //airwallex 2.0
        { path: '/airwallex/indexv2', name: 'airwallexv2', component: () => defineAsyncComponent(() => import('@/views/airwallex/indexv2')), meta: { title: '' } },
        //买家须知
        { path: '/instructions/buyer', name: 'buyerinstructions', component: () => defineAsyncComponent(() => import('@/views/instructions/buyer')), meta: { title: '买家须知' } },
        //卖家须知
        { path: '/instructions/saler', name: 'salerinstructions', component: () => defineAsyncComponent(() => import('@/views/instructions/saler')), meta: { title: '卖家须知' } },
        //商品详情
        { path: '/goods/detail', name: 'goodsdetail', component: () => defineAsyncComponent(() => import('@/views/goodDetail/goodDetail.vue')), meta: { title: '卖家须知' } },
        // 打印
        { path: '/print/index', name: 'print', component: () => defineAsyncComponent(() => import('@/views/print/index')), meta: { title: '发货结果' } },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        else return { x: 0, y: 0 }
    }
})
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
export default router
