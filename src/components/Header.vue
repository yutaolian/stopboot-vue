<template>
  <div class="header">
    <div class="logoBox" @click="$router.push('/')">
      <img src="../assets/logo.png" alt="" />
      <h1>Stop Boot</h1>
      <span v-if="title">{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:["title"]
};
</script>

<style lang="less" scoped>
.header {
  background: -webkit-linear-gradient(top, #ffffff, #ebf6fe);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 14px;
  box-sizing: border-box;
}
.logoBox {
  display: flex;
  align-items: center;
  & > img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
  & > h1 {
    font-size: 18px;
    margin-right: 10px;
  }
}
</style>
