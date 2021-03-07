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
            <el-table-column type="selection" width="55"> </el-table-column>
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
                  {{ count(scope.row) }}/{{ scope.row.methodCount }}</el-link
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="16">
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            style="margin-left: 40px"
          >
            <el-form-item label="构建工具">
              <el-radio-group v-model="form.build">
                <el-radio label="maven"></el-radio>
                <el-radio label="gradle"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="项目类型">
              <el-radio-group v-model="form.type">
                <el-radio label="springboot"></el-radio>
                <el-radio label="dubbo"></el-radio>
                <el-radio label="springcloud"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动性质">
<!--              <el-checkbox-group v-model="form.resource">-->
<!--                <el-checkbox-->
<!--                  label="美食/餐厅线上活动"-->
<!--                  name="type"-->
<!--                ></el-checkbox>-->
<!--                <el-checkbox label="地推活动" name="type"></el-checkbox>-->
<!--                <el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
<!--                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
<!--              </el-checkbox-group>-->

              <el-checkbox-group v-model="feFrameworkType">
                <el-checkbox
                  v-for="item in this.dictValueMap.fe_framework_type"
                  :label="item.dicValue"
                  :key="item.id"
                >
                  {{ item.dicDesc }}
                </el-checkbox>
              </el-checkbox-group>

              <el-radio-group v-model="feFrameworkType">
                <el-radio
                  v-for="item in this.dictValueMap.fe_framework_type"
                  :label="item.dicValue"
                  :key="item.id"
                  >{{ item.dicDesc }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">生成项目</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <generator-dialog
      ref="generatorDialog"
      @modifySubmittedData="modifySubmittedData"
      :rowData="rowData"
      :aboutToSubmit="aboutToSubmit"
    />
  </div>
</template>

<script>
//sdk
import { ProjectListRequest } from "@/sdk/modules/project/list";

import { ProjectInfoRequest } from "@/sdk/modules/project/info";
//接口混入
import mixins from "@/mixins";
import GeneratorDialog from "@/views/generator/generatordialog";
export default {
  name: "System-Dictionary-Table",
  mixins: [mixins],
  data() {
    return {
      form: {
        type: undefined,
        resource: [],
        build:undefined,
      },
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
      aboutToSubmit: {
        // 这是拼装好要提交的数据
        projectId: undefined,
        modules: []
      }
    };
  },
  components: {
    GeneratorDialog
  },
  filters: {},
  created() {
    this.loadProjectList();
    this.$nextTick(() => {
      this.dict("fe_framework_type");
    });
  },
  computed: {},
  methods: {
    count(row) {
      for (let i = 0; i < this.aboutToSubmit.modules.length; i++) {
        if (row.id == this.aboutToSubmit.modules[i].moduleId) {
          return this.aboutToSubmit.modules[i].methodIds.length;
        }
      }
    },
    /**
     * 加载项目列表
     */
    loadProjectList() {
      const request = new ProjectListRequest();
      request.setParams({ userId: 1 });
      request.api().then(res => {
        this.projectList = res.data;
      });
    },
    projectChange(val) {
      this.loadData(val);
      this.aboutToSubmit.projectId = val;
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
          this.$nextTick(function() {
            this.checkedModule(); //每次更新了数据，触发这个函数即可。
          });
        });
      }
    },
    onSubmit() {
      console.log(JSON.stringify(this.aboutToSubmit));
      // window.location.href=;
      window.open("/api/downLoad11111");
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
      this.aboutToSubmit.modules = modules;
    },
    modifySubmittedData(id, list) {
      this.aboutToSubmit.modules = this.aboutToSubmit.modules.map(item => {
        if (item.moduleId === id) {
          item.methodIds = list;
        }
        return item;
      });
    }
  }
};
</script>
