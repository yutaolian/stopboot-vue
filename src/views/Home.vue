<template>
  <el-container>
    <el-header>
      Header <el-button @click="dialogTableVisible= true">登录</el-button></el-header>
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

    <el-button
      ><router-link :to="{ path: '/about' }">开始创作</router-link></el-button
    >
    <el-footer>Footer</el-footer>
    <el-dialog title="登录" :visible.sync="dialogTableVisible">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
          />
        </el-form-item>

        <el-button type="" @click.prevent="handleLogin">
          登录
        </el-button>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { AuthLoginRequest } from "@/sdk/modules/auth/login";
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
      dialogTableVisible: false,
      loginForm: {
        username: "",
        password: "",
      },
      passwordType: "password",
      loginRules: {
        username: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          let request = new AuthLoginRequest();
          request.setParams(this.loginForm);
          request.api().then((res) => {
            console.log(res);
            this.dialogTableVisible = false;
            this.$message({
              message: " 登录成功",
              type: "success",
            });
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify(res.data.userInfo)
            );
          });
        } else {
          console.log("login 参数错误");
          return false;
        }
      });
    },
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
