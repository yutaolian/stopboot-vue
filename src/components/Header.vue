<template>
  <div class="header">
    <div class="logoBox" @click="$router.push('/')">
      <img src="../assets/logo.png" alt="" />
      <h1>Stop Boot</h1>
      <span v-if="title">{{ title }}</span>
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
  </div>
</template>

<script>
import { getCookies,removeCookies } from "@/utils/cookies-util.js";
export default {
  props: ["title"],
  data() {
    return {};
  },
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
      this.$router.push("/");
    },
  },
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
    margin-right: 10px;
  }
}
</style>
