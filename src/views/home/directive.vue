<template>
  <button v-clickMe="'haha'">clickMe</button>
<!--  <input type="text" v-model="haha" name="ipt" v-clickMe>-->
<!--  <HelloWorld v-required="true" name="helloWorldhaha" v-model="aa.name"></HelloWorld>-->

<!--  {{myForm}}-->
  <div>
    <form name="myForm">
      {{myForm}}
      <ul>
        <li>
          姓名:<input type="text"
                    v-required="true"
                    name="username"
                    v-model="username">
          <span style="color:red" v-if="myForm.username.$error.required">姓名没值</span>
        </li>
        <li>
          年龄:<input type="text"
                    v-required="true"
                    name="age"
                    v-model="age">
          <span style="color:red" v-if="myForm.age.$error.required">年龄没值</span>
        </li>
        <li v-if="myForm.$invalid" style="color: red">整个表单没过</li>
      </ul>
    </form>
  </div>
</template>

<script>
import {defineComponent, ref, toRefs, reactive, watch, computed, onMounted,getCurrentInstance} from 'vue'
import HelloWorld from "../../components/HelloWorld";
import {initFormErrorObj} from "../../plugins/validation";

export default {
  name: 'directive',
  methods:{
  },
  components: {
    HelloWorld
  },
  setup(props){
    let data = reactive({
      haha:'wahaha',
      heihei:'',


      username:'',
      age:'',
      ...initFormErrorObj('myForm',['username','age'])
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>
<style lang="postcss">

</style>
