<template>
  <div class="app-container">

  <el-table
    :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="ID"
      label="报修单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Address"
      label="地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="报修时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="Reason"
      label="报修原因"
      width="120">
    </el-table-column>
      <el-table-column
      prop="Managername"
      label="解决人员"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Ownername"
      label="业主姓名"
      width="120">
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
      width="200">
      <template slot-scope="scope">
        <el-button @click="getData2(),dialogVisible = true,DispatchRowId=scope.row.ID" type="primary" size="medium">派人维修</el-button>
        <el-button  type="danger" size="medium">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

<el-dialog
  title="派人维修"
  :visible.sync="dialogVisible"
  width="30%"
>
  <el-table
    :data="tableData2"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="Username"
      label="用户名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="Depart"
      label="部门"
      width="100">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="DispathchRow(scope.row),dialogVisible = false" type="primary" size="medium">派遣</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size.sync=pagesize2
  :current-page.sync=pageindex2
  :total=total2
  @current-change="page2">
</el-pagination>
</el-dialog>

<el-pagination
  background
  layout="prev, pager, next"
  :page-size.sync=pagesize
  :current-page.sync=pageindex
  :total=total
  @current-change="page">
</el-pagination>



  </div>
</template>

<script>
import service from "@/utils/request"
export default {
    methods:{
          formatBoolean: function (row, column, cellValue) {
                var ret = ''  //你想在页面展示的值
                if (cellValue) {
                    ret = "是"  //根据自己的需求设定
                } else {
                    ret = "否"
                }
                return ret;
            },
          DispathchRow(row){
            service.put('api/managerauth/repairdispatch',
            {
              Managername:row.Username,
              ID:this.DispatchRowId
            }).then((response)=>{
              this.$message(response.data.result); 
                      //如果修改成功  消失对话框
                      if(response.data.code==1)
                      {
                          this.dialogVisible2 = false
                          this.getData()
                      }
                }).catch((response)=>{
                    console.log(response);
                })
          },
          getData2(){
              service.get('/api/managerauth/managertotal',).then((response)=>{
              console.log(response.data.data.count);
              this.total2 = response.data.data.count
          }).catch((response)=>{
              console.log(response);
          })
          service.get('/api/managerauth/managerpage?pageindex='+this.pageindex2+'&pagesize='+this.pagesize2).then((response)=>{
              this.tableData2 = response.data.data
                console.log(response.data.data);
          }).catch((response)=>{
              console.log(response);
          })
        },
         getData(){
                  service.get('/api/managerauth/repairtotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/repairpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
             },
             page(currentpage){
            this.getData()
            },
              page2(currentpage){
                this.getData2()
            },
        },
          
        

        data(){
            return {
              dialogVisible: false,
              DispatchManager:null,
              DispatchRowId:null,
                total:200,
                tableData2:[],
                tableData:[],
                pageindex:1,
                pagesize:5,
                total2:200,
                pageindex2:1,
                pagesize2:5,
            }
        },
        created(){
            this.getData()
        },
}
</script>

<style>

</style>