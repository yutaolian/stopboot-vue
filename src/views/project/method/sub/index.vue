<template>
  <!--新增-->
  <el-dialog title="新增子方法" :visible.sync="subDialogFormVisible" width="80%" append-to-body>
    <el-form ref="methodCreateRef" :model="methodCreateParams" :rules="methodCreateRules" >
      <el-row>
        <el-col :span="11">
          <el-form-item label="方法名称(汉)" :label-width="formLabelWidth">
            <el-input v-model="methodCreateParams.name" show-word-limit maxlength="20"  placeholder="汉语方法名称"
                      @input='nameChange'/>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="方法简介" :label-width="formLabelWidth">
            <el-input
              v-model="methodCreateParams.description"
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
            <el-input v-model="methodCreateParams.simpleName" show-word-limit maxlength="20" placeholder="建议使用驼峰命名"
                      @input='simpleNameChange'/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="方法分类" :label-width="formLabelWidth">
            <el-select placeholder="选择方法分类" v-model="methodCreateParams.category">
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
            <el-select v-model="methodCreateParams.tableName" placeholder="请选择业务主表" @change="changeTable">
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

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="subDialogFormVisible = false">
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
  import {MethodCreateRequest} from '@/sdk/modules/method/create'
  import {TableListRequest} from '@/sdk/modules/table/list'


  //接口混入
  import mixins from '@/mixins'

  export default {
    name: 'ProjectModuleMethodCreate',
    mixins: [mixins],
    props: ['rowData'],
    data() {
      return {
        select:'1',
        projectTableList:[],
        projectId: undefined,
        methodCreateParams: {
          projectId: undefined,
          moduleId: undefined,
          moduleName: undefined,
          modulePath: undefined,
          moduleFullPath: undefined,
          name: undefined,
          simpleName: undefined,
          description: undefined,
          path: undefined,
          fullPath: undefined,
          inputBeanName: undefined,
          outputBeanName: undefined,
          methodType: 'post',
          contentType: 'application/json',
          type: 'out',
        },
        formLabelWidth: '150px',
        subDialogFormVisible: false,
        methodCreateRules: {
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

      }
    }, // 接收父组件的传值
    watch: {
      subDialogFormVisible(val) {
        if (val) {
          console.log("this.rowData----",this.rowData)
          this.methodCreateParams.type = 'out'
          this.methodCreateParams.mold = 'single'
          this.getProjectTableList()
          this.$nextTick(() => {
            this.dict("methodType")
            this.dict("contentType")
            this.dict("methodMold")
            this.dict("methodCategory")
          })
        }
      },
    },
    methods: {
      submitForm() {
        this.$refs['methodCreateRef'].validate((valid) => {
          if (valid) {
            const request = new MethodCreateRequest()
            request.setParams(this.methodCreateParams)
            request.api().then(res => {
              this.subDialogFormVisible = false
              this.$emit('loadData')
            })
          } else {
            return false
          }
        })
      },
      simpleNameChange(val) {
        this.methodCreateParams.path = val.replace(/([A-Z])/g, "/$1").toLowerCase();
        this.methodCreateParams.fullPath = this.methodCreateParams.moduleFullPath + '/' + this.methodCreateParams.path
      },
      pathChange(val) {
        // this.methodCreateParams.fullPath = this.methodCreateParams.modulePath + '/' + val
      },
      nameChange(val) {
        this.methodCreateParams.description = val
      },
      toHump(name) {
        return name.replace(/\/(\w)/g, function (all, letter) {
          return letter.toUpperCase();
        });
      },
      getProjectTableList() {
        if (this.projectId) {
          this.projectTableList = []
          const request = new TableListRequest()
          request.setParams({'projectId': this.projectId})
          request.api().then(res => {
            this.projectTableList = res.data
          })
        }
      },
      changeTable(column) {
        this.methodCreateParams.tableId = column.id
        this.methodCreateParams.tableName = column.tableName
      },
    }
  }
</script>
<style>
  /*.el-select .el-input {*/
  /*  width: 130px;*/
  /*}*/
  /*.input-with-select .el-input-group__prepend {*/
  /*  background-color: #fff;*/
  /*}*/
</style>
