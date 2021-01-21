<template>
  <div>
    <Header :title="projectName" />
    <div class="content">
      <el-row :gutter="30" v-if="true" style="padding:30px">
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
        <div class="modules-list">
          模块列表
        </div>
        <div class="modules-info">
          <div class="modules-header">模块信息</div>
          <div class="methods-contariner">
            <el-row v-if="false" :gutter="30" style="padding:30px">
              <el-col :span="24">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <div class="image-box1">
                    <img src="../assets/plus.png" />
                    <span>创建方法</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>

            <div v-else class="methods-box">
              <div class="methods-list">
                方法列表
              </div>
              <div class="methods-info">
                <div class="methods-header">
                  方法头
                </div>
                <div class="methods-content">
                  方法实现
                </div>
              </div>
            </div>
          </div>
        </div>
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
  .image-box1 {
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
    .modules-list {
      height: 100%;
      width: 300px;
      background: chartreuse;
      overflow: auto;
    }
    .modules-info {
      .modules-header {
        background: chocolate;
        height: 60px;
        width: calc(100vw - 300px);
      }
      .methods-contariner {
        background: cornflowerblue;
        width: calc(100vw - 300px);
        height: calc(100vh - 120px);
        .methods-box {
          display: flex;
          .methods-list {
            width: 200px;
            height: calc(100vh - 120px);
            background: darkorchid;
          }
          .methods-info {
            background: red;
            width: calc(100vw - 500px);
            height: calc(100vh - 120px);
            .methods-header {
              height: 60px;
              width: calc(100vw - 500px);
              background: deeppink;
            }
            .methods-content {
              height: calc(100vh - 180px);
              width: calc(100vw - 500px);
              background: dodgerblue;
            }
          }
        }
      }
    }

    .methods {
      width: 200px;
      background: red;
    }
  }
}
</style>
