<template>
  <!--新增-->
  <div>
    <el-form ref="projectModuleCreateRef" :model="methodDetailModel">
      <el-row>
        <el-col :span="8">
          <el-form-item label="方法名称(汉)" :label-width="formLabelWidth">
            <el-input v-model="methodDetailModel.name" disabled/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="方法模式" :label-width="formLabelWidth">
            <el-select
              placeholder="选择方法模式"
              v-model="methodDetailModel.mold"
              disabled
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
        <el-col :span="8">
          <el-form-item label="方法分类" :label-width="formLabelWidth">
            <el-select
              placeholder="选择方法分类"
              v-model="methodDetailModel.category"
              disabled
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
        <el-col :span="8">
          <el-form-item label="业务主表" :label-width="formLabelWidth">
            <el-select
              v-model="methodDetailModel.tableName"
              placeholder="请选择业务主表"
              @change="changeTable"
              disabled
            >
              <el-option
                v-for="item in projectTableList"
                :key="item.id"
                :label="item.tableName"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item v-loading="!showEditSql" label="自定义sql" :label-width="formLabelWidth">
            <sql-famter
              v-if="showEditSql"
              ref="sqleditor"
              :value="methodDetailModel.sqlInfo"
              :tables="methodDetailModel.tables"
              @changeTextarea="changeTextarea($event)"
            />
            <el-button type="primary" size="small" @click="formaterSql"
            >格式化sql
            </el-button
            >
            <el-button type="success" size="small" @click="analysisSql"
            >解析sql
            </el-button
            >
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <param-dialog
      :dictValueMap="dictValueMap"
      :methodParams="methodParams"
      :rowData="rowData"
      ref="projectMethodBodyParamsRef"
    />

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="submitForm">
        提交
      </el-button>
    </div>


    <el-dialog
      width="60%"
      title="参数信息"
      :visible.sync="innerVisibleSql"
      destroy-on-close
      append-to-body
    >
      <div>
<!--      <el-tabs v-model="activeName">-->
<!--        <el-tab-pane label="入参信息" name="first">-->
<!--          <el-table-->
<!--            key="uiPermissionKey"-->
<!--            :data="sqlInputParamList"-->
<!--            border-->
<!--            fit-->
<!--            highlight-current-row-->
<!--            style="width: 100%;"-->
<!--          >-->
<!--            <el-table-column-->
<!--              label="ID"-->
<!--              prop="id"-->
<!--              fixed-->
<!--              align="center"-->
<!--              width="60px"-->
<!--            >-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.id }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--              label="权限名称"-->
<!--              prop="name"-->
<!--              fixed-->
<!--              align="center"-->
<!--            ></el-table-column>-->
<!--            <el-table-column-->
<!--              label="权限tag"-->
<!--              prop="tag"-->
<!--              align="center"-->
<!--            ></el-table-column>-->
<!--            <el-table-column-->
<!--              label="权限处理方式"-->
<!--              prop="path"-->
<!--              align="center"-->
<!--            ></el-table-column>-->
<!--            <el-table-column-->
<!--              label="操作"-->
<!--              class-name="small-padding fixed-width"-->
<!--              align="center"-->
<!--            >-->
<!--              <template slot-scope="scope">-->
<!--                <el-button-->
<!--                  type="danger"-->
<!--                  @click="handleDelete(scope.$index, scope.row)"-->
<!--                >-->
<!--                  删除-->
<!--                </el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-tab-pane>-->

