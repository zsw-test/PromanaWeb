<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>我的报修</span>
    </div>
  <el-table
    :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="ID"
      label="报修单号"
      >
    </el-table-column>
    <el-table-column
      prop="Address"
      label="地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="报修时间"
      width="220">
    </el-table-column>
    <el-table-column
      prop="Reason"
      label="报修原因"
      width="300">
    </el-table-column>
    <el-table-column
      prop="Status"
      label="状态"
      width="120">
    </el-table-column>
        <el-table-column
      prop="Resolve"
      label="解决"
      :formatter="formatBoolean"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="250">
      <template slot-scope="scope">
        <el-button @click="ShowRow(scope.row),dialogVisible = true" type="text" size="medium">查看详情</el-button>
        <el-button @click="ChangeRepairStatus(scope.row)" type="primary" size="small">已经解决</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
<el-dialog
  title="详情"
  :visible.sync="dialogVisible"
  width="50%">
   <el-card>保修人：{{this.ShowData.Ownername}}</el-card><br>
 <el-card>报修时间：{{this.ShowData.CreatedAt}}</el-card><br>
 <el-card>报修地点：{{this.ShowData.Address}}</el-card><br>
  <el-card>报修照片：
  <div class="demo-image__lazy">
  <el-image v-for="url in this.ShowData.ShowList" :key="url" :src="url" lazy></el-image>
</div>
</el-card><br>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import service from "@/utils/request"
export default {
    methods:{
              ShowRow(row){
           this.ShowData.ShowList = row.Pics
          this.ShowData.Ownername = row.Ownername
          this.ShowData.Address = row.Address
          this.ShowData.CreatedAt = row.CreatedAt
        },
          formatBoolean: function (row, column, cellValue) {
                var ret = ''  //你想在页面展示的值
                if (cellValue) {
                    ret = "是"  //根据自己的需求设定
                } else {
                    ret = "否"
                }
                return ret;
            },
        ChangeRepairStatus(row){
            service.put('api/managerauth/repairresolve',
            {
              ID:row.ID,
            }).then((response)=>{
                     this.$message(response.data.result)
                     this.getData()
                }).catch((response)=>{
                    console.log(response);
                })
        },
         getData(){
                service.get('/api/managerauth/repairmanager?Managername='+this.Username,).then((response)=>{
                                      
                    this.tableData = response.data.data
                      for(var i=0;i<this.tableData.length;i++){
                      if(this.tableData[i].Pics==""){
                        this.tableData[i].Pics=[]
                        continue;
                      }               
                      this.tableData[i].Pics=JSON.parse(this.tableData[i].Pics)
                    }
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
             },
        },

        data(){
            return {
                 ShowData:{
                  ShowList:[],
                  Ownername:null,
                  Address:null,
                  CreatedAt:null,
                },
                dialogVisible:false,
                tableData:[],
                Username:localStorage.getItem("username")
            }
        },
        created(){
            this.getData()
        },
}
</script>

<style>

</style>