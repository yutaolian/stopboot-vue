<template>
  <div>
    <el-tabs v-model="subActiveName">
      <el-tab-pane label="入参信息" name="first">
        <el-button
          type="success"
          style="margin-bottom: 20px"
          @click="addParams('input')"
          >添加入参</el-button
        >
        <el-table
          ref="inputPramsListRef"
          v-loading="paramsTableLoading"
          :data="inputPramsList"
          row-key="id"
          border
           style="width: 100%"
          default-expand-all
          @selection-change="handleSelectionChange"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column label="参数名" fixed>
            <template slot-scope="scope">
              {{ scope.row.paramName }}
            </template>
          </el-table-column>
          <el-table-column label="参数类型(泛型)" align="center" fixed>
            <template slot-scope="scope">
              {{ scope.row.paramType }}({{ scope.row.genericsType }})
            </template>
          </el-table-column>
          <el-table-column
            property="columnComment"
            label="注释"
            width="200px"
            align="center"
            fixed
          />
          <el-table-column label="字段名" align="center" >
            <template slot-scope="scope">
              {{ scope.row.columnName }}
            </template>
          </el-table-column>
          <el-table-column label="字段类型" align="center" >
            <template slot-scope="scope">
              {{ scope.row.columnType }}
            </template>
          </el-table-column>
          <el-table-column label="作用字段" width="150px" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.targetColumn"
                placeholder="选择数据库对应字段"
              >
                <el-option
                  v-for="item in projectTableColumnList"
                  :key="item.id"
                  :label="item.columnName"
                  :value="item.columnName"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column min-width="90px" label="作用条件" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.paramCondition"
                placeholder="例如=,>"
              >
                <el-option
                  v-for="item in dictValueMap.paramCondition"
                  :key="item.id"
                  :label="item.dicDesc"
                  :value="item.dicValue"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column min-width="90px" label="排序条件" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.sortCondition"
                placeholder="例如不使用，升序，降序"
              >
                <el-option
                  v-for="item in dictValueMap.sortCondition"
                  :key="item.id"
                  :label="item.dicDesc"
                  :value="item.dicValue"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <template
                v-if="
                  scope.row.paramType === 'Object' ||
                    scope.row.genericsType === 'Object'
                "
              >
                <el-button
                  type="text"
                  icon="el-icon-plus"
                  @click="addSubParams(scope.$index, scope.row, 'input')"
                  >添加子参数
                </el-button>
              </template>
              <el-button
                type="text"
                icon="el-icon-delete"
                @click="deleteParams(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="出参信息" name="second">
        <el-button
          type="success"
          style="margin-bottom: 20px"
          @click="addParams('output')"
          >添加出参</el-button
        >
        <el-table
          ref="inputPramsListRef"
          v-loading="tableLoading"
          :data="outputPramsList"
          row-key="id"
          border
          default-expand-all
          @selection-change="handleSelectionChange"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column label="参数名" fixed>
            <template slot-scope="scope">
              {{ scope.row.paramName }}
            </template>
          </el-table-column>
          <el-table-column label="参数类型(泛型)" align="center" fixed>
            <template slot-scope="scope">
              {{ scope.row.paramType }}({{ scope.row.genericsType }})
            </template>
          </el-table-column>
          <el-table-column
            property="columnComment"
            label="注释"
            width="200px"
            align="center"
            fixed
          />
          <el-table-column label="字段名" align="center" fixed>
            <template slot-scope="scope">
              {{ scope.row.columnName }}
            </template>
          </el-table-column>
          <el-table-column label="字段类型" align="center" fixed>
            <template slot-scope="scope">
              {{ scope.row.columnType }}
            </template>
          </el-table-column>
          <el-table-column label="作用字段" width="150px" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.targetColumn"
                placeholder="选择数据库对应字段"
              >
                <el-option
                  v-for="item in projectTableColumnList"
                  :key="item.id"
                  :label="item.columnName"
                  :value="item.columnName"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column min-width="90px" label="作用条件" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.paramCondition"
                placeholder="例如=,>"
              >
                <el-option
                  v-for="item in dictValueMap.paramCondition"
                  :key="item.id"
                  :label="item.dicDesc"
                  :value="item.dicValue"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column min-width="90px" label="排序条件" align="center">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.sortCondition"
                placeholder="例如不使用，升序，降序"
              >
                <el-option
                  v-for="item in dictValueMap.sortCondition"
                  :key="item.id"
                  :label="item.dicDesc"
                  :value="item.dicValue"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <template
                v-if="
                  scope.row.paramType === 'Object' ||
                    scope.row.genericsType === 'Object'
                "
              >
                <el-button
                  type="text"
                  icon="el-icon-plus"
                  @click="addSubParams(scope.$index, scope.row, 'output')"
                  >添加子参数
                </el-button>
              </template>
              <el-button
                type="text"
                icon="el-icon-delete"
                @click="deleteParams(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      width="60%"
      :title="innerDialogName"
      :visible.sync="innerVisible"
      destroy-on-close
      append-to-body
    >
      <el-form :model="paramsAddModel" ref="paramsAddModelRef">
        <el-row>
          <el-col :span="8">
            <el-form-item label="参数来源" :label-width="formLabelWidth">
              <el-select
                v-model="paramsAddModel.paramSource"
                placeholder="选择参数来源"
                width="300px"
              >
                <el-option
                  v-for="item in dictValueMap.paramSource"
                  :key="item.id"
                  :label="item.dicDesc"
                  :value="item.dicValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="paramsAddModel.paramSource == 'custom'">
          <el-row>
            <el-col :span="8">
              <el-form-item label="参数类型" :label-width="formLabelWidth">
                <el-cascader
                  :props="{
                    multiple: false,
                    label: 'dicDesc',
                    value: 'dicValue',
                    emitPath: false
                  }"
                  v-model="paramsAddModel.paramType"
                  :options="dictValueMap.paramType"
                  :show-all-levels="false"
                  width="300px"
                ></el-cascader>
              </el-form-item>
            </el-col>

            <el-col :span="6" v-if="paramsAddModel.paramType == 'List'">
              <el-form-item label="泛型" :label-width="formLabelWidth">
                <el-cascader
                  :props="{
                    multiple: false,
                    label: 'dicDesc',
                    value: 'dicValue',
                    emitPath: false
                  }"
                  v-model="paramsAddModel.genericsType"
                  :options="dictValueMap.genericsType"
                  :show-all-levels="false"
                  width="300px"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>

        <el-row v-if="paramsAddModel.paramSource == 'tableColumn'">
          <el-row>
            <el-col :span="8">
              <el-form-item label="选择表" :label-width="formLabelWidth">
                <el-select
                  v-model="paramsAddModel.tableName"
                  placeholder="选择表"
                  @change="changeTable"
                >
                  <el-option
                    v-for="item in projectTableList"
                    :key="item.id"
                    :label="item.tableName"
                    :value="item.id"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label-width="formLabelWidth">
                <el-checkbox v-model="paramsAddModel.allColumn"
                  >全部字段</el-checkbox
                >
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="!paramsAddModel.allColumn">
            <el-col :span="8">
              <el-form-item label="选择字段" :label-width="formLabelWidth">
                <el-select
                  v-model="paramsAddModel.columnName"
                  placeholder="选择字段"
                  @change="changeTableColumn"
                >
                  <el-option
                    v-for="item in tableColumnList"
                    :key="item.id"
                    :label="item.columnName"
                    :value="item"
                  >
                    <span v-if="item.columnKey == 'PRI'"
                      >{{ item.columnName }}(主键)</span
                    >
                    <span v-else>{{ item.columnName }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="字段类型" :label-width="formLabelWidth">
                <el-input
                  v-model="paramsAddModel.dataType"
                  @change="checkParamName"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="注释" :label-width="formLabelWidth">
                <el-input
                  v-model="paramsAddModel.columnComment"
                  placeholder="请输入注释"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row v-if="paramsAddModel.paramSource == 'custom'">
          <el-col :span="8">
            <el-form-item label="参数名称" :label-width="formLabelWidth">
              <el-input
                v-model="paramsAddModel.paramName"
                @change="checkParamName"
                placeholder="请输入参数名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注释" :label-width="formLabelWidth">
              <el-input
                v-model="paramsAddModel.columnComment"
                placeholder="请输入注释"
              />
            </el-form-item>
          </el-col>
        </el-row>
        TODO:校验同一层级的字段不能重复
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveParams">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 接口
import { MethodParamRequest } from "@/sdk/modules/method/param";
import { TableListRequest } from "@/sdk/modules/table/list";
import { TableColumnListRequest } from "@/sdk/modules/table/column/list";
import { ParamsAddRequest } from "@/sdk/modules/params/add";
import { ParamsDeleteRequest } from "@/sdk/modules/params/delete";
export default {
  props: {
    dictValueMap: {
      type: Object,
      default: {}
    },
    methodParams: {
      type: Object,
      default: {}
    },
    rowData:{}

  },
  data() {
    return {
      projectTableColumnList:[],
      projectTableList:[],
      formLabelWidth: "120px",
      paramsTableLoading: false,
      subActiveName: "first",
      inputPramsList: [],
      tableLoading: false,
      outputPramsList: [],
      tableColumnList: [],
      innerDialogName: "",
      innerVisible: false,
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
        genericsType: undefined
      },
    };
  },

  methods: {
    handleSelectionChange(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.inputPramsListRef.toggleRowSelection(row);
        });
      } else {
        this.$refs.inputPramsListRef.clearSelection();
      }
    },
    saveParams() {
      console.log("paramsAddModel", this.paramsAddModel);
      //保存参数到数据库
      const request = new ParamsAddRequest();
      this.paramsAddModel.methodId = this.rowData.id
      request.setParams(this.paramsAddModel);
      request.api().then(res => {
        this.innerVisible = false;
        this.loadMethodParams();
        this.$refs.paramsAddModelRef.resetFields();
      });
    },
    /**
     * 获得项目数据库表集合
     * @param projectId
     * */
    getProjectTableList(projectId) {
      if (projectId) {
        this.projectTableList = [];
        const request = new TableListRequest();
        request.setParams({ projectId: projectId});
        request.api().then(res => {
          this.projectTableList = res.data.list;
          this.projectTableList.forEach(table => {
            if (table.tableName == this.rowData.tableName) {
              table.disabled = false;
            } else {
              table.disabled = true;
            }
          });
        });
      }
    },
    // 获取table数据
    loadMethodParams() {
      this.paramsTableLoading = true;
      const request = new MethodParamRequest();
      request.setParams(this.methodParams);
      request.api().then(res => {
        this.paramsTableLoading = false;
        this.$nextTick(() => {
          this.inputPramsList = res.data.inputPramsList;
          this.outputPramsList = res.data.outputPramsList;
        });
      });
    },
    loadTableColumn(tableId) {
      this.projectTableColumnList = [];
      this.paramsAddModel.tableId = tableId;
      const request = new TableColumnListRequest();
      request.setParams(this.paramsAddModel);
      request.api().then(res => {
        this.projectTableColumnList = res.data.list;
      });
    },
    deleteParams(index, row) {
      this.$confirm("确定删除方法参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ids = [];
          ids.push(row.id);
          if (row.children && row.children.length > 0) {
            this.getRowIds(ids, row.children);
          }
          if (ids.length > 0) {
            const request = new ParamsDeleteRequest();
            request.setParams({ ids: ids });
            request.api().then(res => {
              this.loadMethodParams();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
          } else {
            this.$message({
              type: "error",
              message: "选择数据不能为空"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addSubParams(index, row, type) {
      // this.paramsTableLoading = true
      this.innerVisible = true;
      // this.paramsAddModel = {}
      this.paramsAddModel.type = type;
      this.paramsAddModel.parentId = row.id;
      this.paramsAddModel.paramSource = "custom";
      this.paramsAddModel.paramType = "String";
      this.paramsAddModel.genericsType = undefined;
    },
    addParams(type) {
      console.log("--this.paramsAddModel", this.paramsAddModel);
      console.log("---this.rowData", this.rowData);
      this.innerVisible = true;
      this.innerDialogName = type == "input" ? "添加入参" : "添加出参";
      // this.paramsAddModel = {}
      this.paramsAddModel.parentId = 0;
      this.paramsAddModel.type = type;
      this.paramsAddModel.paramSource = "tableColumn";
      this.paramsAddModel.tableId = this.rowData.tableId;
      this.paramsAddModel.tableName = this.rowData.tableName;
      this.projectTableList.forEach(table => {
        if (table.tableName == this.paramsAddModel.tableName) {
          table.disabled = false;
        } else {
          table.disabled = true;
        }
      });
      this.changeTable(this.paramsAddModel.tableId);
    },
    checkParamName(val) {},
    /**
     * 选择数据库列修改展示数据
     *
     * */
    changeTableColumn(column) {
      this.paramsAddModel.dataType = column.dataType;
      this.paramsAddModel.columnComment = column.columnComment;
      this.paramsAddModel.columnName = column.columnName;
      this.paramsAddModel.columnType = column.columnType;
      this.paramsAddModel.paramLength = column.length;
    },

    changeTable(tableId) {
      //获取当前表的全部字段
      const request = new this.sdk.DbTableColumnListRequest();
      request.setParams({ tableId: tableId });
      request.api().then(res => {
        this.tableColumnList = res.data.list;
      });
    }
  }
};
</script>

<style></style>
