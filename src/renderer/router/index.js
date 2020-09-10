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
                    path: 'home',
                    component: require('@/components/Home').default
                },
                {
                    path: 'found',
                    component: require('@/components/Found').default
                },
                {
                    path: 'about',
                    component: require('@/components/About').default
                }
            ]
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