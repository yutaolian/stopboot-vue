<template>
  <div class="app-container">
    <div class="filter-container">
      sdk项目生成配置
    </div>
    <aside>
      该业务的主要目的是将大前端从对接后端接口的工作琐碎工作中解放出来。上一个项目可以生成服务端的接口的工程代码。这个项目基于项目的配置生成
      一套于服务端项目完全契合的多语言的sdk代码。将接口与前端业务.UI解耦。目标是做到将下载的源码不改一行代码便可集成完整的业务接口。
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
            class="table"
            @selection-change="projectSelectionChange"
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
              label="已选方法数量"
              align="center"
            >
              <template slot-scope="scope">
                <el-link type="primary" @click="showMethodInfo(scope.row)">
                  {{count(scope.row)}}/{{
                  scope.row.methodCount
                }}</el-link>
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
            <el-form-item label="语言">
              <el-radio-group v-model="form.type">
                <el-radio label="JavaScript(ES6)"></el-radio>
                <el-radio label="Java"></el-radio>
                <el-radio label="Java(android)"></el-radio>
                <!--                <el-radio label="kotlin"></el-radio>-->
                <!--                <el-radio label="kotlin(android)"></el-radio>-->
                <el-radio label="Objective-c"></el-radio>
                <!--                <el-radio label="Swift"></el-radio>-->
                <!--                <el-radio label="Go"></el-radio>-->
                <!--                <el-radio label="Python"></el-radio>-->
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="form.resource">
                <el-checkbox
                  label="美食/餐厅线上活动"
                  name="type"
                ></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
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
        resource: []
      },
      projectList: [],
      projectId: undefined,
      projectModuleListForm: {
        projectId: undefined
      },
      projectModuleListData: [],
      selectedModuleListData: [],
      projectMultipleSelection: [],
      loading: false,
      radio: undefined,
      rowData: {},
      aboutToSubmit: {
        projectId: undefined,
        modules: []
      }
    };
  },
  filters: {},
  created() {
    this.loadProjectList();
  },
  components: {
    GeneratorDialog
  },
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
      request.api().then(res => {
        this.projectList = res.data.list;
      });
    },
    projectChange(val) {
      this.loadData(val);
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
