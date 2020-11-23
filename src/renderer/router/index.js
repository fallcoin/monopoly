import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: require('@/pages/Login').default
        },
        {
            path: '/register',
            component: require('@/pages/Register').default
        },
        {
            path: '/homePage',
            name: 'Home',
            component: require('@/pages/HomePage').default,
            children: [
                {
                    path: 'home/',
                    component: require('@/components/HomeTabs/Home').default
                },
                {
                    path: 'found/',
                    component: require('@/components/HomeTabs/Found').default
                },
                {
                    path: 'about/',
                    component: require('@/components/HomeTabs/About').default
                },
                {
                    path: 'my/',
                    redirect: 'my/cart',
                    component: require('@/components/HomeTabs/MyPages/My').default,
                    children: [
                        // 购物相关
                        {
                            path: 'cart',
                            component: require('@/components/HomeTabs/MyPages/ShopAbout/Cart').default
                        },
                        {
                            path: 'starList',
                            component: require('@/components/HomeTabs/MyPages/ShopAbout/StarList').default
                        },
                        {
                            path: 'order',
                            component: require('@/components/HomeTabs/MyPages/ShopAbout/Order').default
                        },
                        {
                            path: 'cargoStatus',
                            component: require('@/components/HomeTabs/MyPages/ShopAbout/CargoStatus').default
                        },
                        // 个人信息
                        {
                            path: 'myInfo',
                            component: require('@/components/HomeTabs/MyPages/MyInfoAbout/MyInfo').default
                        },
                        {
                            path: 'accountInfo',
                            component: require('@/components/HomeTabs/MyPages/MyInfoAbout/AccountInfo').default
                        },
                        // 历史记录
                        {
                            path: 'visitTrace',
                            component: require('@/components/HomeTabs/MyPages/TraceAbout/VisitTrace').default
                        },
                        {
                            path: 'shopTrace',
                            component: require('@/components/HomeTabs/MyPages/TraceAbout/ShopTrace').default
                        },
                        {
                            path: 'publishTrace',
                            component: require('@/components/HomeTabs/MyPages/TraceAbout/PublishTrace').default
                        },
                        // 设置
                        {
                            path: 'setting',
                            component: require('@/components/HomeTabs/MyPages/Setting').default
                        }
                    ]
                }
            ]
        },
        {
            path: '/product',
            component: require('@/pages/Product').default
        },
        {
            path: '/publish',
            component: require('@/pages/Publish').default
        },
        {
            path: '/shopList',
            component: require('@/pages/ShopList').default
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//         return next()
//     }
//     const tokenStr = window.sessionStorage.getItem('token')
//     if (!tokenStr) {
//         return next('/login')
//     }
//     next()
// })


export default router