<!--        <el-tab-pane label="出参信息" name="second">-->
<!--          <el-table-->
<!--            key="uiPermissionKey"-->
<!--            :data="sqlOutputParamList"-->
<!--            border-->
<!--            fit-->
<!--            highlight-current-row-->
<!--            style="width: 100%;"-->
<!--          >-->
<!--            <el-table-column-->
<!--              label="ID"-->
<!--              prop="id"-->
<!--              fixed-->
<!--              align="center"-->
<!--              width="60px"-->
<!--            >-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.id }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--              label="权限名称"-->
<!--              prop="name"-->
<!--              fixed-->
<!--              align="center"-->
<!--            ></el-table-column>-->
<!--            <el-table-column-->
<!--              label="权限tag"-->
<!--              prop="tag"-->
<!--              align="center"-->
<!--            ></el-table-column>-->
<!--            <el-table-column-->
<!--              label="权限处理方式"-->
<!--              prop="path"-->
<!--              align="center"-->
<!--            ></el-table-column>-->
<!--            <el-table-column-->
<!--              label="操作"-->
<!--              class-name="small-padding fixed-width"-->
<!--              align="center"-->
<!--            >-->
<!--              <template slot-scope="scope">-->
<!--                <el-button-->
<!--                  type="danger"-->
<!--                  @click="handleDelete(scope.$index, scope.row)"-->
<!--                >-->
<!--                  删除-->
<!--                </el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->


<!--        </el-tab-pane>-->

<!--        <el-tab-pane label="执行sql" name="third">-->
<!--          <sql-famter-->
<!--            ref="sqleditor1"-->
<!--            :tables="methodDetailModel.tables"-->
<!--            :value="analysisSqldata"-->
<!--          />-->
<!--        </el-tab-pane>-->

<!--      </el-tabs>-->

      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisibleSql = false">
          取 消
        </el-button>
<!--        <el-button type="primary" @click="submitForm1">-->
<!--          确认-->
<!--        </el-button>-->
      </div>
      </div>
    </el-dialog>

  </div>

