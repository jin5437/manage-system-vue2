<template>
  <div id="app">
    <div id="nav">
      <Home></Home>
    </div>
    
  </div>
</template>
<script>
import Home from './components/Home.vue'
  export default {
    name:'App',
    components:{
      Home
    }
  }
</script>

<style lang="less">
#app {
  height: 100%;
   width: 100%;
}

#nav {
  width: 100%;
  height: 100%;
  
}
</style>
