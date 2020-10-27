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
                    component: require('@/components/HomeTabs/My').default,
                    children: [
                        {
                            path: 'cart',
                            component: require('@/components/MyPages/Cart').default
                        },
                        {
                            path: 'starList',
                            component: require('@/components/MyPages/StarList').default
                        },
                        {
                            path: 'myInfo',
                            component: require('@/components/MyPages/MyInfo').default
                        },
                        {
                            path: 'setting',
                            component: require('@/components/MyPages/Setting').default
                        },
                        {
                            path: 'visitTrace',
                            component: require('@/components/MyPages/VisitTrace').default
                        },
                        {
                            path: 'shopTrace',
                            component: require('@/components/MyPages/ShopTrace').default
                        },
                        {
                            path: 'publishTrace',
                            component: require('@/components/MyPages/PublishTrace').default
                        },
                        {
                            path: 'accountInfo',
                            component: require('@/components/MyPages/AccountInfo').default
                        }
                    ]
                }
            ]
        },
        {
            path: '/product',
            component: require('@/pages/Product').default
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