</template>
<script>
  //组件
  import sqlFormatter from "sql-formatter";
  import SqlFamter from "@/views/project/module/SqlFamter";
  // 接口
  import {MethodPreParamRequest} from "@/sdk/modules/method/pre/param";
  import {MethodParamRequest} from "@/sdk/modules/method/param";
  import {DbTableInfoRequest} from "@/sdk/modules/db/table/info";
  import {TableListRequest} from "@/sdk/modules/table/list";
  import {TableColumnListRequest} from "@/sdk/modules/table/column/list";
  import {ParamsCreateRequest} from "@/sdk/modules/params/create";
  import {ParamsAddRequest} from "@/sdk/modules/params/add";
  import {ParamsUpdateRequest} from "@/sdk/modules/params/update";
  import {ParamsDeleteRequest} from "@/sdk/modules/params/delete";
  //解析sql
  import {SqlAnalysisRequest} from "@/sdk/modules/sql/analysis";


  import ParamDialog from "@/views/project/method/body/params";
  // 新增项目模块组件
  //接口混入
  import mixins from "@/mixins";

  export default {
    name: "ProjectModuleMethodCreate",
    mixins: [mixins],
    components: {
      SqlFamter, ParamDialog
    },
    props: ["rowData"],
    data() {
      return {
        activeName: "first",
        sqlInputParamList:[],
        sqlOutputParamList:[],
        tablesInfo: {
          projectId: undefined,
        },
        analysisSqldata: "",
        showAnalysisSql: true,
        showEditSql: false,
        selectedTableName: undefined,
        selectInnerVisible: false,
        methodId: undefined,
        tableColumnList: [],
        paramCategoryList: [],
        activeName: "first",
        subActiveName: "first",
        checkNameInfo: "",
        formLabelWidth: "120px",
        loading: false,
        dialogFormVisible: false,
        projectId: undefined,
        projectTableList: [],
        defaultOutputParams: {
          columnComment: "业务操作标识(默认参数)",
          columnName: "",
          columnType: "",
          dataType: "",
          paramName: "opFlag",
          paramSource: "defaultParam",
          paramType: "Boolean"
        },
        subInputPramsList: [],
        methodDetailModel: {
          id: undefined,
          tableId: undefined,
          tableName: undefined,
          category: undefined,
          sourceType: undefined,
          sqlInfo: "--输入实现该方法的自定义sql(按Ctrl键提示)\n",
          inputPramsList: [],
          outputPramsList: [],
          tables: {
          }
        },
        paramAddModel: {
          id: undefined,
          methodId: undefined,
          category: undefined,
          inputPramsList: [],
          outputPramsList: []
        },
        paramUpdateModel: {
          id: undefined,
          methodId: undefined,
          inputPramsList: [],
          tableId: undefined,
          tableName: undefined,
          columnName: undefined,
          genericsType: undefined,
          mold: undefined,
          outputPramsList: []
        },
        projectModuleCreateRowDataRules: {
          name: [
            {required: true, message: "请输入模块名(汉)", trigger: "blur"}
          ],
          simpleName: [
            {required: true, message: "请输入模块名(英)", trigger: "blur"}
          ],
          path: [{required: true, message: "请输入密码", trigger: "blur"}]
        },
        customObjectTable: [],
        multipleInputSelection: [],
        inputPramsList: [],
        outputPramsList: [],
        subParams: {},
        tableLoading: false,
        projectTableColumnList: [],
        innerDialogName: "",
        innerVisibleSql: false,
        paramsInfo: {
          tableId: undefined,
          category: undefined
        },
        methodParams: {
          methodId: undefined
        },
        paramsInfoModel: {
          methodId: undefined,
          paramCategory: undefined,
          paramSource: undefined,
          type: undefined,
          paramName: undefined,
          paramType: undefined,
          tableColumnId: undefined,
          tableId: undefined,
          dataType: undefined,
          projectModuleMethodId: undefined,
          columnComment: undefined,
          tableName: undefined,
          columnName: undefined,
          genericsType: undefined,
          mold: undefined,
          inputColumnList: []
        },
        parentId: undefined,
        sqlAnalysisParams: {
          sqlStr: undefined
        }
      };
    }, // 接收父组件的传值
    watch: {
      dialogFormVisible(val) {
        if (val) {
          this.methodDetailModel = Object.assign(
            this.methodDetailModel,
            this.rowData
          );
          this.showAnalysisSql = false
          this.$nextTick(() => {
            this.analysisSqldata = ''
            this.showAnalysisSql = true
          })
          this.methodId = this.rowData.id;
          this.selectedTableName = this.rowData.tableName;

          console.log("this methodDetailModel----", this.methodDetailModel);
          this.methodDetailModel.sourceType = "table";
          this.methodDetailModel.modulePath =
            this.$route.query.path || this.rowData.modulePath;
          this.methodDetailModel.moduleName =
            this.$route.query.name || this.rowData.moduleName;
          this.projectId =
            parseInt(this.$route.query.projectId) ||
            parseInt(this.rowData.projectId);

          this.getProjectTableList(this.projectId);
          //获得方法已选参数
          this.methodParams.methodId = this.rowData.id;
          this.loadMethodParams();

          this.$nextTick(() => {
            this.dict("methodCategory");
            this.dict("paramCondition");
            this.dict("sortCondition");
            this.dict("paramType");
            this.dict("paramSource");
            this.dict("methodMold");
            this.dict("genericsType");
          });

          //加载项目对应的数据库表信息
          this.loadTables()
        }
      },
      projectId(val) {
        this.projectId = val;
        this.getProjectTableList(this.projectId);
      }
    },
    methods: {
      submitForm() {
        console.log("inputPramsList--------", this.inputPramsList);
        this.methodDetailModel.inputPramsList = this.inputPramsList;
        const request = new ParamsUpdateRequest();
        request.setParams(this.methodDetailModel);
        request.api().then(res => {
          this.dialogFormVisible = false;
          // this.$emit('loadData')
          this.loadMethodParams();
        });

        // this.$refs['projectModuleCreateRef'].validate((valid) => {
        //   if (valid) {
        //     this.methodDetailModel.inputPramsList = this.inputPramsList
        //     this.methodDetailModel.outputPramsList = this.outputPramsList
        //     const request = new MethodCreateRequest()
        //     request.setParams(this.methodDetailModel)
        //     request.api().then(res => {
        //       this.dialogFormVisible = false
        //       this.$emit('loadData')
        //     })
        //   } else {
        //     return false
        //   }
        // })
      },

      loadMethodParams() {
        const request = new MethodParamRequest();
        request.setParams(this.methodParams);
        request.api().then(res => {
          this.$nextTick(() => {
            this.inputPramsList = res.data.inputPramsList;
            this.outputPramsList = res.data.outputPramsList;
          });
        });
      },
      paramSourceChange(val) {
        // alert(val)

        console.log(
          "-----------this.paramsInfoModel-------",
          this.paramsInfoModel
        );
        // this.paramsInfoModel.tableColumnId = undefined
        // this.paramsInfoModel.tableId = undefined
      },
      addInputParams(type) {
        console.log("--this.paramsInfoModel", this.paramsInfoModel);
        console.log("---this.methodDetailModel", this.methodDetailModel);

        this.innerVisible = true;
        this.innerDialogName = type == "input" ? "添加入参" : "添加出参";
        this.paramsInfoModel.type = type;
        this.paramsInfoModel.paramSource = "tableColumn";
        this.paramsInfoModel.tableId = this.methodDetailModel.tableId;
        this.paramsInfoModel.tableName = this.methodDetailModel.tableName;

        this.projectTableList.forEach(table => {
          if (table.tableName == this.paramsInfoModel.tableName) {
            table.disabled = false;
          } else {
            table.disabled = true;
          }
        });
        this.changeTable2(this.paramsInfoModel.tableId);
      },

      checkParamName(val) {
        // this.checkNameInfo = ''
        // if (this.paramsInfoModel.id) {
        //   this.checkParamNameParams.id = this.paramsInfoModel.id
        // }
        // this.checkParamNameParams.type = this.paramsInfoModel.type
        // this.checkParamNameParams.paramName = val
        // this.checkParamNameParams.methodId = this.methodId
        // const request = new ParamsCheckNameRequest()
        // request.setParams(this.checkParamNameParams)
        // request.api().then(res => {
        //   if (res.data.flag) {
        //     this.checkNameInfo = '参数：' + val + ' 已存在'
        //     this.checkNameFlag = true
        //   } else {
        //     this.checkNameFlag = false
        //   }
        // })
      },
      loadTableColumn(value) {
        this.projectTableColumnList = [];
        this.paramsInfoModel.tableId = value.id;
        this.paramsInfoModel.tableName = value.tableName;
        this.paramsInfoModel.columnName = undefined;
        this.paramsInfoModel.paramName = undefined;
        this.paramsInfoModel.columnComment = undefined;
        this.paramsInfoModel.tableColumnId = undefined;
        this.paramsInfoModel.dataType = undefined;
        if (value.id) {
          const request = new TableColumnListRequest();
          request.setParams(this.paramsInfoModel);
          request.api().then(res => {
            this.projectTableColumnList = res.data;
          });
        }
      },
      loadTables() {
        this.tablesInfo.projectId = this.projectId
        const request = new DbTableInfoRequest();
        request.setParams(this.tablesInfo);
        request.api().then(res => {
          let tables = {}
          res.data.forEach(item => {
            tables[item.tableName] = item.columnName
          })
          this.$nextTick(() => {
            this.methodDetailModel.tables = tables
            this.showEditSql = true
          })
        });
      },
      handleSelectionChange(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.inputPramsListRef.toggleRowSelection(row);
          });
        } else {
          this.$refs.inputPramsListRef.clearSelection();
        }
      },
      selectCategory() {
        this.paramsInfo.category = this.methodDetailModel.category;
        this.paramsInfo.tableId = this.methodDetailModel.tableId;
        const request = new MethodPreParamRequest();
        request.setParams(this.paramsInfo);
        request.api().then(res => {
          let hasInputPramsList = this.inputPramsList;
          this.inputPramsList = hasInputPramsList.concat(res.data.inputPramsList);
          this.outputPramsList = [this.defaultOutputParams].concat(
            res.data.outputPramsList
          );
        });
      },

      changeTable(column) {
        console.log("column-----", column);
        this.methodDetailModel.tableId = column.id;
        this.methodDetailModel.tableName = column.tableName;
        this.paramsInfo.category = this.methodDetailModel.category;
        this.paramsInfo.tableId = this.methodDetailModel.tableId;
        // const request = new MethodPreParamRequest()
        // request.setParams(this.paramsInfo)
        // request.api().then(res => {
        //   // let hasInputPramsList = this.inputPramsList
        //   // this.inputPramsList = hasInputPramsList.concat(res.data.inputPramsList)
        //   this.inputPramsList = res.data.inputPramsList
        //   this.outputPramsList = [this.defaultOutputParams].concat(res.data.outputPramsList);
        // })
        // this.loadTableColumn(column)
      },

      changeTable2(tableId) {
        //获取当前表的全部字段
        const request = new this.sdk.DbTableColumnListRequest();
        request.setParams({tableId: tableId});
        request.api().then(res => {
          this.tableColumnList = res.data;
        });
      },
      paramNameEdit(row, column, cell, event) {
        row.edit = true;
      },
      paramNameEditCancle(row, column, cell, event) {
        row.edit = false;
      },

      changeTableColumn(column) {
        this.paramsInfoModel.paramName = column.paramName;
        this.paramsInfoModel.columnComment = column.columnComment;
        this.paramsInfoModel.columnName = column.columnName;
      },
      /**
       * 列选择
       */
      selectTableColumn(column) {
        this.paramsInfoModel.paramName = column.paramName;
        this.paramsInfoModel.columnComment = column.columnComment;
        this.paramsInfoModel.dataType = column.dataType;
        this.paramsInfoModel.columnName = column.columnName;
        this.paramsInfoModel.tableColumnId = column.id;
        this.paramsInfoModel.tableName = column.tableName;
      },
      saveParams() {
        this.paramsInfoModel.projectId = this.projectId;
        this.paramsInfoModel.moduleId = this.moduleId;
        this.paramsInfoModel.projectModuleMethodId = this.methodId;
        if (!this.checkNameFlag) {
          if (this.paramsInfoModel.id) {
            // 修改
            const request = new ParamsUpdateRequest();
            request.setParams(this.paramsInfoModel);
            request.api().then(res => {
              this.innerVisible = false;
              this.loadParams(this.methodDetailModel, this.methodId);
              this.$message({
                type: "success",
                message: "修改成功!"
              });
            });
          } else {
            // 新增
            const request = new ParamsCreateRequest();
            request.setParams(this.paramsInfoModel);
            request.api().then(res => {
              this.innerVisible = false;
              this.loadParams(this.methodDetailModel, this.methodId);
              this.$message({
                type: "success",
                message: "添加成功!"
              });
            });
          }
        } else {
          this.$message("参数已存在");
        }
      },
      resetForm() {
        this.$refs["projectModuleCreateRef"].resetFields();
      },
      changeTextarea(val) {
        this.$set(this.methodDetailModel, "sqlInfo", val);
      },
      formaterSql() {
        const dom = this.$refs.sqleditor;
        dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()));
        console.log(
          dom.editor.getValue().replace(this.methodDetailModel.sqlInfo)
        );
      },

      analysisSql() {
        // const dom = this.$refs.sqleditor
        this.showAnalysisSql = false;
        this.sqlAnalysisParams.sqlStr = this.methodDetailModel.sqlInfo;
        const request = new SqlAnalysisRequest();
        request.setParams(this.sqlAnalysisParams);
        request.api().then(res => {
          this.showAnalysisSql = true;
          console.log("analysisSql-res", res);
          this.analysisSqldata = res.data.resultSql;
          this.innerVisibleSql = true;

        });
      },
      getProjectTableList(projectId) {
        if (projectId) {
          this.projectTableList = [];
          const request = new TableListRequest();
          request.setParams({projectId: projectId});
          request.api().then(res => {
            this.projectTableList = res.data.list;
            this.projectTableList.forEach(table => {
              if (table.tableName == this.selectedTableName) {
                table.disabled = false;
              } else {
                table.disabled = true;
              }
            });
          });
        }
      },
      deleteParams(index, row) {
        this.$confirm("确定删除方法参数, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.inputPramsList.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            const request = new ParamsDeleteRequest();
            request.setParams({id: row.id});
            request.api().then(res => {
              this.loadMethodParams();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      deleteOutputParams() {
        this.$refs.outputPramsListRef.selection.forEach(item => {
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
      getParent(data2, nodeId2, isChecked) {
        var arrRes = [];
        if (data2.length == 0) {
          if (!!nodeId2) {
            arrRes.push(data2);
          }
          return arrRes;
        }
        let rev = (data, nodeId) => {
          for (var i = 0, length = data.length; i < length; i++) {
            let node = data[i];
            if (node.id == nodeId) {
              arrRes.push(node);
              rev(data2, node.parentId);
              break;
            } else {
              if (!!node.children) {
                rev(node.children, nodeId);
              }
            }
          }
          return arrRes;
        };
        arrRes = rev(data2, nodeId2);
        arrRes.forEach((item, i) => {
          if (!item.children) {
            item.checked = isChecked;
          } else {
            var num = 0;
            item.children.forEach((item, i) => {
              if (item.checked == true) {
                num += 1;
              }
            });
            if (num == item.children.length) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          }
        });
      },
      addCustomInputParams() {
        this.subInputPramsList.push(this.paramsInfoModel);
        console.log("subInputPramsList", this.subInputPramsList);
      },
      addObjectInputParams() {
        this.subInputPramsList.push(this.paramsInfoModel);
      },
      changeCondition() {
      },
      saveSubParams() {
        console.log("paramsInfoModel", this.paramsInfoModel);
        // this.innerVisible = false
        // let timestamp = new Date().getTime();
        // this.paramsInfoModel.id = timestamp
        // this.paramsInfoModel.children = []
        // this.paramsInfoModel.checked = true
        // let rowData = Object.assign({}, this.paramsInfoModel)
        // if (this.parentId) {
        //   this.findParent(this.inputPramsList, this.parentId, rowData)
        //   this.parentId = undefined
        // } else {
        //   this.inputPramsList.push(rowData)
        // }
        //保存到数据库
        this.paramsInfoModel.methodId = this.methodId;
        const request = new ParamsAddRequest();
        request.setParams(this.paramsInfoModel);
        request.api().then(res => {
          this.innerVisible = false;
          this.loadMethodParams();
        });
      },
      addSubParams(index, row, type) {
        console.log("addSubParams", row);
        this.innerVisible = true;
        this.paramsInfoModel.parentId = row.id;
        this.paramsInfoModel.paramSource = "custom";
        this.paramsInfoModel.paramType = "String";
      },
      findParent(array, id, rowData) {
        if (array == null) return null;
        for (let obj of array) {
          if (obj.id == id) {
            obj.children.push(rowData);
          }
          this.findParent(obj.children, id, rowData);
        }
      },
      setInputParams() {
        this.selectInnerVisible = true;
        this.paramsInfoModel.tableName = this.methodDetailModel.tableName;

        this.projectTableList.forEach(table => {
          if (table.tableName == this.paramsInfoModel.tableName) {
            table.disabled = false;
          } else {
            table.disabled = true;
          }
        });

        //获取当前表的全部字段
        this.tableColumnList = [];
        const request = new this.sdk.DbTableColumnListRequest();
        request.setParams({tableId: this.methodDetailModel.tableId});
        request.api().then(res => {
          this.tableColumnList = res.data;
          this.paramsInfoModel.inputColumnList = res.data;
        });
      }
    }
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
