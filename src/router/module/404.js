export default [
    {
        path: '/404',
        name: 'notFound',
        hidden: true,
        meta: {},
        component: (resolve) => { require(['@/pages/404.vue'], resolve) },
    },
    {
        meta: {},
        path: '/*',
        hidden: true,
        redirect: '/404',
    },
]