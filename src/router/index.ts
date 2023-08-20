import AboutVue from "@/views/About.vue";
import HomeVue from "@/views/Home.vue";
import { createRouter, createWebHistory, type RouterOptions } from "vue-router";
import sourceData from "@/data.json";

const routes: RouterOptions["routes"] = [
  {
    path: "/",
    name: "Home",
    component: HomeVue,
  },
  {
    path: "/protected",
    name: "protected",
    component: () => import("@/views/Protected.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/about", name: "About", component: AboutVue },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("@/views/DestinationShow.vue"),
    beforeEnter(to) {
      const exists = sourceData.destinations.find(
        (destination) => destination.id === parseInt(to.params.id as string)
      );

      if (!exists)
        return {
          name: "NotFound",
          params: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
    },
    props: (route) => ({
      ...route.params,
      id: parseInt(route.params.id as string),
    }),
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("@/views/ExperienceShow.vue"),
        props: (route) => ({
          ...route.params,
          id: parseInt(route.params.id as string),
        }),
      },
    ],
  },
  {
    path: "/invoices",
    name: "invoices",
    component: () => import("@/views/Invoices.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound..vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300);
      })
    );
  },
});

router.beforeEach((to) => {
  //@ts-ignore
  if (to.meta.requiresAuth && !window?.user) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
