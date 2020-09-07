import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    name: "logout",
    path: "/logout",
    components: {
      container: () =>
        import(/* webpackChunkName: "logout" */ "./../view/logout.vue"),
    },
  },
  {
    name: "root",
    path: "/",
    components: {
      container: () =>
        import(/* webpackChunkName: "portal" */ "./../view/portal.vue"),
    },
    redirect: {
      name: "login",
    },
    children: [
      {
        name: "login",
        path: "login",
        components: {
          keepalive: () =>
            import(/* webpackChunkName: "login" */ "./../view/login.vue"),
        },
        meta: {
          title: "Login",
          auth: false,
          root: true,
          toolbar: false
        },
      },
      {
        name: "home",
        path: "home",
        component: () =>
          import(/* webpackChunkName: "home'" */ "./../view/home.vue"),
        meta: {
          auth: true,
          title: "Bem-vindo",
        },
      },
      {
        name: "notfound",
        // path: "*",
        path: "notfound",
        component: () =>
          import(/* webpackChunkName: "notfound" */ "./../view/notfound.vue"),
        meta: {
          auth: false,
        },
      },
    ],
  },
  {
    path: "*",
    redirect: {
      name: "notfound",
    },
    meta: {
      auth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  // eslint-disable-next-line no-undef
  base: process.env.BASE_URL,
  routes: routes,
});

router.beforeEach((to, from, next) => {
  // console.log('router beforeEach');
  next();
});

export default router;
