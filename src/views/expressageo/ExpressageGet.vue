<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>我的快件</span>
    </div>
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
      prop="ExpressLocation"
      label="到达地点"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="快件时间"
      width="220">
    </el-table-column>
    <el-table-column
      prop="Telephone"
      label="电话号码"
      width="200">
    </el-table-column>
    <el-table-column
      prop="ExpType"
      label="快件类型"
      width="120">
    </el-table-column>
        <el-table-column
      prop="Istake"
      label="是否取出"  
      :formatter="formatBoolean"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="220">
      <template slot-scope="scope">
        <el-button type="text" @click="ShowRow(scope.row),dialogVisible = true" size="medium">查看详情</el-button>
        <!-- <el-button  @click="EditRow(scope.row)" type="primary" size="small">编辑</el-button> -->
        <el-button  @click="deleteRow(scope.row)" type="primary" size="small">取出</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
<el-dialog
  title="详情"
  :visible.sync="dialogVisible"
  width="50%">
   <el-card>收件人：{{this.ShowData.Ownername}}</el-card><br>
 <el-card>快件时间：{{this.ShowData.CreatedAt}}</el-card><br>
 <el-card>到达地点：{{this.ShowData.ExpressLocation}}</el-card><br>
  <el-card>状态：{{this.ShowData.Istake}}</el-card><br>
  <el-card>快件类型：{{this.ShowData.ExpType}}</el-card><br>
 <el-card>电话号码：{{this.ShowData.Telephone}}</el-card><br>

  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

  

  </div>
</template>

<script>
import service from "@/utils/request"
export default {
    methods:{
      deleteRow(row){
            service.delete('/api/ownerauth/expressage/'+row.ID).then((response)=>{
                        console.log(response.data);
                         this.$message(response.data.result)
                         this.getData()
                }).catch((response)=>{
                    console.log(response);
                })
                this.getData()
          },
          formatBoolean: function (row, column, cellValue) {
                var ret = ''  //你想在页面展示的值
                if (cellValue) {
                    ret = "是"  //根据自己的需求设定
                } else {
                    ret = "否"
                }
                return ret;
            },
        ShowRow(row){
           this.ShowData.Telephone = row.Telephone
          this.ShowData.Ownername = row.Ownername
          this.ShowData.ExpressLocation = row.ExpressLocation
          this.ShowData.CreatedAt = row.CreatedAt
          this.ShowData.ExpType = row.ExpType
          this.ShowData.Istake = row.Istake
        },
         getData(){
                service.get('/api/ownerauth/expressageowner?Ownername='+this.Ownername,).then((response)=>{
                  
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
             },
        },

        data(){
            return {
                ShowData:{
                  Ownername:null,
                  ExpressLocation:null,
                  CreatedAt:null,
                  Telephone:null,
                  Istake:null,
                  ExpType:null,
                },
                dialogVisible:false,
                tableData:[],
                Ownername:localStorage.getItem("username")
            }
        },
        created(){
            this.getData()
        },
}
</script>

<style>

</style>