<template>
<div>

  <div class="container">{{msg}}</div>
  <div>
    <router-link to="/">首页</router-link>
    <router-link to="/hello">nihao</router-link>
  </div>
</div>
</template>

<script>
import Hello from './components/Hello'
import Home from './components/Home'
  export default {
    name: 'App',
    data() {
      return {
        msg: '测试配置dsad'
      }
    },
    components: {
      Hello, Home
    }
  }
</script>

<style scoped>
  .container {
    background-color: red;
  }
</style>