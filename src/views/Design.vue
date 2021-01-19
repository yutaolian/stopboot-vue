<template>
  <div>
    <Header :title="projectName" />
    <div class="content">
      <el-row :gutter="30" v-if="moduleList.length == 0" style="padding:30px">
        <el-col :span="3">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="image-box">
              <img src="../assets/plus.png" />
              <span>创建模块</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="container" v-else>
        <div class="modules">
          模块列表
        </div>
        <div class="methods" v-if="true">
          方法列表
        </div>
        <el-row v-else :gutter="30" style="padding:30px">
            <el-col :span="24">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div class="image-box1">
                  <img src="../assets/plus.png" />
                  <span>创建方法</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { ModuleTreeRequest } from "@/sdk/modules/module/tree";
import { TestCreateRequest } from "../sdk/modules/test/test_requets";
import Header from "components/Header";
export default {
  components: {
    Header,
  },
  data() {
    return {
      moduleTreeParams: {
        projectId: undefined,
      },
      moduleList: [],
      projectName: undefined,
    };
  },
  mounted() {
    this.projectName = this.$route.query.projectName;
    this.loadProjectModuleTree();
  },
  methods: {
    loadProjectModuleTree() {
      // this.loading = true;
      this.moduleList = [];
      this.moduleTreeParams.projectId = this.$route.query.projectId;
      let request = new ModuleTreeRequest();
      request.setParams(this.moduleTreeParams);
      request
        .api()
        .then((res) => {
          this.moduleList = res.data.list;
          // this.loading = false;
          //默认加载一条数据
          // let firstData = this.moduleList[0];
          // this.loadMethod(firstData);
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    loadMethod(data) {
      this.tableLoading = true;
      this.moduleId = data.id;
      this.moduleName = data.name;
      this.moduleMethodListData = [];
      this.projectModuleMethodCreateRowData.moduleId = data.id;
      this.projectModuleMethodCreateRowData.moduleName = data.name;
      this.projectModuleMethodCreateRowData.modulePath = data.path;
      const request = new MethodListRequest();
      request.setParams({ moduleId: data.id });
      request.api().then((res) => {
        this.moduleMethodListData = res.data.list;
        this.tableLoading = false;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  .image-box1{
    width: 200px;
    height: 200px;
  }
  .image-box {
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    position: relative;
    & > img {
      width: 46px;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    & > span {
      font-size: 14px;
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .container {
    display: flex;
    height: calc(100vh - 60px);
    .modules {
      height: 100%;
      width: 200px;
      background: chartreuse;
    }
    .methods{
      width: 200px;
      background: red;
    }
  }
}
</style>
