<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>小区内部车辆</span>
    </div>
  <el-table
    :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="ID"
      label="车辆信息ID"
      width="120">
    </el-table-column>
        <el-table-column
      prop="CarNumber"
      label="车牌号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="创建时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="CarType"
      label="类型"
      width="120">
    </el-table-column>
    <el-table-column
      prop="ExpireTime"
      label="到期时间"
      width="300">
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
</el-card>

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
        queryCharge(row){
            console.log(row)
        },
              page(currentpage){
                   this.getData()
          },
         getData(){
                  service.get('/api/managerauth/carinfototal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/carinfopage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
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