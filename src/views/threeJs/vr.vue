<template>
  <div class="content" ref="con"></div>
</template>

<script>
import {onMounted,getCurrentInstance} from 'vue'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
//初始化场景
const scene = new THREE.Scene()
//初始化相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(0, 0, 0.1)

scene.add(camera)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
//立方体
const geometry = new THREE.BoxGeometry(10,10,10)
//材质
// const material = new THREE.MeshBasicMaterial({color:0x00ff00})

let arr = ['4_l','4_r','4_u','4_d','4_b','4_f']
let boxMaterials = []
arr.forEach((item)=>{
  let texture = new THREE.TextureLoader().load(require(`@src/assets/img/${item}.jpg`))
  if(item === '4_u' || item === '4_d'){
    texture.rotation = Math.PI
    texture.center = new THREE.Vector2(0.5,0.5)
  }
  boxMaterials.push(new THREE.MeshBasicMaterial({map:texture}))
  console.log(texture,123);
})



//立方体和材质结合
// const cube = new THREE.Mesh(geometry,material)
const cube = new THREE.Mesh(geometry,boxMaterials)
cube.geometry.scale(1,1,-1)
// cube.scale.set(1,1,-1)
scene.add(cube)
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



      //页面调整的时候做的操作 (自适应)
      window.addEventListener('resize',()=>{
        camera.aspect = window.innerWidth/window.innerHeight
        renderer.setSize(window.innerWidth,window.innerHeight)
        //更新摄像机矩阵投影
        camera.updateProjectionMatrix()
        //设置渲染器的像素比
        renderer.setPixelRatio(window.devicePixelRatio)
      })

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
