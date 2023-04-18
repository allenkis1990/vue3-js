import { createApp } from 'vue'
import App from './App.vue'
import VueMapper from './vueMapper.js'
// import '@src/assets/pcss/index.pcss';
let getUrlParam = (key) => {
  let reg = new RegExp('[?|&]' + key + '=([^&]+)')
  let match = location.search.match(reg)
  return match && match[1]
}
let page = getUrlParam('page')
let router = VueMapper[page] || App
createApp(router).mount('#app')
