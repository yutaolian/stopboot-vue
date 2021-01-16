<template>
  <el-container>
    <el-header>
<el-container height="60">

  <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
  <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
    <el-menu-item index="1">我的项目</el-menu-item>
  </el-menu>

  <el-button @click="dialogTableVisible= true">登录</el-button>
</el-container>


    </el-header>
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

const mysql = require('mysql2');

import { AuthLoginRequest } from "@/sdk/modules/auth/login";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      activeIndex2:1,
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
  mounted() {

// create the connection to database
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'test'
    });

// simple query
    connection.query(
            'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
            function(err, results, fields) {
              console.log(results); // results contains rows returned by server
              console.log(fields); // fields contains extra meta data about results, if available
            }
    );

// with placeholder
    connection.query(
            'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
            ['Page', 45],
            function(err, results) {
              console.log(results);
            }
    );
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
