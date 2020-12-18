<template>
    <el-container class="container">
        <el-header class="header">Header</el-header>
        <el-container>
            <el-aside class="aside" v-if="showTree">
                <el-button @click="show()">收起</el-button>
                <el-container>
                    <el-tree :key=data.id
                             default-expand-all
                             :data="data"
                             @node-click="handleNodeClick"
                    ></el-tree>
                </el-container>
            </el-aside>
            <el-aside class="hide-aside" v-else>
                <el-button @click="show()">展开</el-button>
            </el-aside>
            <el-main class="main">
                <i v-if="!paramsInfo" class="el-icon-circle-plus" @click="open"></i>
                <el-container v-else class="">
                    <el-tabs v-model="activeName" type="border-card">
                        <el-tab-pane label="接口信息" name="first">接口信息
                        </el-tab-pane>
                        <el-tab-pane label="请求参数" name="second">
                            <el-container>
                                请求参数
                                <i class="el-icon-circle-plus" @click="open"></i>
                            </el-container>
                        </el-tab-pane>
                        <el-tab-pane label="响应参数" name="third">
                            <el-container>
                                响应参数
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
    import {TestCreateRequest} from "../sdk/modules/test/test_requets";

    export default {
        data() {
            return {
                paramsInfo: false,
                showTree: true,
                dialogVisible: false,
                activeName: "first",
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
            open() {
                this.dialogVisible = true
            },
            show() {
                this.showTree = !this.showTree;

                var test = new TestCreateRequest();
                test.setParams({id: 1})
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
