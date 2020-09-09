import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/homePage/home'
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
