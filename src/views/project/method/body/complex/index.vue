<template>
  <!--新增-->
  <div>
    <!-- <el-form ref="projectModuleCreateRef" :model="methodDetailModel">
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
    </el-form> -->
    <!-- <el-divider>方法逻辑</el-divider> -->
    <el-button type="primary" @click="addSubMethod">
      添加子方法
    </el-button>

    <el-divider>方法参数</el-divider>
    <param-dialog
      :dictValueMap="dictValueMap"
      :methodParams="methodParams"
      :rowData="rowData"
      ref="projectMethodBodyParamsRef"
    />


    <sub-method
      ref="SubMethodRef">
    </sub-method>

    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="submitForm">
        提交
      </el-button>
    </div> -->

  </div>



</template>
<script>

  import SqlFamter from '@/views/project/module/SqlFamter'
  import ParamDialog from "@/views/project/method/body/params";
  import SubMethod from "@/views/project/method/sub"
  // 接口
  import {MethodPreParamRequest} from '@/sdk/modules/method/pre/param'
  import {MethodParamRequest} from '@/sdk/modules/method/param'

  import {TableListRequest} from '@/sdk/modules/table/list'
  import {TableColumnListRequest} from '@/sdk/modules/table/column/list'
  import {ParamsCreateRequest} from '@/sdk/modules/params/create'
  import {ParamsAddRequest} from '@/sdk/modules/params/add'
  import {ParamsUpdateRequest} from '@/sdk/modules/params/update'
  import {ParamsDeleteRequest} from '@/sdk/modules/params/delete'
  //接口混入
  import mixins from '@/mixins'

  export default {
    name: 'ProjectModuleMethodCreate',
    mixins: [mixins],
    components: {
      SqlFamter,ParamDialog,SubMethod
    },
    props: ['rowData'],
    data() {
      return {
        selectedTableName: undefined,
        selectInnerVisible: false,
        methodId: undefined,
        tableColumnList: [],
        paramCategoryList: [],
        activeName: 'first',
        subActiveName: 'first',
        checkNameInfo: '',
        formLabelWidth: '120px',
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
          paramType: "Boolean",
        },
        subInputPramsList: [],
        methodDetailModel: {
          id: undefined,
          tableId: undefined,
          tableName: undefined,
          category: undefined,
          sourceType: undefined,
          sqlInfo: '--输入实现该方法的自定义sql\n',
          inputPramsList: [],
          outputPramsList: [],
        },
        paramAddModel: {
          id: undefined,
          methodId: undefined,
          category: undefined,
          inputPramsList: [],
          outputPramsList: [],
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
          outputPramsList: [],
        },
        projectModuleCreateRowDataRules: {
          name: [
            {required: true, message: '请输入模块名(汉)', trigger: 'blur'}
          ],
          simpleName: [
            {required: true, message: '请输入模块名(英)', trigger: 'blur'}
          ],
          path: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        customObjectTable: [],
        dbTypeList: [{
          name: 'varchar',
          value: 'varchar'
        }, {
          name: 'int',
          value: 'int'
        }, {
          name: 'datetime',
          value: 'datetime'
        }],
        paramsTypeList: [{
          name: 'String',
          value: 'String'
        }, {
          name: 'Integer',
          value: 'Integer'
        }, {
          name: 'Date',
          value: 'Date'
        }],
        resultTypeList: [{
          name: '对象',
          value: 'object'
        }, {
          name: 'List对象',
          value: 'list'
        }, {
          name: 'Map对象',
          value: 'map'
        }],
        multipleInputSelection: [],
        inputPramsList: [],
        outputPramsList: [],
        subParams: {},
        tableLoading: false,
        projectTableColumnList: [],
        innerDialogName: '',
        innerVisible: false,
        paramsInfo: {
          tableId: undefined,
          category: undefined,
        },
        methodParams: {
          methodId: undefined,
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
          tableId: undefined,
          tableName: undefined,
          columnName: undefined,
          genericsType: undefined,
          mold: undefined,
          inputColumnList: []
        },
        parentId: undefined
      }
    }, // 接收父组件的传值
    watch: {
      dialogFormVisible(val) {
        if (val) {
          this.methodDetailModel = this.rowData
          this.methodId = this.rowData.id
          this.selectedTableName = this.rowData.tableName

          console.log("this methodDetailModel----", this.methodDetailModel)
          this.methodDetailModel.sourceType = 'table'
          this.methodDetailModel.modulePath = this.$route.query.path || this.rowData.modulePath
          this.methodDetailModel.moduleName = this.$route.query.name || this.rowData.moduleName
          this.projectId = parseInt(this.$route.query.projectId) || parseInt(this.rowData.projectId)

          this.getProjectTableList(this.projectId)
          //获得方法已选参数
          this.methodParams.methodId = this.rowData.id
          this.loadMethodParams()

          this.$nextTick(() => {
            this.dict("methodCategory")
            this.dict("paramCondition")
            this.dict("sortCondition")
            this.dict("paramType")
            this.dict("paramSource")
            this.dict("methodMold")
          })
        }
      },
      projectId(val) {
        this.projectId = val
        this.getProjectTableList(this.projectId)
      }
    },
    methods: {
      submitForm() {
        console.log("inputPramsList--------", this.inputPramsList)
        this.methodDetailModel.inputPramsList = this.inputPramsList
        const request = new ParamsUpdateRequest()
        request.setParams(this.methodDetailModel)
        request.api().then(res => {
          this.dialogFormVisible = false
          // this.$emit('loadData')
          this.loadMethodParams()
        })

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
        const request = new MethodParamRequest()
        request.setParams(this.methodParams)
        request.api().then(res => {
          this.$nextTick(() => {
            this.inputPramsList = res.data.inputPramsList
            this.outputPramsList = res.data.outputPramsList
          })
        })

      },
      paramSourceChange(val) {
        // alert(val)

        console.log('-----------this.paramsInfoModel-------', this.paramsInfoModel)
        // this.paramsInfoModel.tableColumnId = undefined
        // this.paramsInfoModel.tableId = undefined
      },
      addInputParams(type) {


        console.log("--this.paramsInfoModel", this.paramsInfoModel)
        console.log("---this.methodDetailModel", this.methodDetailModel)

        this.innerVisible = true
        this.innerDialogName = type == 'input' ? '添加入参' : '添加出参'
        this.paramsInfoModel.type = type
        this.paramsInfoModel.paramSource = 'tableColumn'
        this.paramsInfoModel.tableId = this.methodDetailModel.tableId
        this.paramsInfoModel.tableName = this.methodDetailModel.tableName

        this.projectTableList.forEach(table => {
          if (table.tableName == this.paramsInfoModel.tableName) {
            table.disabled = false
          } else {
            table.disabled = true
          }
        })
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
        this.projectTableColumnList = []
        this.paramsInfoModel.tableId = value.id
        this.paramsInfoModel.tableName = value.tableName
        this.paramsInfoModel.columnName = undefined
        this.paramsInfoModel.paramName = undefined
        this.paramsInfoModel.columnComment = undefined
        this.paramsInfoModel.tableColumnId = undefined
        this.paramsInfoModel.dataType = undefined
        if (value.id) {
          const request = new TableColumnListRequest()
          request.setParams(this.paramsInfoModel)
          request.api().then(res => {
            this.projectTableColumnList = res.data
          })
        }
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
        this.paramsInfo.category = this.methodDetailModel.category
        this.paramsInfo.tableId = this.methodDetailModel.tableId
        const request = new MethodPreParamRequest()
        request.setParams(this.paramsInfo)
        request.api().then(res => {
          let hasInputPramsList = this.inputPramsList
          this.inputPramsList = hasInputPramsList.concat(res.data.inputPramsList)
          this.outputPramsList = [this.defaultOutputParams].concat(res.data.outputPramsList);
        })
      },

      changeTable(column) {
        console.log("column-----", column)
        this.methodDetailModel.tableId = column.id
        this.methodDetailModel.tableName = column.tableName
        this.paramsInfo.category = this.methodDetailModel.category
        this.paramsInfo.tableId = this.methodDetailModel.tableId
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
        const request = new this.sdk.DbTableColumnListRequest
        request.setParams({"tableId": tableId})
        request.api().then(res => {
          this.tableColumnList = res.data
        })

      },
      paramNameEdit(row, column, cell, event) {
        row.edit = true
      },
      paramNameEditCancle(row, column, cell, event) {
        row.edit = false
      },

      changeTableColumn(column) {
        this.paramsInfoModel.paramName = column.paramName
        this.paramsInfoModel.columnComment = column.columnComment
        this.paramsInfoModel.columnName = column.columnName
      },
      /**
       * 列选择
       */
      selectTableColumn(column) {
        this.paramsInfoModel.paramName = column.paramName
        this.paramsInfoModel.columnComment = column.columnComment
        this.paramsInfoModel.dataType = column.dataType
        this.paramsInfoModel.columnName = column.columnName
        this.paramsInfoModel.tableColumnId = column.id
        this.paramsInfoModel.tableName = column.tableName
      },
      saveParams() {
        this.paramsInfoModel.projectId = this.projectId
        this.paramsInfoModel.moduleId = this.moduleId
        this.paramsInfoModel.projectModuleMethodId = this.methodId
        if (!this.checkNameFlag) {
          if (this.paramsInfoModel.id) {
            // 修改
            const request = new ParamsUpdateRequest()
            request.setParams(this.paramsInfoModel)
            request.api().then(res => {
              this.innerVisible = false
              this.loadParams(this.methodDetailModel, this.methodId)
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
            })
          } else {
            // 新增
            const request = new ParamsCreateRequest()
            request.setParams(this.paramsInfoModel)
            request.api().then(res => {
              this.innerVisible = false
              this.loadParams(this.methodDetailModel, this.methodId)
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
            })
          }
        } else {
          this.$message('参数已存在')
        }
      },
      resetForm() {
        this.$refs['projectModuleCreateRef'].resetFields()
      },
      changeTextarea(val) {
        this.$set(this.methodDetailModel, 'sqlInfo', val)
      },
      formaterSql(val) {
        const dom = this.$refs.sqleditor
        dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()))
      },
      getProjectTableList(projectId) {
        console.log('-----------getProjectTableList .projectId-------', projectId)
        if (projectId) {
          this.projectTableList = []
          const request = new TableListRequest()
          request.setParams({'projectId': projectId, "userId": 1})
          request.api().then(res => {
            this.projectTableList = res.data
            this.projectTableList.forEach(table => {
              if (table.tableName == this.selectedTableName) {
                table.disabled = false
              } else {
                table.disabled = true
              }
            })
          })
        }
      },
      deleteParams(index, row) {
        this.$confirm('确定删除方法参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.inputPramsList.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          const request = new ParamsDeleteRequest()
          request.setParams({'id': row.id})
          request.api().then(res => {
            this.loadMethodParams()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
          let that = this
          row.children.forEach((element, i) => {
            that.handleCheckAll(row.children[i], checked);
          })
        }
      },
      getParent(data2, nodeId2, isChecked) {
        var arrRes = [];
        if (data2.length == 0) {
          if (!!nodeId2) {
            arrRes.push(data2)
          }
          return arrRes;
        }
        let rev = (data, nodeId) => {
          for (var i = 0, length = data.length; i < length; i++) {
            let node = data[i];
            if (node.id == nodeId) {
              arrRes.push(node)
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
            })
            if (num == item.children.length) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          }
        });
      },
      addCustomInputParams() {
        this.subInputPramsList.push(this.paramsInfoModel)
        console.log("subInputPramsList", this.subInputPramsList)

      },
      addObjectInputParams() {
        this.subInputPramsList.push(this.paramsInfoModel)
      },
      changeCondition() {

      },
      saveSubParams() {
        console.log("paramsInfoModel", this.paramsInfoModel)
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
        this.paramsInfoModel.methodId = this.methodId
        const request = new ParamsAddRequest()
        request.setParams(this.paramsInfoModel)
        request.api().then(res => {
          this.innerVisible = false
          this.loadMethodParams()
        })


      },
      addSubParams(index, row, type) {

        console.log("addSubParams", row)
        this.innerVisible = true
        this.paramsInfoModel.parentId = row.id
        this.paramsInfoModel.paramSource = 'custom'
        this.paramsInfoModel.paramType = 'String'
      },
      findParent(array, id, rowData) {
        if (array == null) return null;
        for (let obj of array) {
          if (obj.id == id) {
            obj.children.push(rowData)
          }
          this.findParent(obj.children, id, rowData);
        }
      },
      setInputParams() {
        this.selectInnerVisible = true
        this.paramsInfoModel.tableName = this.methodDetailModel.tableName

        this.projectTableList.forEach(table => {
          if (table.tableName == this.paramsInfoModel.tableName) {
            table.disabled = false
          } else {
            table.disabled = true
          }
        })

        //获取当前表的全部字段
        this.tableColumnList = []
        const request = new this.sdk.DbTableColumnListRequest
        request.setParams({"tableId": this.methodDetailModel.tableId})
        request.api().then(res => {
          this.tableColumnList = res.data
          this.paramsInfoModel.inputColumnList = res.data
        })

      },
      addSubMethod(){
        this.$refs.SubMethodRef.subDialogFormVisible = true
      }
    }
  }
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
