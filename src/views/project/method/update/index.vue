<template>
  <!--新增-->
  <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="75%">
    <el-form
      ref="methodCreateRef"
      :model="methodUpdateParams"
      :rules="methodCreateRules"
    >
      <el-row>
        <el-form-item label="模块id" :label-width="formLabelWidth" hidden>
          <el-input v-model="methodUpdateParams.moduleId" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="模块名称" :label-width="formLabelWidth">
            <el-input v-model="methodUpdateParams.moduleName" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="模块fullPath" :label-width="formLabelWidth">
            <el-input v-model="methodUpdateParams.moduleFullPath" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="方法范围" :label-width="formLabelWidth">
            <el-select
              v-model="methodUpdateParams.type"
              placeholder="选择方法类型"
            >
              <el-option label="对外接口" value="out" />
              <el-option label="内部方法" value="in" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="methodUpdateParams.type == 'out'">
        <el-row>
          <el-col :span="11">
            <el-form-item label="Method类型" :label-width="formLabelWidth">
              <el-select
                placeholder="选择Method类型"
                v-model="methodUpdateParams.methodType"
              >
                <el-option
                  v-for="item in dictValueMap.methodType"
                  :key="item.id"
                  :label="item.dicDesc"
                  :value="item.dicValue"
                  :disabled="item.disableFlag === 0"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="Content-Type类型"
              :label-width="formLabelWidth"
            >
              <el-select
                placeholder="选择Content-Type类型"
                v-model="methodUpdateParams.contentType"
                width="200px"
              >
                <el-option
                  v-for="item in dictValueMap.contentType"
                  :key="item.id"
                  :label="item.dicDesc"
                  :value="item.dicValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="方法名称(汉)" :label-width="formLabelWidth">
            <el-input
              v-model="methodUpdateParams.name"
              show-word-limit
              maxlength="20"
              placeholder="汉语方法名称"
              @input="nameChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="方法简介" :label-width="formLabelWidth">
            <el-input
              v-model="methodUpdateParams.description"
              type="textarea"
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="方法名称(英)" :label-width="formLabelWidth">
            <el-input
              v-model="methodUpdateParams.simpleName"
              show-word-limit
              maxlength="20"
              placeholder="建议使用驼峰命名"
              @input="simpleNameChange"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!--      <el-row>-->
      <!--        <el-col :span="11">-->
      <!--          <el-form-item label="入参实体名" :label-width="formLabelWidth">-->
      <!--            &lt;!&ndash;            <el-input v-model="methodUpdateParams.inputBeanName"/>&ndash;&gt;-->
      <!--            <el-input placeholder="请输入参实体名" v-model="methodUpdateParams.inputBeanName" class="input-with-select">-->
      <!--              &lt;!&ndash;              <el-select v-model="select" slot="append" placeholder="请选择入参后缀">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <el-option label="餐厅名" value="1"></el-option>&ndash;&gt;-->
      <!--              &lt;!&ndash;                <el-option label="订单号" value="2"></el-option>&ndash;&gt;-->
      <!--              &lt;!&ndash;                <el-option label="用户电话" value="3"></el-option>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </el-select>&ndash;&gt;-->
      <!--            </el-input>-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--        <el-col :span="11">-->
      <!--          <el-form-item label="出参实体名" :label-width="formLabelWidth">-->
      <!--            <el-input placeholder="请输出参实体名" v-model="methodUpdateParams.outputBeanName" class="input-with-select">-->
      <!--              &lt;!&ndash;              <el-select v-model="select" slot="append" placeholder="请选择出参后缀">&ndash;&gt;-->
      <!--              &lt;!&ndash;                <el-option label="餐厅名" value="1"></el-option>&ndash;&gt;-->
      <!--              &lt;!&ndash;                <el-option label="订单号" value="2"></el-option>&ndash;&gt;-->
      <!--              &lt;!&ndash;                <el-option label="用户电话" value="3"></el-option>&ndash;&gt;-->
      <!--              &lt;!&ndash;              </el-select>&ndash;&gt;-->
      <!--            </el-input>-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <el-row v-if="methodUpdateParams.type == 'out'">
        <el-row>
          <el-col :span="11">
            <el-form-item label="方法请求path" :label-width="formLabelWidth">
              <el-input v-model="methodUpdateParams.path" @input="pathChange" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="方法请求完整path"
              :label-width="formLabelWidth"
            >
              <el-input v-model="methodUpdateParams.fullPath" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="数据来源模式" :label-width="formLabelWidth">
            <el-select
              placeholder="选择数据来源模式"
              v-model="methodUpdateParams.mold"
            >
              <el-option
                v-for="item in dictValueMap.methodMold"
                :key="item.id"
                :label="item.dicDesc"
                :value="item.dicValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="方法分类" :label-width="formLabelWidth">
            <el-select
              placeholder="选择方法分类"
              v-model="methodUpdateParams.category"
            >
              <el-option
                v-for="item in dictValueMap.methodCategory"
                :key="item.id"
                :label="item.dicDesc"
                :value="item.dicValue"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="业务主表" :label-width="formLabelWidth">
            <el-select
              v-model="methodUpdateParams.tableName"
              placeholder="请选择业务主表"
              @change="changeTable"
            >
              <el-option
                v-for="item in projectTableList"
                :key="item.id"
                :label="item.tableName"
                :value="item.tableName"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="submitForm">
        提交
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
// 接口
import { MethodUpdateRequest } from "@/sdk/modules/method/update";

