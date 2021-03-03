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
      label="快件单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Ownername"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="到达时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="ExpressLocation"
      label="收件地点"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Istake"
      label="是否取出"
      width="120">
    </el-table-column>
        <el-table-column
      prop="ExpType"
      label="类型"
      width="120">
    </el-table-column>
            <el-table-column
      prop="Telephone"
      label="联系方式"
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
                     this.$axios.get('http://127.0.0.1:31717/api/managerauth/expressagetotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://127.0.0.1:31717/api/managerauth/expressagepage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
          },
         getData(){
                  this.$axios.get('http://127.0.0.1:31717/api/managerauth/expressagetotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://127.0.0.1:31717/api/managerauth/expressagepage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
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