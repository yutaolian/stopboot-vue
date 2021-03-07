<template>
  <div class="app-container">
    <div class="filter-container">
      服务端项目生成配置
    </div>
    <aside>
      该业务会生成基于springboot的一个或一些列的java maven
      项目。包含基于用户基本配置及生成项目时的选择配置。同时包含已选择的模块和接口完整的请求
      响应的实体类和流程，力求做法不该或很少改代码即可运行的项目模板代码。（复杂业务逻辑还需要开发者填充）
    </aside>
    <div>
      <el-select
        v-model="projectId"
        placeholder="选择项目"
        @change="projectChange"
      >
        <el-option
          v-for="item in projectList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>

    <div style="margin-top: 20px">
      <el-row>
        <el-col :span="8">
          <el-table
            ref="multipleTable"
            :data="projectModuleListData"
            v-loading="loading"
            border
            stripe
            @selection-change="projectSelectionChange"
            class="table"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
              prop="name"
              label="模块名称(汉语)"
              align="center"
            />
            <el-table-column
              prop="simpleName"
              label="模块名称(英语)"
              align="center"
            />
            <el-table-column
              prop="methodCount"
              label="已选/总方法数量"
              align="center"
            >
              <template slot-scope="scope">
                <el-link type="primary" @click="showMethodInfo(scope.row)">
                  {{ count(scope.row) }}/{{ scope.row.methodCount }}
                </el-link
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="16">
          <el-form
            ref="form"
            :model="generatorInfo"
            label-width="120px"
            style="margin-left: 40px"
          >
            <el-form-item label="构建工具">
              <el-radio-group v-model="generatorInfo.buildType">
                <el-radio
                  v-for="item in dictValueMap.buildType"
                  :label="item.dicValue"
                  :key="item.id"
                  :disabled="item.disableFlag===0"
                >{{ item.dicDesc }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="服务类型">
              <el-radio-group v-model="generatorInfo.serviceType">
                <el-radio
                  v-for="item in dictValueMap.serviceType"
                  :label="item.dicValue"
                  :key="item.id"
                  :disabled="item.disableFlag===0"
                >{{ item.dicDesc }}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="orm类型">
              <el-radio-group v-model="generatorInfo.ormType">
                <el-radio
                  v-for="item in dictValueMap.ormType"
                  :label="item.dicValue"
                  :key="item.id"
                  :disabled="item.disableFlag===0"
                >{{ item.dicDesc }}
                </el-radio>
              </el-radio-group>
            </el-form-item>


            <el-form-item label="数据源类型">
              <el-radio-group v-model="generatorInfo.dataSourceType">
                <el-radio
                  v-for="item in dictValueMap.dataSourceType"
                  :label="item.dicValue"
                  :key="item.id"
                  :disabled="item.disableFlag===0"
                >{{ item.dicDesc }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-divider>待开发</el-divider>

            <el-form-item label="鉴权框架">
              <el-radio-group v-model="generatorInfo.securityType">
                <el-radio
                  v-for="item in dictValueMap.securityType"
                  :label="item.dicValue"
                  :key="item.id"
                  :disabled="true"
                >{{ item.dicDesc }}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="缓存类型">
              <el-radio-group v-model="generatorInfo.cacheType">
                <el-radio
                  v-for="item in dictValueMap.cacheType"
                  :label="item.dicValue"
                  :key="item.id"
                  :disabled="true"
                >{{ item.dicDesc }}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <!--            <el-form-item label="其他组件">-->
            <!--              <el-radio-group v-model="generatorInfo.otherType">-->
            <!--                <el-radio-->
            <!--                  v-for="item in dictValueMap.otherType"-->
            <!--                  :label="item.dicValue"-->
            <!--                  :key="item.id"-->
            <!--                  :disabled="true"-->
            <!--                >{{ item.dicDesc }}-->
            <!--                </el-radio>-->
            <!--              </el-radio-group>-->
            <!--            </el-form-item>-->

            <el-form-item label="其他组件">
              <el-checkbox-group v-model="generatorInfo.otherComponents">
                <el-checkbox
                  v-for="item in dictValueMap.otherComponents"
                  :label="item.dicValue"
                  :key="item.id"
                  :disabled="true"
                >
                  {{ item.dicDesc }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>


            <!--            <el-form-item label="鉴权框架">-->
            <!--              <el-checkbox-group v-model="generatorInfo.securityType">-->
            <!--                <el-checkbox-->
            <!--                  v-for="item in dictValueMap.securityType"-->
            <!--                  :label="item.dicValue"-->
            <!--                  :key="item.id"-->
            <!--                >-->
            <!--                  {{ item.dicDesc }}-->
            <!--                </el-checkbox>-->
            <!--              </el-checkbox-group>-->
            <!--            </el-form-item>-->
            <el-form-item>
              <el-button type="success" @click="onSubmit">生成项目</el-button>
              <el-button v-if="codeSuccess" type="primary" @click="codePreview">预览代码</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <generator-dialog
      ref="generatorDialog"
      @modifySubmittedData="modifySubmittedData"
      :rowData="rowData"
      :generatorInfo="generatorInfo"
    />
  </div>
</template>

<script>
  //sdk
  import {GeneratorExecuteRequest} from "@/sdk/modules/generator/execute";
  import {ProjectListRequest} from "@/sdk/modules/project/list";
  import {ProjectInfoRequest} from "@/sdk/modules/project/info";

  //components
  import GeneratorDialog from "@/views/generator/generatordialog";

  //接口混入
  import mixins from "@/mixins";
  import {Message} from "element-ui";

  export default {
    name: "System-Dictionary-Table",
    mixins: [mixins],
    data() {
      return {
        codeSuccess: false,
        projectList: [],
        projectId: undefined,
        projectModuleListForm: {
          projectId: undefined
        },
        projectModuleListData: [],
        selectedModuleListData: [],
        projectMultipleSelection: [], //module选中的数据
        loading: false,
        radio: undefined,
        rowData: {},
        feFrameworkType: [],
        generatorInfo: {
          type: 'service',
          projectId: undefined,
          modules: [],
          ormType: undefined,
          serviceType: undefined,
          buildType: undefined,
          securityType: undefined,
          cacheType: undefined,
          otherComponents: [],
          dataSourceType: undefined,
        }
      };
    },
    components: {
      GeneratorDialog
    },
    created() {
      this.projectId = parseInt(this.$route.query.id)
      this.loadProjectList();
      this.$nextTick(() => {
        this.dict("fe_framework_type");
        this.dict("ormType");
        this.dict("serviceType");
        this.dict("buildType");
        this.dict("securityType");
        this.dict("cacheType");
        this.dict("otherComponents");
        this.dict("dataSourceType");


      });
      this.init()
      this.loadData(this.projectId)
      this.generatorInfo.projectId = this.projectId
    },
    methods: {
      init() {
        this.generatorInfo.buildType = 'maven'
        this.generatorInfo.serviceType = 'springboot'
        this.generatorInfo.ormType = 'mybatis-plus'
      },
      count(row) {
        for (let i = 0; i < this.generatorInfo.modules.length; i++) {
          if (row.id == this.generatorInfo.modules[i].moduleId) {
            return this.generatorInfo.modules[i].methodIds.length;
          }
        }
      },
      /**
       * 加载项目列表
       */
      loadProjectList() {
        const request = new ProjectListRequest();
        request.api().then(res => {
          this.projectList = res.data.list;
          this.loadData(this.projectList[0].id)
          this.projectId = this.projectList[0].id
        });
      },
      projectChange(projectId) {
        this.loadData(projectId);
        this.generatorInfo.projectId = projectId;
        let path = this.$router.history.current.path;
        this.$router.push({path, query: {id: projectId}});
      },

      loadData(projectId) {
        if (projectId) {
          this.loading = true;
          this.projectModuleListForm.projectId = projectId;
          const request = new ProjectInfoRequest();
          request.setParams(this.projectModuleListForm);
          request.api().then(res => {
            this.projectModuleListData = res.data.moduleList;
            this.loading = false;
            this.$nextTick(function () {
              this.checkedModule(); //每次更新了数据，触发这个函数即可。
            });
          });
        }
      },
      onSubmit() {
        console.log(JSON.stringify(this.generatorInfo));
        const request = new GeneratorExecuteRequest();
        request.setParams(this.generatorInfo);
        request.api().then(res => {
          this.codeSuccess = true
        });

      },
      showMethodInfo(row) {
        this.$refs.generatorDialog.innerVisible = true;
        this.rowData = row;
      },
      checkedModule() {
        this.projectModuleListData.forEach((row, index) => {
          this.$refs.multipleTable.toggleRowSelection(
            this.projectModuleListData[index]
          );
        });
      },
      projectSelectionChange(val) {
        this.projectMultipleSelection = val;
        let modules = val.map(item => {
          return {
            moduleId: item.id,
            methodIds: item.methodList.map(item => {
              return item.id;
            })
          };
        });
        this.generatorInfo.modules = modules;
      },
      modifySubmittedData(id, list) {
        this.generatorInfo.modules = this.generatorInfo.modules.map(item => {
          if (item.moduleId === id) {
            item.methodIds = list;
          }
          return item;
        });
      },
      codePreview() {
        if (this.projectId) {
          this.$router.push({path: '/project/preview', query: {id: this.projectId}})
        } else {
          Message.error({
            message: '请选择项目'
          });
        }
      }
    }
  };
</script>
