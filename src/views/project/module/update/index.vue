<template>
  <!--新增-->
  <el-dialog title="编辑模块" :visible.sync="dialogFormVisible" width="50%">
    <el-form
      ref="projectModuleUpdateRef"
      :rules="projectModuleUpdateRowDataRules"
      :model="projectModuleUpdateRowData"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="选择父节点">
        <el-cascader
          :key="cascaderKey"
          ref="cascaderModuleTree"
          :props="{ checkStrictly: true, label: 'name', value: 'id' }"
          v-model="projectModuleUpdateRowData.parentId"
          :options="rowData.moduleList"
          collapse-tags
          clearable
          :style="{ width: '100%' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <span>提示:模块层级结构及英文名称将转成java package</span>
      </el-form-item>
      <el-form-item prop="name" label="模块名称(汉)">
        <el-input
          v-model="projectModuleUpdateRowData.name"
          placeholder="请输入模块汉语名称"
        />
      </el-form-item>
      <el-form-item prop="simpleName" label="模块名称(英)">
        <el-input
          v-model="projectModuleUpdateRowData.simpleName"
          placeholder="请输入英文模块名称(建议一个单词)"
        />
      </el-form-item>
      <el-form-item prop="path" label="模块path">
        <el-input
          v-model="projectModuleUpdateRowData.path"
          placeholder="请输入模块汉语名称"
        />
      </el-form-item>
      <el-form-item prop="description" label="模块描述">
        <el-input
          v-model="projectModuleUpdateRowData.description"
          placeholder="简单介绍模块信息"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">
        提交
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
// 接口
import { ModuleUpdateRequest } from "@/sdk/modules/module/update";
import { ModuleDetailRequest } from "@/sdk/modules/module/detail";
import { TableListRequest } from "@/sdk/modules/table/list";
import { ModuleTreeRequest } from "@/sdk/modules/module/tree";
import mixins from "@/mixins";
export default {
  name: "ProjectModuleCreate",
  props: ["rowData"],
  mixins: [mixins],
  data() {
    return {
      cascaderKey: 0,
      moduleTree: [],
      moduleTreeParams: {
        projectId: undefined,
      },
      checkAll: true,
      isIndeterminate: true,
      projectTableList: [],
      loading: false,
      dialogFormVisible: false,
      projectModuleDetailQuery: {
        id: undefined,
      },
      projectModuleUpdateRowData: {
        id: undefined,
        parentId: 0,
        parentName: undefined,
        name: undefined,
        simpleName: undefined,
        path: undefined,
        description: undefined,
        type: 1,
      },
      projectModuleUpdateRowDataRules: {
        // name: [
        //   {required: true, message: '请输入模块名(汉)', trigger: 'blur'}
        // ],
        // simpleName: [
        //   {required: true, message: '请输入模块名(英)', trigger: 'blur'}
        // ],
        // path: [
        //   {required: true, message: '请输入密码', trigger: 'blur'}
        // ]
      },
    };
  },
  watch: {
    dialogFormVisible(val) {
      if (val) {
        console.log("-------this.rowData------", this.rowData);
        this.projectModuleUpdateRowData = this.rowData;
        this.projectId = this.rowData.projectId;
        this.projectModuleDetailQuery.id = this.rowData.id;
        this.$nextTick(() => {
          this.moduleTreeParams.projectId = this.projectId;
          this.dict("methodCategory");
          this.getProjectTableList();
          // this.loadModuleDetail();
          // this.loadProjectModuleTree();
        });
      }
    },
  },
  methods: {
    loadModuleDetail() {
      const request = new ModuleDetailRequest();
      request.setParams(this.projectModuleDetailQuery);
      request.api().then((res) => {
        this.projectModuleUpdateRowData = res.data;
      });
    },
    submitForm() {
      this.$refs["projectModuleUpdateRef"].validate((valid) => {
        if (valid) {
          let nodes = this.$refs["cascaderModuleTree"].getCheckedNodes(false); //注意2： 获取label值
          if (nodes.length > 0) {
            this.projectModuleUpdateRowData.parentId = nodes[0].value;
          } else {
            this.projectModuleUpdateRowData.parentId = 0;
          }
          const request = new ModuleUpdateRequest();
          request.setParams(this.projectModuleUpdateRowData);
          request.api().then((res) => {
            this.dialogFormVisible = false;
            this.$emit("loadData");
          });
        } else {
          return false;
        }
      });
    },
    getProjectTableList() {
      this.projectTableList = [];
      const request = new TableListRequest();
      request.setParams({ projectId: this.projectId });
      request.api().then((res) => {
        this.projectTableList = res.data;
      });
    },
    resetForm() {
      this.$refs["projectModuleUpdateRef"].resetFields();
    },
    handleCheckAllChange(val) {
      this.projectModuleUpdateRowData.defaultMethods = val ? allMethods : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      this.projectModuleUpdateRowData.defaultMethods = this.projectModuleUpdateRowData.defaultMethods;
    },
    loadProjectModuleTree() {
      ++this.cascaderKey;
      this.moduleTree = [];
      let request = new ModuleTreeRequest();
      request.setParams(this.moduleTreeParams);
      request
        .api()
        .then((res) => {
          this.moduleTree = res.data;
        })
        .catch((err) => {});
    },
  },
};
</script>
