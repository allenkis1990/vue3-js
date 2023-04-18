<template>
  <div class="content" ref="con"></div>
</template>

<script>
import {onMounted,getCurrentInstance} from 'vue'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import * as THREE from 'three'
//初始化场景
const scene = new THREE.Scene()
//初始化相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(0, 0, 0.1)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
//圆
const geometry = new THREE.SphereGeometry(5,32,32)
//材质
// const material = new THREE.MeshBasicMaterial({color:0x00ff00})
const loader = new RGBELoader()
loader.load('/img/Living.hdr',(texture)=>{
  const material = new THREE.MeshBasicMaterial({map:texture})
  const sphere = new THREE.Mesh(geometry,material)
  sphere.geometry.scale(1,1,-1)
  scene.add(sphere)
})

function render(){
  renderer.render(scene,camera)
  requestAnimationFrame(render)
}
export default {
  name: 'Vr',
  methods:{
  },
  components: {

  },
  setup(props){
    const currentInstance = getCurrentInstance()
    let _this = currentInstance.proxy
    onMounted(()=>{
      let con = _this.$refs.con
      const controls = new OrbitControls(camera,con)
      controls.enableDamping = true
      con.appendChild(renderer.domElement)
      render()
    })
    return {

    }
  }
}
</script>
<style lang="postcss">
*{
  margin:0;padding:0;
}
.content{
  width: 100vw;
  height: 100vh;
}
</style>
