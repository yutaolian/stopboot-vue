<template>
  <div>
    <Header :title="projectName" />
    <div class="content">
        <div v-if="moduleList.length == 0" class="add-module-box">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="image-box" @click="addModule">
              <img src="../../assets/plus.png" />
              <span>创建模块</span>
            </div>
          </el-card>
        </div>

      <div class="container" v-else>
        <div class="modules-list">
          <div class="box">
            <el-tree
              class="over"
              :data="moduleList"
              node-key="id"
              v-loading="loading"
              :props="defaultProps"
              default-expand-all
              @node-click="clickMoudle"
              current-node-key
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ data }">
                <span :class="{ active: moduleId == data.id }"
                  >{{ data.name }}({{ data.simpleName }})</span
                >
              </span>
            </el-tree>
          </div>
        </div>
        <div class="modules-info">
          <div class="modules-header">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span> {{ currentModule.name }}</span>
                <div class="modules-button-box">
                  <el-button @click="moduleDetail">
                    编辑模块
                  </el-button>
                  <el-button @click="addModule">
                    添加模块
                  </el-button>
                </div>
              </div>
              <el-row :gutter="10">
                <el-col :span="8"> path：{{ currentModule.path }} </el-col>
                <el-col :span="8"> </el-col>
                <el-col :span="8"> </el-col>
              </el-row>
            </el-card>
          </div>
          <div class="methods-contariner">
            <div class="sb-box">
              <el-card
                v-if="isAddMethod"
                class="image-box1"
                :body-style="{ padding: '0px' }"
                shadow="hover"
                @click.native="addMethod"
              >
                <div class="inner">
                  <img src="../../assets/plus.png" />
                  <span>创建方法</span>
                </div>
              </el-card>

              <div v-else class="methods-box">
                <div class="methods-list">
                  <ul class="sb-box">
                    <li><i class="el-icon-tickets"></i> 方法列表</li>
                    <li
                      v-for="item in moduleMethodListData"
                      @click="setMethodLogic(item)"
                      :key="item.id"
                      :class="{ active: methodId == item.id }"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                </div>
                <div class="methods-info" v-if="showAdd">
                  <div class="methods-header">
                    <el-card>
                      <div slot="header" class="clearfix">
                        <span>{{ currentMethod.name }}</span>
                        <div class="methods-button-box">
                          <el-button @click="updateMethod">
                            编辑方法
                          </el-button>
                          <el-button @click="addMethod">
                            添加方法
                          </el-button>
                        </div>
                      </div>
                      <el-row :gutter="10">
                        <el-col :span="8">
                          方法名称：{{ currentMethod.name }}
                        </el-col>
                        <el-col :span="8">
                          方法简介：{{ currentMethod.description }}
                        </el-col>
                        <el-col :span="8">
                          方法请求path：{{ currentMethod.path }}
                        </el-col>
                      </el-row>
                      <el-row :gutter="10">
                        <el-col :span="8">
                          方法请求path：{{ currentMethod.path }}
                        </el-col>
                        <el-col :span="8"></el-col>
                      </el-row>
                    </el-card>
                  </div>
                  <div class="methods-content">
                    <div class="mc-box sb-box">
                      <!-- <project-module-method-single-body
                        :row-data="projectModuleMethodBodyRowData"
                      />
                      <project-module-method-sql-body
                        :row-data="projectModuleMethodBodyRowData"
                      /> -->
                      <project-module-method-complex-body
                        :row-data="projectModuleMethodBodyRowData"
                      />
                    </div>
                  </div>
                </div>

                <el-card
                  v-else
                  class="image-box1"
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  @click.native="addMethod"
                >
                  <div class="inner">
                    <img src="../../assets/plus.png" />
                    <span>创建方法</span>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--新增模块组件-->
    <project-module-create
      ref="projectModuleCreate"
      :row-data="projectModuleCreateRowData"
      @loadData="loadData"
    />
    <!-- 编辑模块组件 -->
    <project-module-update
      ref="projectModuleUpdate"
      :row-data="projectModuleUpdateRowData"
      @loadData="loadData"
    />
    <!-- 新增方法组件 -->
    <project-module-method-create
      ref="projectModuleMethodCreate"
      :row-data="projectModuleMethodCreateRowData"
      @loadData="loadMethod"
    />
    <!-- 编辑方法组件 -->
    <project-module-method-update
      ref="projectModuleMethodUpdate"
      :row-data="projectModuleMethodUpdateRowData"
      @loadData="loadMethod"
    />
  </div>
</template>
<script>
import { ModuleTreeRequest } from "@/sdk/modules/module/tree";
import { MethodListRequest } from "@/sdk/modules/method/list";
import { TestCreateRequest } from "@/sdk/modules/test/test_requets";
import Header from "components/Header";
// 新增项目模块组件
import ProjectModuleCreate from "@/views/project/module/create";
import ProjectModuleUpdate from "@/views/project/module/update";
// 添加方法
import ProjectModuleMethodCreate from "@/views/project/method/create";
import projectModuleMethodUpdate from "@/views/project/method/update";

