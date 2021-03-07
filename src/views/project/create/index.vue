<template>
  <!--新增-->
  <!-- 新增编辑弹出框 -->
  <el-dialog title="新增项目" :visible.sync="dialogFormVisible" width="50%">
    <el-form ref="projectCreateFormRef" :model="projectCreateModel" label-width="20%">
      <el-form-item label="项目名称(汉语)">
        <el-input v-model="projectCreateModel.name"/>
      </el-form-item>
      <el-form-item label="项目名称(英语)">
        <el-input v-model="projectCreateModel.simpleName"/>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="projectCreateModel.author"/>
      </el-form-item>
      <el-form-item label="项目版本">
        <el-input v-model="projectCreateModel.version"/>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="projectCreateModel.description" type="textarea" rows="5"/>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="projectCreateModelSubmit">保 存</el-button>
      </span>
  </el-dialog>
</template>
<script>
  // 接口
  import {ProjectCreateRequest} from '@/sdk/modules/project/create'
  import {DbListRequest} from '@/sdk/modules/db/list'

  export default {
    name: 'ProjectCreate',
    props: ['rowData'],
    data() {
      return {
        dbList: [],
        projectTypeList: [],
        dialogFormVisible: false,
        projectCreateModel: {
          id: undefined,
          name: undefined,
          simpleName: undefined,
          author: undefined,
          description: undefined,
          version: undefined,
          tableId: undefined
        },
        projectCreateModelRules: {
          name: [
            {required: true, message: '请输入模块名(汉)', trigger: 'blur'}
          ],
          simpleName: [
            {required: true, message: '请输入模块名(英)', trigger: 'blur'}
          ],
          path: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      dialogFormVisible(val) {
        if (val) {
          this.loadDbList()
        }
      },
    },
    methods: {
      projectCreateModelSubmit() {
        this.$refs['projectCreateFormRef'].validate((valid) => {
          if (valid) {
            const request = new ProjectCreateRequest()
            request.setParams(this.projectCreateModel)
            request.api().then(res => {
              this.dialogFormVisible = false
              this.$emit('loadData')
            })
          } else {
            this.$message.error('参数校验失败')
            return false
          }
        })
      },

      loadDbList() {
        const request = new DbListRequest()
        request.api().then(res => {
          this.dbList = res.data
        })

      },
      resetForm() {
        this.$refs['projectCreateFormRef'].resetFields()
      },
    }
  }
</script>
