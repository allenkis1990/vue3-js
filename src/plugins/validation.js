/**
 * Created by Allen Liu on 2022/5/13.
 */
var utils = {
  isNull(str){
    if(typeof str === 'object'){
      var s = JSON.stringify(str)
      if(s==='{}'){
        return true
      }else if(s==='[]'){
        return true
      }else{
        return false
      }
    }else{
      return str === undefined || str === null || str === ''
    }
  },
  //是不是原生表单，如果是组件或者div之类的就不是
  isNativeFormType(ele){
    return ele.nodeName.toLowerCase()==='input' || ele.nodeName.toLowerCase()==='select'
  }
};
var watcher = null
function Validation(){}
Validation.prototype = {
  constructor:Validation,
  findParentNode(curEle,ele){
    let eleNodeName = curEle.nodeName.toLowerCase()
    if (eleNodeName === 'form') {
      ele.formName = curEle.name
    } else {
      var parentNode = curEle.parentNode;
      this.findParentNode(parentNode,ele);
    }
  },
  compiler:{
    required(scope,ele,nv){
      let formObj = scope[ele.formName]
      let formItemObj = formObj[ele.formItemName]
      if(nv){
        formItemObj.$error.required = false
      }else{
        formItemObj.$error.required = true
      }
      let keys = Object.keys(formItemObj.$error)
      let someIsError = keys.some((key)=>{
        return formItemObj.$error[key] === true
      })
      if(someIsError){
        formItemObj.$invalid = true
      }else{
        formItemObj.$invalid = false
      }


      let formObjKeys = Object.keys(formObj).filter((key)=>{return key!=='$invalid'})
      let formItemSomeIsError = formObjKeys.some((key)=>{
        return formObj[key].$invalid === true
      })
      if(formItemSomeIsError){
        formObj.$invalid = true
      }else{
        formObj.$invalid = false
      }


    }
  },
  getOptions(){

  }
}
let vueFormValidation = new Validation()


let validationPlugin = {
  install(Vue){
    Vue.directive('required',{
      mounted(ele, binding,vNode){
        // console.log(ele)
        // console.log(binding);
        // console.log(vNode);
        let scope = binding.instance
        let bindValue = binding.value;
        let props = vNode.props
        let formItemName = props.name
        ele.formItemName = props.name


        let modelValueFn = props['onUpdate:modelValue']
        if(!modelValueFn){
          console.log('必须声明v-model');
          return
        }

        //v-xxx="" 要有值
        if(utils.isNull(bindValue)){
          console.log('v-xxx="" 要有值');
          return
        }
        //name为必须
        if(utils.isNull(formItemName)){
          console.log('name为必须');
          return
        }


        //function ($event) {
        //       return _ctx.aa.name = $event;
        //     }
        let modelValueFnStr = props['onUpdate:modelValue'].toString()
        let reg = /\s_ctx\.(.+?)\s/ //匹配v-model里的字面量值 例：v-model='aa.a' 可以取到aa.a
        let matchs = modelValueFnStr.match(reg)
        if(!matchs || !matchs.length){
          console.log('匹配v-model的值发生错误')
          return
        }


        let required = bindValue
        if(!required){
          return
        }else{
          vueFormValidation.findParentNode(ele,ele)
        }


        let formName = ele.formName
        if(!formName){
          console.log('form元素的name必须声明')
          return
        }
        //初始化都是没值
        scope[ele.formName][formItemName].$error.required = true




        let vModelValue = matchs[1]
        watcher = scope.$watch(vModelValue,(nv)=>{
          console.log(nv);
          /*if(nv){
            scope[ele.formName][ele.formItemName].$error.required = true
          }else{
            scope[ele.formName][ele.formItemName].$error.required = false
          }*/
          vueFormValidation.compiler['required'](scope,ele,nv)
        })

      },
      unmounted(ele){
        watcher && watcher()
      }
    })
  }
}

export default validationPlugin

export let initFormErrorObj = function(formName,formItemList){
  let errObj = {
    [formName]:{$invalid:true}
  }
  formItemList.forEach((item)=>{
    errObj[formName][item] = {
      $invalid:true, //表单item没过
      $error:{}
    }
  })
  return errObj
}