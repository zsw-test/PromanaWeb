<template>
  <div class="dashboard-container">
    <el-card><h2>江大园小区管理系统欢迎管理员: {{ name }}</h2></el-card>
    <el-card>
      <div class="Echarts">
        <el-card
          :body-style=" {color:'#409EFF'}"
          style="width: 200px;height: 180px; float:left; display:inline;margin-right: 10px;margin-bottom: 10px;"
        >
          <h2>居民人数：</h2>
          <h1>{{ residentcount }}</h1>
        </el-card>
        <el-card
          :body-style=" {color:'#409EFF'}"
          style="width: 200px;height: 180px; float:left; display:inline;margin-right: 10px;margin-bottom: 10px;"
        >
          <h2>业主人数：</h2>
          <h1>{{ ownercount }}</h1>
        </el-card>
        <el-card
          :body-style=" {color:'#409EFF'}"
          style="width: 200px;height: 180px; float:left; display:inline;margin-right: 10px;margin-bottom: 10px;"
        >
          <h2>管理员人数：</h2>
          <h1>{{ managercount }}</h1>
        </el-card>
        <el-card
          :body-style=" {color:'#409EFF'}"
          style="width: 200px;height: 180px; float:left; display:inline;margin-right: 10px;margin-bottom: 10px;"
        >
          <h2>可用停车位：</h2>
          <h1>{{ parkdata.parkcount-parkdata.parkinfocount }}</h1>
        </el-card>
        <el-card
          :body-style=" {color:'#409EFF'}"
          style="width: 200px;height: 180px; float:left; display:inline;margin-right: 10px;margin-bottom: 10px;"
        >
          <h2>车位总数量：</h2>
          <h1>{{ parkdata.parkcount }}</h1>
        </el-card>
      </div>
    </el-card>
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <h3>进入人员记录：</h3>
      </div>
      <el-table
        :data="tableData"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          prop="Name"
          label="姓名"
        />
        <el-table-column
          prop="UpdatedAt"
          label="进入时间"
          width="220"
        />
        <el-table-column
          prop="Way"
          label="方式"
          width="300"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import service from '@/utils/request'

export default {
  data(){
    return{
      role:Cookies.get("role"),
      name: Cookies.get("username"),
      parkdata:{
        parkcount:0,
        parkinfocount:0,
      },
      tableData:null,
      ownercount:0,
      residentcount:0,
      managercount:0,
    }
  },
  created(){
    if(Cookies.get("role")=="manager"){
      service.get("/api/managerauth/manager/"+Cookies.get("ID"))
        if(location.href.indexOf("#reloaded")==-1){
        location.href=location.href+"#reloaded";
        location.reload();
      }
    }else{
      this.$message("请重新登陆")
      this.$router.push("/login")
    }
    service.get("/api/managerauth/parkallcount").then((response)=>{
                this.parkdata = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
                this.getData()
      
  },
  
  methods:{
     getData(){
                service.get('/api/managerauth/accessall',).then((response)=>{
                  
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
                 service.get('/api/managerauth/ownertotal',).then((response)=>{
                  
                    this.ownercount = response.data.data.count
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/managertotal',).then((response)=>{
                  
                    this.managercount = response.data.data.count
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
                 service.get('/api/managerauth/residenttotal',).then((response)=>{
                  
                    this.residentcount = response.data.data.count
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
