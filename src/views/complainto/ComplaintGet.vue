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
      >
    </el-table-column>
    <el-table-column
      prop="Depart"
      label="部门"
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
      width="220">
      <template slot-scope="scope">
        <el-button type="text" @click="ShowRow(scope.row),dialogVisible = true" size="medium">查看详情</el-button>
        <el-button  @click="EditRow(scope.row)" type="primary" size="small">编辑</el-button>
        <el-button  @click="deleteRow(scope.row)" type="danger" size="small">删除</el-button>
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
 <el-card>投诉部门：{{this.ShowData.Depart}}</el-card><br>
  <el-card>状态：{{this.ShowData.Status}}</el-card><br>
  <el-card>处理人员：{{this.ShowData.Managername}}</el-card><br>
 <el-card>原因：{{this.ShowData.Reason}}</el-card><br>

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
        EditRow(row){
          this.$router.push({name: 'ComplaintEdit', params: {complaintid: row.ID}})
        },
        deleteRow(row){
          service.delete('/api/ownerauth/complaint/'+row.ID).then((response)=>{
                        console.log(response.data);
                         this.$message(response.data.result)
                         this.getData()
                }).catch((response)=>{
                    console.log(response);
                })
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
        ShowRow(row){
           this.ShowData.Reason = row.Reason
          this.ShowData.Ownername = row.Ownername
          this.ShowData.Depart = row.Depart
          this.ShowData.CreatedAt = row.CreatedAt
          this.ShowData.Managername = row.Managername
          this.ShowData.Status = row.Status
        },
         getData(){
                service.get('/api/ownerauth/complaintowner?Ownername='+this.Ownername,).then((response)=>{
                  
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
                  Ownername:null,
                  Depart:null,
                  CreatedAt:null,
                  Reason:null,
                  Status:null,
                  Managername:null,
                },
                dialogVisible:false,
                tableData:[],
                Ownername:localStorage.getItem("username")
            }
        },
        created(){
            this.getData()
        },
}
</script>

<style>

</style>