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
        <el-button @click="ChangeRepairStatus(scope.row)" type="primary" size="medium">已经解决</el-button>
        <el-button  type="danger" size="medium">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

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
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
             },
        },

        data(){
            return {
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