import { TableListRequest } from "@/sdk/modules/table/list";

//接口混入
import mixins from "@/mixins";

export default {
  name: "ProjectModuleMethodCreate",
  mixins: [mixins],
  props: ["rowData"],
  data() {
    return {
      projectId: undefined,
      methodUpdateParams: {
        id: undefined,
        projectId: undefined,
        moduleId: undefined,
        moduleName: undefined,
        moduleFullPath: undefined,
        name: undefined,
        simpleName: undefined,
        description: undefined,
        path: undefined,
        fullPath: undefined,
        inputBeanName: undefined,
        outputBeanName: undefined,
        methodType: undefined,
        contentType: undefined,
        type: undefined,
      },
      formLabelWidth: "150px",
      dialogFormVisible: false,
      methodCreateRules: {
        name: [
          { required: true, message: "请输入模块名(汉)", trigger: "blur" },
        ],
        simpleName: [
          { required: true, message: "请输入模块名(英)", trigger: "blur" },
        ],
        path: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      projectTableList: [],
    };
  }, // 接收父组件的传值
  watch: {
    dialogFormVisible(val) {
      if (val) {
        console.log(" this.rowData", this.rowData);
        this.methodUpdateParams = this.rowData;
        this.projectId = this.methodUpdateParams.projectId;
        this.$nextTick(() => {
          this.dict("methodType");
          this.dict("contentType");
          this.dict("methodMold");
          this.dict("methodCategory");
        });
        this.getProjectTableList();
      }
    },
  },
  methods: {
    submitForm() {
      this.$refs["methodCreateRef"].validate((valid) => {
        if (valid) {
          const request = new MethodUpdateRequest();
          request.setParams(this.methodUpdateParams);
          request.api().then((res) => {
            this.dialogFormVisible = false;
            this.$emit("loadData");
          });
        } else {
          return false;
        }
      });
    },
    simpleNameChange(val) {
      this.methodUpdateParams.path = val
        .replace(/([A-Z])/g, "/$1")
        .toLowerCase();
      this.methodUpdateParams.fullPath =
        this.methodUpdateParams.moduleFullPath +
        "/" +
        this.methodUpdateParams.path;
      const fullPathName =
        this.methodUpdateParams.fullPath.charAt(0).toUpperCase() +
        this.methodUpdateParams.fullPath.slice(1);
      this.methodUpdateParams.outputBeanName = this.toHump(fullPathName) + "Vo";
      this.methodUpdateParams.inputBeanName =
        this.toHump(fullPathName) + "Params";
    },
    pathChange(val) {
      // this.methodUpdateParams.fullPath = this.methodUpdateParams.moduleFullPath + '/' + val
    },
    nameChange(val) {
      this.methodUpdateParams.description = val;
    },
    toHump(name) {
      return name.replace(/\/(\w)/g, function(all, letter) {
        return letter.toUpperCase();
      });
    },
    getProjectTableList() {
      if (this.projectId) {
        this.projectTableList = [];
        const request = new TableListRequest();
        request.setParams({ projectId: this.projectId, userId: 1 });
        request.api().then((res) => {
          console.log(res.data.list);
          this.projectTableList = res.data.list;
        });
      }
    },
    changeTable(column) {
      this.methodUpdateParams.tableName = column;
      this.projectTableList.forEach((item) => {
        if (item.tableName == column) {
          this.methodUpdateParams.tableId = item.id;
        }
      });
    },
  },
};
</script>
