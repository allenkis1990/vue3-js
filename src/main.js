import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import validationPlugin from './plugins/validation.js'

let vueInstance = createApp(App)

function clickMe(){
  alert('clickMe')
}
vueInstance.directive('clickMe',{
  mounted(ele, binding,vNode){
    if(ele){
      ele.addEventListener('click',clickMe)
      // console.log(ele.nodeName,9);
      console.log(ele, 'ele');
      console.log(binding,'binding');
      console.log(vNode,'vNode');
    }
  },
  unmounted(ele){
    ele.removeEventListener('click',clickMe)
  }
})

vueInstance.use(store).use(validationPlugin).use(router).mount('#app')
