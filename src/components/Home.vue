<template>
  <div class="home-body">
    <div class="left-menu">
      <LeftMenuVue></LeftMenuVue>
    </div>
    <div class="right-main">
      <div class="top-bar">
        <TopBar></TopBar>
      </div>
      <div class="main-page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenuVue from "./LeftMenu.vue";
import TopBar from "./TopBar.vue";
export default {
  name: "Home",
  components: {
    LeftMenuVue,
    TopBar,
  },
};
</script>

<style>
.home-body {
  display: flex;
  width: 100%;
  height: 100%;
}
.right-main {
  flex: 1;
}
.top-bar {
  height: 55px;
  width: 100%;
  border-bottom: solid 1px #e6e6e6;
}
</style>
