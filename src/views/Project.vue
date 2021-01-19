<template>
  <div>
   <Header/>
    <div class="container">
      <el-row :gutter="30" style="padding:30px">
        <el-col :span="3">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="image-box">
              <img src="../assets/plus.png" />
              <span>创建项目</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="3" v-for="(o) in tableData" :key="o.id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="content-box">
              <span>{{o.name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ o.author }}</time>
                
              </div>
              <div>
                  <el-button type="text" class="button">项目详情</el-button>
                  <el-button type="text" @click="$router.push({path:'/design',query:{
                      projectId:o.id,
                      projectName:o.name
                  }})" class="button">在线编辑</el-button>
                  <el-button type="text" class="button">删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ProjectPageRequest } from "@/sdk/modules/project/page";
import Header from "components/Header"
export default {
  data() {
    return {
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
  components:{
      Header
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
  },
};
</script>
<style lang="less" scoped>

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
    height: 0;
    padding-bottom: 100%;
  }
}
</style>
