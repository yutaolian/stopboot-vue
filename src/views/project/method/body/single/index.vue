<template>
  <!--新增-->
  <div>
    <param-dialog
      :dictValueMap="dictValueMap"
      :methodParams="methodParams"
      :rowData="rowData"
      ref="projectMethodBodyParamsRef"
    />
  </div>
</template>
<script>
// 接口
import { MethodParamRequest } from "@/sdk/modules/method/param";
import { TableListRequest } from "@/sdk/modules/table/list";
import { TableColumnListRequest } from "@/sdk/modules/table/column/list";
import { ParamsUpdateRequest } from "@/sdk/modules/params/update";

// 新增项目模块组件
//接口混入
import mixins from "@/mixins";
import ParamDialog from "@/views/project/method/body/params";
export default {
  name: "MethodBodySingle",
  mixins: [mixins],
  props: ["rowData"],
  components: {
    ParamDialog,
  },
  data() {
    return {
      paramsTableLoading: false,
      selectedTableName: undefined,
      selectInnerVisible: false,
      methodId: undefined,
      tableColumnList: [],
      paramCategoryList: [],
      subActiveName: "first",
      checkNameInfo: "",
      formLabelWidth: "120px",
      loading: false,
      dialogFormVisible: false,
      projectId: undefined,
      projectTableList: [],
      subInputPramsList: [],
      methodDetailModel: {
        id: undefined,
        tableId: undefined,
        tableName: undefined,
        category: undefined,
        sourceType: undefined,
        inputPramsList: [],
        outputPramsList: [],
      },
      inputPramsList: [],
      outputPramsList: [],
      tableLoading: false,
      projectTableColumnList: [],
      innerDialogName: "",
      innerVisible: false,
      methodParams: {
        methodId: undefined,
      },
      paramsUpdateModel: {
        methodId: undefined,
        inputPramsList: [],
        outputPramsList: [],
      },
      paramsAddModel: {
        allColumn: false,
        projectId: undefined,
        methodId: undefined,
        type: undefined,
        paramName: undefined,
        paramType: undefined,
        paramSource: undefined,
        tableId: undefined,
        columnComment: undefined,
        columnName: undefined,
        columnType: undefined,
        dataType: undefined,
        paramLength: undefined,
        genericsType: undefined,
      },
      parentId: undefined,
    };
  }, // 接收父组件的传值
  watch: {
    dialogFormVisible(val) {
      if (val) {
        this.methodDetailModel = this.rowData;
        this.methodId = this.rowData.id;
        this.projectId = this.rowData.projectId;
        this.selectedTableName = this.rowData.tableName;
        this.methodDetailModel.sourceType = "table";
        this.methodDetailModel.modulePath =
          this.$route.query.path || this.rowData.modulePath;
        this.methodDetailModel.moduleName =
          this.$route.query.name || this.rowData.moduleName;

        this.paramsAddModel.methodId = this.methodId;
        this.paramsAddModel.projectId = this.projectId;
        // this.getProjectTableList(this.projectId);
        //获得方法已选参数

        this.$nextTick(() => {
          this.methodParams.methodId = this.rowData.id;
          this.$refs.projectMethodBodyParamsRef.getProjectTableList(
            this.projectId,
            this.rowData.tableName
          );
          this.$refs.projectMethodBodyParamsRef.loadMethodParams(
            this.methodParams
          );
          this.$refs.projectMethodBodyParamsRef.loadTableColumn(
            this.methodDetailModel.tableId
          );
          this.dict("methodCategory");
          this.dict("paramCondition");
          this.dict("sortCondition");
          this.dict("paramType");
          this.dict("paramSource");
          this.dict("methodMold");
          this.dict("genericsType");
        });
      }
    },
    projectId(val) {
      this.projectId = val;
      this.$nextTick(() => {
        this.$refs.projectMethodBodyParamsRef.getProjectTableList(
          this.projectId,
          this.rowData.tableName
        );
      });
    },
  },
  methods: {
    submitForm() {
      this.paramsTableLoading = true;
      this.paramsUpdateModel.methodId = this.methodId;
      this.paramsUpdateModel.inputPramsList = [];
      this.treeToList(
        this.paramsUpdateModel.inputPramsList,
        this.$refs.projectMethodBodyParamsRef.inputPramsList
      );
      this.paramsUpdateModel.outputPramsList = [];
      this.treeToList(
        this.paramsUpdateModel.outputPramsList,
        this.$refs.projectMethodBodyParamsRef.outputPramsList
      );
      const request = new ParamsUpdateRequest();
      request.setParams(this.paramsUpdateModel);
      request.api().then((res) => {
        this.dialogFormVisible = false;
        this.paramsTableLoading = false;
      });
    },
    treeToList(list, tree) {
      if (tree && tree.length > 0) {
        for (let i = 0; i < tree.length; i++) {
          list.push(tree[i]);
          if (tree[i].children) {
            this.treeToList(list, tree[i].children);
          }
        }
      }
    },

    changeTable(tableId) {
      //获取当前表的全部字段
      const request = new this.sdk.DbTableColumnListRequest();
      request.setParams({ tableId: tableId });
      request.api().then((res) => {
        this.tableColumnList = res.data.list;
      });
    },

    /**
     * 获得项目数据库表集合
     * @param projectId
     * */
    getRowIds(ids, subChildren) {
      if (subChildren && subChildren.length > 0) {
        for (let i = 0; i < subChildren.length; i++) {
          let p = subChildren[i];
          if (p) {
            ids.push(p.id);
          }
          this.getRowIds(ids, p.children);
        }
      }
    },

    deleteOutputParams() {
      this.$refs.outputPramsListRef.selection.forEach((item) => {
        for (let i = 0; i < this.inputPramsList.length; i++) {
          if (this.outputPramsList[i].columnName === item.columnName) {
            this.outputPramsList.splice(i, 1);
            break;
          }
        }
      });
    },
    checkChange(scope) {
      if (scope.row.children) {
        // this.handleCheckAll(scope.row,scope.row.checked)
      }
      // this.getParent(this.inputPramsList.children,scope.row.id, scope.row.checked)
    },
    handleCheckAll(row, checked) {
      row.checked = checked;
      if (row.children) {
        let that = this;
        row.children.forEach((element, i) => {
          that.handleCheckAll(row.children[i], checked);
        });
      }
    },
    addCustomInputParams() {
      this.subInputPramsList.push(this.paramsAddModel);
      console.log("subInputPramsList", this.subInputPramsList);
    },
    addObjectInputParams() {
      this.subInputPramsList.push(this.paramsAddModel);
    },
    changeCondition() {},

    //切换数据来源 待优化
    changeParamSource(value) {},
  },
};
</script>

<style lang="scss" scoped>
.inputbox {
  width: 100%;
  height: 260px;
  /*background: #8d9caa;*/
  display: flex;
  padding: 30px;
  box-sizing: border-box;
  flex-direction: column;

  .top {
    display: flex;
    flex-wrap: wrap;
  }

  .center {
    flex: 1;
    overflow-y: auto;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;

    ul {
      padding: 0;
      margin: 0;
    }

    li {
      list-style: none;
      margin: 10px;
    }
  }

  .bottom {
    // height: 60px;
    display: flex;
    padding-left: 60px;
  }

  .text {
    /*border-bottom: 1px solid #fff;*/
    margin: 0 10px;
    /*color: #fff;*/
    font-size: 16px;
    text-align: center;
    min-width: 100px;
  }

  span {
    font-size: 24px;
    /*color: #fff;*/
    margin: 0 10px;
  }
}
</style>
