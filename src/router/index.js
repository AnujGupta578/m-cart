import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/components/welcome';
import login from '@/components/login';
import products from '@/components/products'
import productList from '@/components/productRelated/productList'
import productDetail from '@/components/productRelated/productDetail'
import cart from '@/components/productRelated/cart';
import coursePractices from '@/components/coursePractices'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/practices',
            name: 'coursePractices',
            component: coursePractices
        },
        {
            path: '/welcome',
            name: 'welcome',
            component: welcome
        },
        {
            path: '/products',
            component: products,
            children: [{
                    path: '',
                    component: productList
                },
                {
                    path: '/products/:id',
                    component: productDetail,
                    props: true
                },
                {
                    path: '/cart',
                    component: cart
                }
            ]
        },
        {
            path: '/',
            redirect: '/welcome'
        }

    ]
})