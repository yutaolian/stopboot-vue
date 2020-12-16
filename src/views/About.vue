<template>
  <el-container class="container">
    <el-header class="fixedheader">Header</el-header>
    <el-container class="scrollbox">
      <el-aside width="200px" class="fixedaside">
        <el-tree
          :data="data"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-aside>
      <el-main class="main">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
        <i class="el-icon-circle-plus" @click="open"></i>
      </el-main>
    </el-container>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible:false,
      activeName:"second",
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        }
      ]
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    open(){
      this.dialogVisible = true
    }

  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding-top: 60px;
  .fixedheader {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .scrollbox {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
  .fixedaside {
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 80px;
    overflow: hidden;
  }
  .main {
    min-height: calc(100vh - 60px);
    width: 100%;
    padding-left: 200px;
    position: relative;
  }
  .el-icon-circle-plus{
    font-size: 60px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    cursor: pointer;
  }
}
</style>