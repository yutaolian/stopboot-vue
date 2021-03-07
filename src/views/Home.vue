<template>
  <el-container>
    <div class="headerBox" direction="horizontal">
      <div class="header">
        <div class="logoBox">
          <img src="../assets/logo.png" alt="" />
          <h1>Stop Boot</h1>
        </div>
        <div class="infoBox" v-if="isToken">
          <span>{{ userInfo.name }}</span>
          <el-dropdown
            class="avatar-container right-menu-item hover-effect"
            trigger="click"
          >
            <div class="avatar-wrapper">
              <el-avatar :size="40" :src="userInfo.avatar" alt=""></el-avatar>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <!-- <router-link to="/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link> -->
              <el-dropdown-item>
                <span style="display:block;" @click="logout"> 退 出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else>
          <el-button @click="dialogTableVisible = true">登录</el-button>
        </div>
      </div>
      <div class="content">
        <div>StopBoot</div>
        <p>一站式代码生成工具，三步完成一个后台项目</p>
        <div>
          <el-button type="primary" round @click="$router.push('/project')"
            >开始你的创作
          </el-button>
        </div>
      </div>
    </div>
    <el-main>
      <div class="title">
        创作步骤
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="desing-step-num">
              1
            </div>
            <div class="desing-step-title">
              创建项目、数据库
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="desing-step-num">
              2
            </div>
            <div class="desing-step-title">
              编辑接口、表
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            <div class="desing-step-num">
              3
            </div>
            <div class="desing-step-title">
              生成代码、sql
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <!-- <el-button
      ><router-link :to="{ path: '/about' }">开始创作</router-link></el-button
    > -->
    <el-footer>
      <span>©2021</span
      ><el-link href="https://beian.miit.gov.cn/#/Integrated/index"
        >晋ICP备20005880号-2</el-link
      >
    </el-footer>
    <el-dialog title="登录" width="450px" :visible.sync="dialogTableVisible">
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
            key="password"
            ref="password"
            v-model="loginForm.password"
            type="password"
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
import { setCookies, getCookies ,removeCookies} from "@/utils/cookies-util.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      dialogTableVisible: false,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", message: "请输入账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  mounted() {},
  computed: {
    isToken() {
      return getCookies("Authorization") != null;
    },
    userInfo() {
      return JSON.parse(getCookies("userInfo"));
    },
  },
  methods: {
    logout() {
      removeCookies("Authorization");
      location.reload();
    },
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
            setCookies("Authorization", res.data.token);
            setCookies("userInfo", JSON.stringify(res.data.userInfo));
            setCookies("name", res.data.userInfo.name);
            setCookies("avatar", res.data.userInfo.avatar);
            location.reload();
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
.headerBox {
  // background-color:  #b3c0d1;#EBF6FE
  background: -webkit-linear-gradient(top, #ffffff, #ebf6fe);
  color: #333;
  display: flex;
  height: 450px;
  align-items: center;
  flex-direction: column;
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1280px;
    .infoBox {
      display: flex;
      align-items: center;
      & > span {
        margin-right: 10px;
      }
    }
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
    }
  }
  .content {
    height: 390px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    font-size: 60px;
    font-weight: 700;
    & > p {
      font-size: 24px;
    }
  }
}
.el-main {
  width: 1280px;
  padding: 0;
  margin: 0 auto;
  overflow-x: hidden;
  height: calc(100vh - 450px - 60px);
  .title {
    padding: 20px 0;
    font-size: 30px;
    color: #3e3e3e;
  }
  .desing-step-num {
    width: 100%;
    height: 120px;
    text-align: center;
    line-height: 100px;
    font-size: 50px;
  }
  .desing-step-title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }
}

.el-footer {
  text-align: center;
  line-height: 60px;
  & > span {
    font-size: 14px;
  }
}
</style>
