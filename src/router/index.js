import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/design",
    name: "Design",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/design")
  },
  {
    path: "/project",
    name: "Project",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Project.vue")
  },

];

const router = new VueRouter({
  routes
});


//push
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}


export default router;
