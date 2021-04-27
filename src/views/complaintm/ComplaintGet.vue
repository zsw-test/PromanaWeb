<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>我的投诉</span>
    </div>
  <el-table
    :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="ID"
      label="投诉单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Depart"
      label="投诉部门"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="投诉时间"
      width="220">
    </el-table-column>
    <el-table-column
      prop="Reason"
      label="投诉原因"
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
        <el-button @click="ChangecomplaintStatus(scope.row)" type="primary" size="small">已经解决</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
<el-dialog
  title="详情"
  :visible.sync="dialogVisible"
  width="50%">
   <el-card>投诉人：{{this.ShowData.Ownername}}</el-card><br>
 <el-card>投诉时间：{{this.ShowData.CreatedAt}}</el-card><br>
 <el-card>投诉原因：{{this.ShowData.Reason}}</el-card><br>
  <el-card>投诉部门：{{this.ShowData.Depart}}</el-card><br>
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
           this.ShowData.Reason = row.Reason
          this.ShowData.Ownername = row.Ownername
          this.ShowData.Depart = row.Depart
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
        ChangecomplaintStatus(row){
            service.put('api/managerauth/complaintresolve',
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
                service.get('/api/managerauth/complaintmanager?Managername='+this.Username,).then((response)=>{
                                      
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
             },
        },

        data(){
            return {
                 ShowData:{
                  Reason:null,
                  Ownername:null,
                  Depart:null,
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