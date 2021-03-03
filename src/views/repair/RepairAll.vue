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
      prop="Owneraddress"
      label="业主地址"
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
        <el-button @click="queryCharge(scope.row)" type="primary" size="medium">查看</el-button>
        <el-button  type="danger" size="medium">删除</el-button>
      </template>
    </el-table-column>
  </el-table>


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
        queryCharge(row){
            console.log(row)
        },
              page(currentpage){
                     this.$axios.get('http://127.0.0.1:31717/api/managerauth/repairtotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://127.0.0.1:31717/api/managerauth/repairpage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
          },
         getData(){
                  this.$axios.get('http://127.0.0.1:31717/api/managerauth/repairtotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://127.0.0.1:31717/api/managerauth/repairpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
             },
        },

        data(){
            return {
                total:200,
                tableData:[],
                pageindex:1,
                pagesize:5,
            }
        },
        created(){
            this.getData()
        },
}
</script>

<style>

</style>