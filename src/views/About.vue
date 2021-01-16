<template>
    <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-container>
            <el-aside class="aside" v-if="showTree">
                <el-button @click="show()">收起</el-button>
                <el-container>
                    <div class="overflow">
                        <el-tree
                                class="over"
                                :data="moduleList"
                                node-key="id"
                                v-loading="loading"
                                :props="defaultProps"
                                default-expand-all
                                @node-click="handleNodeClick"
                                :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ data }">
              <span :class="{active:moduleId==data.id}">{{ data.name }}({{ data.simpleName }})</span>
              <span>
                <el-button
                        type="text"
                        size="mini"
                        @click="() => addMethod(data)">
                  添加方法
                </el-button>
                  <el-button
                          type="text"
                          size="mini"
                          @click="() => moduleDetail(data)">
                  编辑
                </el-button>
                <el-button
                        type="text"
                        size="mini"
                        @click="() => moduleDelete(data)">
                  删除
                </el-button>
              </span>
            </span>
                        </el-tree>
                    </div>
                </el-container>
            </el-aside>
            <el-aside class="hide-aside" v-else>
                <el-button @click="show()">展开</el-button>
            </el-aside>
            <el-main class="main">
                <i v-if="!paramsInfo" class="el-icon-circle-plus" @click="open">创建接口</i>
                <el-container v-else class="">
                    <el-tabs v-model="activeName" type="border-card">
                        <el-tab-pane label="接口信息" name="first">接口信息
                        </el-tab-pane>
                        <el-tab-pane label="请求参数" name="second">
                            <el-container>
                                请求参数222
                                <br>
                                <i class="el-icon-circle-plus" @click="open"></i>
                            </el-container>
                        </el-tab-pane>
                        <el-tab-pane label="响应参数" name="third">
                            <el-container>
                                响应参数
                                <br>
                                <i class="el-icon-circle-plus" @click="open"></i>
                            </el-container>
                        </el-tab-pane>
                    </el-tabs>
                </el-container>
            </el-main>
        </el-container>


        <el-dialog
                title="提示"
                :visible="dialogVisible"
                width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
    </el-container>
</template>
<script>
    import {ModuleTreeRequest} from '@/sdk/modules/module/tree'
    import {TestCreateRequest} from "../sdk/modules/test/test_requets";

    export default {
        data() {
            return {
                moduleTreeParams: {
                    projectId: undefined,
                },
                tableLoading: false,
                dialogFormVisible: false,
                projectId: undefined,
                moduleId: undefined,
                moduleName: undefined,
                modulePath: undefined,
                moduleMethodListData: [],
                loading: false,
                paramsInfo: false,
                showTree: true,
                dialogVisible: false,
                activeName: "first",
                moduleList: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                user: {
                    author: undefined,
                    description: undefined,
                    name: undefined,
                    simpleName: undefined,
                    version: undefined
                },
                data: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }]
            };
        },
        mounted() {
            this.loadProjectModuleTree();
        },
        methods: {
            handleNodeClick(data, node) {
                console.log(data);
                console.log(node);
                if (node.isLeaf) {
                    this.paramsInfo = true;
                } else {
                    this.paramsInfo = false;
                }

            },
            loadProjectModuleTree() {
                this.loading = true
                this.moduleList = []
                let request = new ModuleTreeRequest();
                request.setParams(this.moduleTreeParams)
                request.api().then(res => {
                    this.moduleList = res.data.list
                    this.loading = false
                    //默认加载一条数据
                    let firstData = this.moduleList[0]
                    this.loadMethod(firstData)
                }).catch(err => {
                    this.loading = false
                })
            },
            loadMethod(data) {
                this.tableLoading = true
                this.moduleId = data.id
                this.moduleName = data.name
                this.moduleMethodListData = []
                this.projectModuleMethodCreateRowData.moduleId = data.id
                this.projectModuleMethodCreateRowData.moduleName = data.name
                this.projectModuleMethodCreateRowData.modulePath = data.path
                const request = new MethodListRequest()
                request.setParams({moduleId: data.id})
                request.api().then(res => {
                    this.moduleMethodListData = res.data.list
                    this.tableLoading = false
                })
            },
            /**
             * 添加方法
             */
            addMethod(data) {
                console.log("---------data--------",data)
                // if (this.moduleId) {
                //     this.projectModuleMethodCreateRowData.projectId = this.$route.query.projectId
                //     this.projectModuleMethodCreateRowData.moduleId = data.id
                //     this.projectModuleMethodCreateRowData.moduleFullPath = data.fullPath
                //     this.$refs.projectModuleMethodCreate.dialogFormVisible = true
                // } else {
                //     this.$message({
                //         type: 'error',
                //         message: '请选择模块'
                //     })
                // }
            },
            updateMethod(index, row) {
                //获得模块信息
                // this.moduleDetailQuery.id=row.moduleId
                // const request = new ModuleDetailRequest()
                // request.setParams(this.moduleDetailQuery)
                // request.api().then(res => {
                //     console.log("---res--",res.data)
                //     this.projectModuleMethodUpdateRowData = Object.assign({}, row)
                //     this.projectModuleMethodUpdateRowData.moduleId = row.moduleId
                //     this.projectModuleMethodUpdateRowData.moduleName = res.data.name
                //     this.projectModuleMethodUpdateRowData.moduleFullPath = res.data.fullPath
                //     this.$refs.projectModuleMethodUpdate.dialogFormVisible = true
                // })
            },
            open() {
                this.dialogVisible = true
            },
            show() {
                this.showTree = !this.showTree;

                var test = new TestCreateRequest();
                test.setParams(user)
                test.call();
            }

        },
    };
</script>
<style lang="less" scoped>
    .container {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-top: 60px;

        .header {
            background-color: #b3c0d1;
            color: #333;
            text-align: center;
            line-height: 60px;
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
        }

        .hide-aside {
            background-color: palegreen;
            width: 70px !important;
        }

        .aside {
            background-color: olive;
            top: 0;
            bottom: 0;
            overflow: hidden;
        }

        .main {
            min-height: calc(100vh - 60px);
            width: 100%;
            position: relative;
            /*background-color: #42b983;*/

            .el-container {
                height: 100%;

                .el-tabs {
                    width: 100%;
                }
            }
        }

        .el-icon-circle-plus {
            font-size: 60px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            cursor: pointer;
        }
    }
</style>
