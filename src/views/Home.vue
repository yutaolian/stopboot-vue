<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <el-carousel height="600px" style="margin-bottom:40px">
        <el-carousel-item v-for="(item, index) in imgList" :key="index">
          <img :src="item" class="banner" />
        </el-carousel-item>
      </el-carousel>
        <el-row :gutter="40">
          <el-col :span="8">
            <img
              src="//img95.699pic.com/photo/40186/8252.jpg_wh860.jpg"
              class="imgbox"
            />
          </el-col>
          <el-col :span="8"
            ><img
              src="//img95.699pic.com/photo/40186/8252.jpg_wh860.jpg"
              class="imgbox"
          /></el-col>
          <el-col :span="8"
            ><img
              src="//img95.699pic.com/photo/40186/8252.jpg_wh860.jpg"
              class="imgbox"
          /></el-col>
        </el-row>
    </el-main>

    <el-button ><router-link :to="{path:'/about'}">开始创作</router-link></el-button>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      imgList: [
        "//img95.699pic.com/photo/40186/8252.jpg_wh860.jpg",
        "//img95.699pic.com/photo/40187/3069.jpg_wh860.jpg",
        "//img95.699pic.com/photo/40186/8252.jpg_wh860.jpg",
        "//img95.699pic.com/photo/40187/3069.jpg_wh860.jpg",
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  width: 1280px;
  padding: 0;
  margin: 0 auto;
  overflow-x: hidden;
}
.banner {
  width: 100%;
}
.imgbox {
  width: 100%;
  display: block;
}
</style>
