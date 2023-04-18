<template>
  <div class="home">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"/>
    </router-view>
  </div>
</template>

<script>


export default {
  name: 'ThreeJs',
  methods:{
    goRouter(goWhere){
      this.$router.push({
        name: goWhere,
      });
    }
  },
  components: {

  }
}
</script>
