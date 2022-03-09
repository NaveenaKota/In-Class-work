import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from '../pages/Home.vue';
import Generic from '../pages/Generic.vue';
import Login from '../pages/Login.vue';
import session from "../models/session";

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: Generic, props: { title: 'About Page!' } },
  { path: '/contact', component: Generic, props: { title: 'Contact Page!' } },
  { path: '/login', component: Login },
  { path: '/signup', component: Generic, props: { title: 'Signup Page!' } },
  { path: '/messages', component: () => import('../pages/Wall.vue') },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
  linkActiveClass: 'is-active',
})

router.beforeEach((to, from) => {
    if (['/messages', '/wall', '/feed'].includes(to.path)) { // list of paths that require login
        if (!session.user) {
            return '/login';
        }
    }
})

export default router;