<template>
  <div class="outer">
    <div class="left-content">
      <div style="height: 50px;line-height: 50px;"><i class="el-icon-s-fold" @click="changeCollapse"></i></div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in pathMsg" :key="index">
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <i class="el-icon-caret-bottom"></i>
      <img src="../assets/cafe.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      pathMsg:[{name:'首页'}]
    };
  },
  methods: {
    changeCollapse() {
      this.$bus.$emit("isCollapse");
    },
  },
  mounted() {
    this.$bus.$off('Main')
    this.$bus.$on('Main',() => {
      this.pathMsg = [{name:'首页'}]
    }),

    this.$bus.$off('otherMenu')
    this.$bus.$on('otherMenu',(arr) => {
      let newList = []
      arr.forEach(item => {
        newList.push({name: item})
      });
      this.pathMsg = newList
    })

    //  刷新设置面包屑，先去缓存中取，如果没有，则默认为首页
    if(sessionStorage.getItem("pathMsg")){
      // 将缓存中的json字符串解析成json数组
      let arr = JSON.parse(sessionStorage.getItem("pathMsg"))
      let newList = []
      arr.forEach(item => {
        newList.push({name: item})
      });
      this.pathMsg = newList
    }
  },
};
</script>

<style lang="less" scoped>
.outer {
  width: 100%;
  height: 50px;
  
}
.el-icon-s-fold {
  color: #97cafa;
  cursor: pointer;
}
.el-icon-s-fold:hover {
  color: #1890ff;
}
.left-content {
  display: flex;
  margin-left: 15px;
  float: left;
}
.el-icon-caret-bottom {
  float: right;
  position: relative;
  top: 35px;
  width: 9px;
  height: 5px;
  right: 10px;
}
img {
  width: 40px;
  height: 40px;
  float: right;
  margin: 10px;
  border-radius: 10px;
}
.el-breadcrumb{
  margin-left: 16px;
  height: 50px;
  line-height: 50px;
}
.el-breadcrumb__item {
  // margin-left: 0px;
}
</style>