import ProjectModuleMethodSingleBody from "@/views/project/method/body/single/index";
import ProjectModuleMethodSqlBody from "@/views/project/method/body/sql/index";
import ProjectModuleMethodComplexBody from "@/views/project/method/body/complex/index";

export default {
  components: {
    Header,
    ProjectModuleCreate,
    ProjectModuleUpdate,
    ProjectModuleMethodCreate,
    projectModuleMethodUpdate,
    ProjectModuleMethodSingleBody,
    ProjectModuleMethodSqlBody,
    ProjectModuleMethodComplexBody,
  },
  data() {
    return {
      isAddMethod: false,
      moduleTreeParams: {
        projectId: undefined,
      },
      loading: false,
      tableLoading: false,
      moduleList: [],
      projectName: undefined,
      projectModuleCreateRowData: {
        projectId: undefined,
        parentId: undefined,
        moduleList: [],
      },
      moduleMethodListData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      projectModuleUpdateRowData: {
        projectId: undefined,
        parentId: undefined,
        moduleList: [],
      },
      projectModuleMethodCreateRowData: {
        projectId: undefined,
        moduleId: undefined,
        moduleName: undefined,
        modulePath: undefined,
      },
      projectModuleMethodBodyRowData: {
        projectId: undefined,
        moduleId: undefined,
        moduleName: undefined,
        modulePath: undefined,
      },
      projectModuleMethodUpdateRowData: {},
      projectId: undefined,
      moduleId: undefined,
      methodId: undefined,
      currentModule: {},
      currentMethod: {
        projectId: undefined,
        moduleId: undefined,
        moduleName: undefined,
        modulePath: undefined,
      },
      isDelete: false,
      showAdd: false,
    };
  },
  mounted() {
    this.projectName = this.$route.query.projectName;
    this.projectId = this.$route.query.projectId;
    if (this.$route.query.moduleId) {
      this.moduleId = this.$route.query.moduleId;
    }
    if (this.$route.query.methodId) {
      this.methodId = this.$route.query.methodId;
    }
    //加载模块树
    this.loadProjectModuleTree();
  },
  methods: {
    //刷新模块树
    loadData() {
      this.loadProjectModuleTree();
    },
    //模块点击
    clickMoudle(data) {
      if (data) {
        this.currentModule = data;
      }
      this.moduleId = this.currentModule.id;
      let path = this.$route.path;
      let query = {
        ...this.$route.query,
        moduleId: this.moduleId,
      };
      if (this.isDelete) {
        delete query.methodId;
      }
      this.$router.replace({
        path,
        query: query,
      });
      this.loadMethod();
    },
    //加载方法列表
    loadMethod() {
      this.tableLoading = true;
      this.isAddMethod = false;
      this.showAdd = false;
      this.moduleMethodListData = [];
      this.projectModuleMethodCreateRowData.moduleId = this.currentModule.id;
      this.projectModuleMethodCreateRowData.moduleName = this.currentModule.name;
      this.projectModuleMethodCreateRowData.modulePath = this.currentModule.path;
      const request = new MethodListRequest();
      request.setParams({ moduleId: this.currentModule.id });
      request.api().then((res) => {
        this.moduleMethodListData = res.data.list;
        if (
          this.moduleMethodListData.length > 0 &&
          !this.$route.query.methodId
        ) {
          //   this.methodId = this.moduleMethodListData[0].id;
          //   this.currentMethod = this.moduleMethodListData[0];
        } else {
          this.isDelete = true;
          this.isAddMethod = true;
          this.showAdd = true;
          this.currentMethod = this.moduleMethodListData.map((item) => {
            if (item.id == this.methodId) {
              return item;
            }
          });
        }
        this.tableLoading = false;
      });
    },
    //加载模块树
    loadProjectModuleTree() {
      this.loading = true;
      this.moduleList = [];
      this.moduleTreeParams.projectId = this.projectId;
      let request = new ModuleTreeRequest();
      request.setParams(this.moduleTreeParams);
      request
        .api()
        .then((res) => {
          this.moduleList = res.data.list;
          this.loading = false;
          var selectMoudle = undefined;
          if (this.moduleId) {
            this.getCurrentMoudle(this.moduleList, this.moduleId);
          } else {
            selectMoudle = this.moduleList[0];
          }
          this.clickMoudle(selectMoudle);
        })
        .catch((err) => {
          this.loading = false;
        });
    },

    getCurrentMoudle(moduleList, moduleId) {
      moduleList.forEach((element) => {
        if (element.id == moduleId) {
          this.currentModule = element;
          return;
        } else {
          this.getCurrentMoudle(element.children, moduleId);
        }
      });
    },

    //新增方法
    addMethod() {
      if (this.moduleId) {
        this.projectModuleMethodCreateRowData.projectId = this.projectId;
        this.projectModuleMethodCreateRowData.moduleId = this.moduleId;
        this.projectModuleMethodCreateRowData.moduleFullPath = this.currentModule.fullPath;
        this.$refs.projectModuleMethodCreate.dialogFormVisible = true;
      } else {
        this.$message({
          type: "error",
          message: "请选择模块",
        });
      }
    },
    //编辑模块
    moduleDetail(data) {
      this.projectModuleUpdateRowData = Object.assign({}, this.currentModule);
      this.projectModuleUpdateRowData.moduleList = this.moduleList;
      this.projectModuleMethodCreateRowData.projectId = this.projectId;
      this.projectModuleMethodCreateRowData.moduleId = this.moduleId;
      this.$refs.projectModuleUpdate.dialogFormVisible = true;
    },
    // 编辑方法
    updateMethod() {
      this.projectModuleMethodUpdateRowData = {
        ...this.currentModule,
        ...this.currentMethod,
      };
      this.projectModuleMethodUpdateRowData.projectId = this.projectId;
      this.projectModuleMethodUpdateRowData.moduleId = this.moduleId;
      this.projectModuleMethodUpdateRowData.moduleName = this.currentModule.name;
      this.projectModuleMethodUpdateRowData.moduleFullPath = this.currentModule.fullPath;
      this.$refs.projectModuleMethodUpdate.dialogFormVisible = true;
    },
    //设置方法的逻辑5
    setMethodLogic(row) {
      this.projectModuleMethodBodyRowData = Object.assign({}, row);
      this.showAdd = true;
      let path = this.$route.path;
      this.$router.replace({
        path,
        query: {
          ...this.$route.query,
          methodId: row.id,
        },
      });
      this.methodId = row.id;
      this.currentMethod = Object.assign({}, row);
      //   if (row.mold == "single") {
      //     this.$refs.projectModuleMethodBodyRef.dialogFormVisible = true;
      //   } else if (row.mold == "sql") {
      //     this.$refs.projectModuleMethodSqlRef.dialogFormVisible = true;
      //   } else if (row.mold == "complex") {
      //     this.$refs.projectModuleMethodComplexRef.dialogFormVisible = true;
      //   }
    },
    //新增模块
    addModule() {
      this.projectModuleCreateRowData.moduleList = this.moduleList;
      this.projectModuleCreateRowData.projectId = this.projectId;
      this.projectModuleCreateRowData.parentId = this.currentModule.id;
      this.projectModuleCreateRowData.parentName = this.currentModule.name;
      this.$refs.projectModuleCreate.dialogFormVisible = true;
    },
  },
};
</script>
<style lang="less" scoped>
.active {
  color: red;
}
.sb-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #ffffff;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.content {
  .image-box1 {
    width: 200px;
    height: 200px;
    margin: 8px;
    .inner {
      display: flex;
      height: 200px;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      &>img{
        margin-bottom:  20px;
      }
    }
  }
  .add-module-box {
    width: 200px;
    height: 200px;
    padding: 12px;
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
      //   background: chartreuse;
      padding: 8px;
      box-sizing: border-box;

      .box {
        width: 284px;
        height: 100%;
        overflow: auto;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        background-color: #ffffff;
        color: #303133;
        transition: 0.3s;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
    .modules-info {
      .modules-header {
        // background: chocolate;
        height: 132px;
        width: calc(100vw - 300px);
        position: relative;
        padding: 8px 8px 0;
        box-sizing: border-box;
        .modules-button-box {
          position: absolute;
          right: 30px;
          top: 20px;
        }
      }
      .methods-contariner {
        // background: cornflowerblue;
        width: calc(100vw - 300px);
        height: calc(100vh - 192px);
        padding: 8px;
        box-sizing: border-box;
        .methods-box {
          display: flex;
          .methods-list {
            width: 200px;
            height: calc(100vh - 192px);
            // background: darkorchid;
            padding: 8px 8px 24px 8px;
            box-sizing: border-box;
            overflow: auto;
            & > ul {
              margin: 0;
              padding: 8px;
              overflow: auto;
              & > li:first-child {
                font-size: 16px;
              }
              & > li {
                list-style: none;
                text-align: center;
                width: 100%;
                line-height: 40px;
                font-size: 14px;
                border-bottom: 1px solid #eee;
              }
            }
          }
          .methods-info {
            // background: red;
            width: calc(100vw - 500px);
            height: calc(100vh - 192px);
            .methods-header {
              height: 165px;
              width: calc(100vw - 500px);
              //   background: deeppink;
              padding: 8px 8px 0 0;
              box-sizing: border-box;
              position: relative;
              .methods-button-box {
                position: absolute;
                right: 30px;
                top: 20px;
              }
            }
            .methods-content {
              height: calc(100vh - 60px - 165px - 140px);
              width: calc(100vw - 500px);
              padding: 0px 8px 16px 0;
              box-sizing: border-box;
              //   background: dodgerblue;
              .mc-box {
                padding: 20px;
                overflow: auto;
              }
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
