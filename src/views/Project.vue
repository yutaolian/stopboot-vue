<template>
  <div>
    <Header />
    <div class="contentBox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="项目" name="project">
          <div class="container">
            <el-row :gutter="30" style="padding:30px">
              <el-col :span="3">
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  @click.native="handleAdd"
                >
                  <div class="image-box">
                    <img src="../assets/plus.png" />
                    <span>创建项目</span>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="3" v-for="(o, index) in tableData" :key="o.id">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <div class="content-box">
                    <div class="inner">
                      <span>{{ o.name }}</span>
                      <div class="bottom clearfix">
                        <time class="time">{{ o.author }}</time>
                      </div>
                      <div class="btnList">
                        <el-button type="text" class="button"
                          >项目详情</el-button
                        >
                        <el-button
                          type="text"
                          @click="
                            $router.push({
                              path: '/design',
                              query: {
                                projectId: o.id,
                                projectName: o.name,
                              },
                            })
                          "
                          class="button"
                          >在线编辑</el-button
                        >
                        <el-button
                          type="text"
                          class="button"
                          @click="handleDelete(index)"
                          >删除</el-button
                        >
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>

            <project-create
              ref="projectCreateRef"
              @loadData="loadData"
            ></project-create>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据库" name="sql">
          <div class="container">
            <el-row :gutter="30" style="padding:30px">
              <el-col :span="3">
                <el-card
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  @click.native="handleAdd"
                >
                  <div class="image-box">
                    <img src="../assets/plus.png" />
                    <span>创建数据库</span>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="3" v-for="(o, index) in tableData" :key="o.id">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                  <div class="content-box">
                    <div class="inner">
                      <span>{{ o.name }}</span>
                      <div class="bottom clearfix">
                        <time class="time">{{ o.author }}</time>
                      </div>
                      <div class="btnList">
                        <el-button type="text" class="button"
                          >项目详情</el-button
                        >
                        <el-button
                          type="text"
                          @click="
                            $router.push({
                              path: '/design',
                              query: {
                                projectId: o.id,
                                projectName: o.name,
                              },
                            })
                          "
                          class="button"
                          >在线编辑</el-button
                        >
                        <el-button
                          type="text"
                          class="button"
                          @click="handleDelete(index)"
                          >删除</el-button
                        >
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="代码生成" name="third">
        <generator-service/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <project-create
      ref="projectCreateRef"
      @loadData="loadData"
    ></project-create>
  </div>
</template>

<script>
import { ProjectPageRequest } from "@/sdk/modules/project/page";
import Header from "components/Header";
import ProjectCreate from "@/views/project/create";
import GeneratorService from "@/views/generator/service"
export default {
  data() {
    return {
      activeName: "project",
      currentDate: new Date(),
      tableData: [],
      pageTotal: 0,
      listLoading: false,
      projectPage: {
        name: undefined,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    Header,
    ProjectCreate,
    GeneratorService
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      const request = new ProjectPageRequest();
      request.setParams(this.projectPage);
      request
        .api()
        .then((res) => {
          this.tableData = res.data.list;
          this.pageTotal = res.data.totals;
          this.listLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
        });
    },
    // 添加操作
    handleAdd() {
      this.$refs.projectCreateRef.dialogFormVisible = true;
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
.contentBox {
  padding: 10px 30px;
}
.container {
  .image-box {
    width: 100%;
    padding-bottom: 100%;
    height: 0;
    position: relative;
    & > img {
      width: 46px;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    & > span {
      font-size: 14px;
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .content-box {
    width: 100%;
    // height: 100%;
    padding-bottom: 100%;
    position: relative;
    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      padding: 30px 0;
      .btnList {
      }
    }
  }
}
</style>
