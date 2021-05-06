<template>
  <div class="app-container">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>房屋费用总览</span>
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
        highlight-current-row
      >
        <el-table-column
          prop="ID"
          label="Id"
        />
        <el-table-column
          prop="Houseid"
          label="Houseid"
          width="120"
        />
        <el-table-column
          prop="Water"
          label="水量"
          width="120"
        />
        <el-table-column
          prop="Electric"
          label="电量"
          width="120"
        />
        <el-table-column
          prop="Gas"
          label="燃气量"
          width="120"
        />
        <el-table-column
          prop="Property"
          label="物业费"
          width="120"
        />
      </el-table>
    </el-card>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size.sync="pagesize"
      :current-page.sync="pageindex"
      :total="total"
      @current-change="page"
    />
  </div>
</template>

<script>
import service from "@/utils/request"
export default {

        data(){
            return {
              keyword:"",
                total:200,
                tableData:[],
                pageindex:1,
                pagesize:5,
            }
        },
        created(){
            this.getData()
        },
    methods:{
        queryCharge(row){
            console.log(row)
        },
              page(currentpage){
                  this.getData()
          },
         getData(){
                  service.get('/api/managerauth/chargetotal'+'?keyword='+this.keyword).then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/chargepage?pageindex='+this.pageindex+'&pagesize='+this.pagesize+'&keyword='+this.keyword).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
             },
        },
}
</script>

<style>

</style>