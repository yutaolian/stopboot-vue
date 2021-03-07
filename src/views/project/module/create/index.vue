<template>
  <!--新增-->
  <el-dialog title="新增模块" :visible.sync="dialogFormVisible" width="700px">
    <el-form
      ref="projectModuleCreateRef"
      :rules="projectModuleCreateRowDataRules"
      :model="projectModuleCreateRowData"
      :size="'small'"
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="选择父节点">
        <el-cascader
          placeholder="根节点"
          :key="cascaderKey"
          ref="cascaderModuleTree"
          :props="{ checkStrictly: true, label: 'name', value: 'id' }"
          v-model="projectModuleCreateRowData.parentId"
          :options="rowData.moduleList"
          collapse-tags
          clearable
          :style="{ width: '100%' }"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <p style="margin:0">提示:模块层级结构及英文名称将转成java package</p>
      </el-form-item>

      <el-form-item prop="name" label="模块名称(汉)">
        <el-input
          v-model="projectModuleCreateRowData.name"
          placeholder="请输入模块汉语名称"
        />
      </el-form-item>
      <el-form-item prop="simpleName" label="模块名称(英)">
        <el-input
          v-model="projectModuleCreateRowData.simpleName"
          placeholder="请输入英文模块名称(建议一个单词)"
        />
      </el-form-item>
      <el-form-item prop="path" label="模块path">
        <el-input
          v-model="projectModuleCreateRowData.path"
          placeholder="请输入模块汉语名称"
        />
      </el-form-item>
      <el-form-item prop="description" label="模块描述">
        <el-input
          v-model="projectModuleCreateRowData.description"
          placeholder="简单介绍模块信息"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>

      <!-- <el-form-item>
        <p>提示:配置模块单表映射(仅可生成针对单表的方法逻辑)</p>
      </el-form-item> -->
      <!-- <el-form-item label="是否生成默认方法">
        <el-radio-group v-model="projectModuleCreateRowData.defaultMethodFlag">
          <el-radio label="0">暂不</el-radio>
          <el-radio label="1">使用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-row v-if="projectModuleCreateRowData.defaultMethodFlag == '1'">
        <el-form-item label="选择业务表">
          <el-select
            v-model="projectModuleCreateRowData.tableId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in projectTableList"
              :key="item.id"
              :label="item.tableName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="已有方法分类">
          <el-checkbox-group
            v-model="projectModuleCreateRowData.methodCategory"
          >
            <el-checkbox
              v-for="item in dictValueMap.methodCategory"
              :label="item.dicDesc"
              :key="item.id"
              :value="item.dicValue"
            >
              {{ item.dicDesc }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-row> -->
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
import { ModuleCreateRequest } from "@/sdk/modules/module/create";
import { TableListRequest } from "@/sdk/modules/table/list";
// import { ModuleTreeRequest } from "@/sdk/modules/module/tree";
import mixins from "@/mixins";
export default {
  name: "ProjectModuleCreate",
  props: ["rowData"],
  mixins: [mixins],
  data() {
    return {
      moduleList: [],
      cascaderKey: 1,
      checkAll: true,
      isIndeterminate: true,
      projectTableList: [],
      loading: false,
      dialogFormVisible: false,
      projectModuleCreateRowData: {
        parentId: 0,
        parentName: undefined,
        projectId: undefined,
        name: undefined,
        simpleName: undefined,
        path: undefined,
        tableId: undefined,
        type: 1,
        defaultMethodFlag: "0",
        defaultMethods: undefined,
        methodCategory: [],
        description: undefined,
      },
      moduleTreeParams: {
        projectId: undefined,
      },
      moduleTree: [],
      projectModuleCreateRowDataRules: {
        name: [{ required: true, message: "请填写模块名称", trigger: "blur" }],
        simpleName: [
          { required: true, message: "请填写模块英文名称", trigger: "blur" },
        ],
        path: [{ required: true, message: "请填写模块path", trigger: "blur" }],
      },
    };
  },
  watch: {
    dialogFormVisible(val) {
      // this.cascaderModuleTreeReset(this.rowData.moudleList);
      // this.moduleList = this.rowData.moudleList;
      if (val) {
        this.projectModuleCreateRowData = Object.assign(
          this.projectModuleCreateRowData,
          this.rowData
        );
        this.projectId = this.projectModuleCreateRowData.projectId;
        this.moduleTreeParams.projectId = this.projectId;
        this.$nextTick(() => {
          // this.loadProjectModuleTree();
          // this.getProjectTableList();
          this.dict("methodCategory");
        });
      }
    },
  },
  created() {},
  methods: {
    cascaderModuleTreeReset(list) {
      if (list != null) {
        for (let index = 0; index < list.length; index++) {
          var element = list[index];
          if (element.children != null && element.children.length == 0) {
            element.children = null;
          } else {
            this.cascaderModuleTreeReset(element.children);
          }
        }
      }
    },
    submitForm() {
      this.$refs["projectModuleCreateRef"].validate((valid) => {
        if (valid) {
          let nodes = this.$refs["cascaderModuleTree"].getCheckedNodes(false); //注意2： 获取label值
          if (nodes.length > 0) {
            this.projectModuleCreateRowData.parentId = nodes[0].value;
          } else {
            this.projectModuleCreateRowData.parentId = 0;
          }
          const request = new ModuleCreateRequest();
          request.setParams(this.projectModuleCreateRowData);
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
      this.$refs["projectModuleCreateRef"].resetFields();
    },
    handleCheckAllChange(val) {
      this.projectModuleCreateRowData.defaultMethods = val ? allMethods : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      this.projectModuleCreateRowData.defaultMethods = this.projectModuleCreateRowData.defaultMethods;
    },
  },
};
</script>
