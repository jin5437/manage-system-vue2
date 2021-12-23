<template>
  <div class="left-menu-list">
    <el-menu
      :default-active="currentPath"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/Main" @click="selectMain">
        <i class="el-icon-eleme"></i>
        <span>首页</span>
      </el-menu-item>
      <el-submenu
        v-for="(item, index) in leftMenuList"
        :key="index"
        :index="item.name"
      >
        <template slot="title">
          <i :class="item.className"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
          @click="selectMenuList(item.name, child.path, child.name)"
        >
          {{ child.name }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      isCollapse: false,
      leftMenuList: [],
      currentPath: "/Main",
    };
  },
  methods: {
    // 点击首页菜单，切换到首页
    selectMain() {
      if (this.currentPath != "/Main") {
        this.$router.push("/Main");

        this.currentPath = "/Main"; //记录当前路径
        this.$bus.$emit("Main"); //触发Main事件，通知头部面包屑改变
        let pathMsg = ["首页"];
        sessionStorage.setItem("pathMsg", JSON.stringify(pathMsg));
      }
    },
    // 点击其他菜单
    selectMenuList(subName, path, name) {
      // 判断是否重复点击当前路径，解决，重复点击当前路径报错问题
      if (this.currentPath != path) {
        this.$router.push(path); //跳转到点击的目标路径下

        // 使用bus，给TopBar传递路径的name数据
        this.currentPath = path; //记录当前点击的路径
        let pathMsg = [subName, name];
        this.$bus.$emit("otherMenu", pathMsg); // 触发otherMenu事件，通知头部面包屑改变，将对应的标题数组传过去
        // 将JSON格式转换成字符串
        sessionStorage.setItem("pathMsg", JSON.stringify(pathMsg));
      }
    },
  },
  mounted() {
    // 左侧菜单，在leftMenuList数组中添加对象，实现添加新菜单
    (this.leftMenuList = [
      {
        path: "/permiss",
        name: "权限管理",
        className: "el-icon-lock",
        children: [
          {
            path: "/UserMana",
            name: "用户管理",
          },
          {
            path: "/RoleMana",
            name: "角色管理",
          },
          {
            path: "/MenuMana",
            name: "菜单管理",
          },
        ],
      },
      {
        path: "/goods",
        name: "商品管理",
        className: "el-icon-goods",
        children: [
          {
            path: "/AttrMana",
            name: "平台属性管理",
          },
          {
            path: "/SpuMana",
            name: "Spu管理",
          },
          {
            path: "/SkuMana",
            name: "Sku管理",
          },
        ],
      },
    ]),
      this.$bus.$off("isCollapse");
    this.$bus.$on("isCollapse", () => {
      this.isCollapse = !this.isCollapse;
    });
    console.log(window.location.hash.slice(1));
    if (window.location.hash.slice(1) == "/") {
      this.currtentPath = "/Main";
    } else {
      this.currentPath = window.location.hash.slice(1);
    }
    // this.currtentPath =
    //   window.location.hash.slice(1) == "/"
    //     ? "/Main"
    //     : console.log(this.currentPath);
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
}
.left-menu-list {
  height: 100%;
  overflow: auto;
  background-color: rgb(84, 92, 100);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>