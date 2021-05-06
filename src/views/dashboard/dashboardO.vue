<template>
  <div class="dashboard-container">
    <el-card><h2>江大园小区管理系统欢迎业主: {{ name }}</h2></el-card>


    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <h3>公告</h3>
      </div>
              <el-input
            style="width:35% ;margin-bottom:10px"
          v-model="keyword"
          size="mini"
          @input="getData"
          placeholder="输入关键字搜索"/>
      <el-table
        :data="tableData"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          prop="Title"
          label="标题"
        />
        <el-table-column
          prop="UpdatedAt"
          label="公告时间"
          width="220"
        />
        <el-table-column
          prop="Text"
          label="公告内容"
          width="300"
        />
        <el-table-column
          prop="Managername"
          label="发布人"
          width="120"
        />

        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click="ShowRow(scope.row),dialogVisible = true"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-card>公告标题：{{ this.ShowData.Title }}</el-card><br>
      <el-card>公告内容：{{ this.ShowData.Text }}</el-card><br>
      <el-card>公告时间：{{ this.ShowData.UpdatedAt }}</el-card><br>
      <el-card>发布人：{{ this.ShowData.Managername }}</el-card><br>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import service from '@/utils/request'

export default {
  data(){
    return{
      keyword:"",
      role:Cookies.get("role"),
      name: Cookies.get("username"),
      parkdata:null,
       ShowData:{
        Title:null,
        UpdatedAt:null,
        Text:null,
        Managername:null,
      },
      dialogVisible:false,
      tableData:[],
    }
  },
  
  created(){
    if(Cookies.get("role")=="owner"){
      service.get("/api/ownerauth/owner/"+Cookies.get("ID"))
      if(location.href.indexOf("#reloaded")==-1){
        location.href=location.href+"#reloaded";
        location.reload();
      }
    }else{
      this.$message("请重新登陆")
      this.$router.push("/login")
    }
    this.getData()
  },
  methods:{
    ShowRow(row){
          this.ShowData.Title = row.Title
          this.ShowData.UpdatedAt = row.UpdatedAt
          this.ShowData.Managername = row.Managername
          this.ShowData.Text = row.Text
        },
         getData(){
                service.get('/api/ownerauth/announceall'+'?keyword='+this.keyword).then((response)=>{
                  
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
          },
        
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
