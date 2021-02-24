<template>
  <div>
 
  <el-table
    :data="tableData"
    border
    style="width:100%">
    <el-table-column
      prop="ID"
      label="Id"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Houseid"
      label="Houseid"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Water"
      label="水量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Electric"
      label="电量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Gas"
      label="燃气量"
      width="120">
    </el-table-column>
        <el-table-column
      prop="Property"
      label="物业费"
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
                     this.$axios.get('http://www.zsw.test:31717/api/managerauth/chargetotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://www.zsw.test:31717/api/managerauth/chargepage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
          },
         getData(){
                  this.$axios.get('http://www.zsw.test:31717/api/managerauth/chargetotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://www.zsw.test:31717/api/managerauth/chargepage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
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