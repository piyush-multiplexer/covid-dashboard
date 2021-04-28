import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("./components/Dashboard")
  },
  {
    path: "/server-pagination",
    name: "ServerPagination",
    component: () => import("./components/ServerSidePagination")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
