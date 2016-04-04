# moensun-vue-form-validator
vue的form表单验证

###一共有如下的指令
v-ms-form

v-ms-required

v-ms-max

v-ms-min

v-ms-max-length

v-ms-min-length

v-ms-patten

v-ms-disabled

###具体用法
````
<template>
<form v-ms-form name="testForm">
    <input type="text" v-ms-required>
    <input type="text" v-ms-min="{min:10}">
    <input type="text" v-ms-max="{max:10}">
    <input type="text" v-ms-max-length="{maxLength:10}">
    <input type="text" v-ms-min-length="{minLength:10}">
    <input type="text" v-ms-patten="{patten:'/\d+/'}">
    <tree-combox v-ms-required="{key:'treeValue'}"></tree-combox>
    <button type="submit" v-ms-disabled="testForm.$invalid">提交</button>
</form>
</template>
<script>
    module.exports={
        data(){
            "testForm":{}
        }
    }
</script>
````
