import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
const Home = () =>
    import(/* webpackChunkName: "home" */ "@/views/home/index.vue");
const ThreeJs = () =>
    import(/* webpackChunkName: "threeJs" */ "@/views/threeJs/index.vue");
import home from './home'
import threeJs from './threeJs'
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    redirect: "/home/index",
    children: [
        ...home
    ]
  },
  {
    path: "/threeJs",
    component: ThreeJs,
    redirect: "/threeJs/index",
    children: [
        ...threeJs
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),//history模式
  // history: createWebHashHistory(),//hash模式
  routes
})





export default router
