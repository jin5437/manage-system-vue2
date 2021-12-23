<template>
  <div class="main-content">
    <div class="header">
      <div class="header1"></div>
      <div class="header2"></div>
      <div class="header3"></div>
      <div class="header4"></div>
    </div>
    <div class="middle">
      这是middle
    </div>
    <div class="footer">
      <div class="left-footer"></div>
      <div class="right-footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>

<style scoped>
.main-content{
  width: 100%;
  height: 100%;
}
.header{
  display: flex;
  justify-content:space-between;
  border-bottom: solid 2px gray;
  margin: 10px auto;
}
.header1{
  width: 25% ;
  height: 190px;
  background-color: red;
}
.header2{
  width:25% ;
  height: 190px;
  background-color: green;
}
.header3{
  width:25% ;
  height: 190px;
  background-color: blue;
}
.header4{
  width:25% ;
  height: 190px;
  background-color: orange;
}
.middle{
  width: 100%;
  height: 435px;
  background-color: #bfa;
  /* text-align: center; */
  margin: 10px auto;
}
.footer{
  width: 100%;
  height: 420px;
  background-color: hotpink;
  margin: 10px auto;
  display: flex;
}
.left-footer{
  width: 50%;
  height: 350px;
  background-color: lemonchiffon;
}
.right-footer{
  width:  50%;
  height: 420px;
  background-color: lightblue;
}
</style>