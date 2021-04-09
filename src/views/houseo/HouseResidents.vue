<template>
  <div class="app-container">

  <el-table
    :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
                 <el-table-column
                prop="Name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="Sex"
                label="性别"
                width="120">
              </el-table-column>
              <el-table-column
                prop="IdCard"
                label="身份证号"
                width="220">
              </el-table-column>
               <el-table-column
                prop="Work"
                label="工作"
                width="120">
              </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button @click="DeleteResident(scope.row)" type="danger" size="small">删除住户</el-button>
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
import service from "@/utils/request"
export default {
    methods:{
      
        DeleteResident(row){
            service.delete('/api/ownerauth/resident/'+row.ID).then((response)=>{
                        console.log(response.data);
                         this.$message(response.data.result)
                         this.getData()
                }).catch((response)=>{
                    console.log(response);
                })
        },
              page(currentpage){
                  this.getData()
          },
         getData(){
                  service.get('/api/ownerauth/residenthousetotal/'+localStorage.getItem("Houseid")).then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/ownerauth/residenthousepage/'+localStorage.getItem("Houseid")+'?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
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