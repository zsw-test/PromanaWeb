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
      label="缴费单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Houseid"
      label="Houseid"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="缴费时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="Chargetype"
      label="缴费类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Chargefee"
      label="缴费金额"
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
        queryCharge(row){
            console.log(row)
        },
              page(currentpage){
                     this.$axios.get('http://127.0.0.1:31717/api/managerauth/chargerecordtotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://127.0.0.1:31717/api/managerauth/chargerecordpage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
          },
         getData(){
                  this.$axios.get('http://127.0.0.1:31717/api/managerauth/chargerecordtotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://127.0.0.1:31717/api/managerauth/chargerecordpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
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