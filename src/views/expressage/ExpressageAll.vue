<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>所有快件</span>
    </div>
      <el-input
            style="width:35% ;margin-bottom:10px"
          v-model="keyword"
          size="mini"
          @input="getData"
          placeholder="输入关键字搜索"/>
  <el-table
    :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="ID"
      label="快件单号"
      >
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
      width="100">
      <template slot-scope="scope">
         <el-button  @click="deleteRow(scope.row)" type="danger" size="small">删除</el-button>
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
         deleteRow(row){
          service.delete('/api/managerauth/expressage/'+row.ID).then((response)=>{
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
                  service.get('/api/managerauth/expressagetotal'+'?keyword='+this.keyword).then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/expressagepage?pageindex='+this.pageindex+'&pagesize='+this.pagesize+'&keyword='+this.keyword).then((response)=>{
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
                keyword:"",
            }
        },
        created(){
            this.getData()
        },
}
</script>

<style>

</style>