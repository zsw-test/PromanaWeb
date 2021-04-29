<template>
  <div class="app-container">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>缴费记录</span>
      </div>
      <el-table
        :data="tableData"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          prop="ID"
          label="缴费单号"
        />
        <el-table-column
          prop="Houseid"
          label="Houseid"
          width="120"
        />
        <el-table-column
          prop="CreatedAt"
          label="缴费时间"
          width="300"
        />
        <el-table-column
          prop="Chargetype"
          label="缴费类型"
          width="120"
        />
        <el-table-column
          prop="Chargefee"
          label="缴费金额"
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
                     service.get('/api/managerauth/chargerecordtotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/chargerecordpage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
          },
         getData(){
                  service.get('/api/managerauth/chargerecordtotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/chargerecordpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
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