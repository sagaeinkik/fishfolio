import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CatchView from '../views/CatchView.vue';
import AboutView from '../views/AboutView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: HomeView,
            alias: '/start',
        },
        {
            path: '/catches',
            name: 'catch log',
            component: CatchView,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not found',
            redirect: '/start',
        },
    ],
});

export default router;
