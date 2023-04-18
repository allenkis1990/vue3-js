/**
 * Created by Allen Liu on 2020/4/11.
 */
const Vr = () =>
    import(/* webpackChunkName: "threeJs" */ "@src/views/threeJs/vr.vue");
const Vr_circle = () =>
    import(/* webpackChunkName: "threeJs" */ "@src/views/threeJs/vr_circle.vue");

export default [
  {
    path: "vr",
    name: "vr",
    component: Vr,
    meta: {
      title: "vr",
      keepAlive: false
    }
  },
  {
    path: "vr_circle",
    name: "vr_circle",
    component: Vr_circle,
    meta: {
      title: "vr_circle",
      keepAlive: false
    }
  }
]