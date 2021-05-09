<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>所有报修</span>
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
      label="报修单号"
      >
    </el-table-column>
    <el-table-column
      prop="Address"
      label="地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="报修时间"
      width="220">
    </el-table-column>
    <el-table-column
      prop="Reason"
      label="报修原因"
      width="300">
    </el-table-column>
      <el-table-column
      prop="Managername"
      label="解决人员"
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
      width="250">
      <template slot-scope="scope">
         <el-button @click="ShowRow(scope.row),dialogVisible2 = true" type="text" size="small">查看详情</el-button>
        <el-button @click="getData2(),dialogVisible = true,DispatchRowId=scope.row.ID" type="primary" size="small">派人维修</el-button>
        <el-button  @click="deleteRow(scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
<el-dialog
  title="派人维修"
  :visible.sync="dialogVisible"
  width="30%"
>
  <el-input
            style="width:35% ;margin-bottom:10px"
          v-model="keyword2"
          size="mini"
          @input="getData2"
          placeholder="输入关键字搜索"/>
  <el-table
    :data="tableData2"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="Username"
      label="用户名"
      >
    </el-table-column>
    <el-table-column
      prop="Depart"
      label="部门"
      width="100">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
       
        <el-button @click="DispathchRow(scope.row),dialogVisible = false" type="primary" size="small">派遣</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size.sync=pagesize2
  :current-page.sync=pageindex2
  :total=total2
  @current-change="page2">
</el-pagination>
</el-dialog>


<el-dialog
  title="详情"
  :visible.sync="dialogVisible2"
  width="50%">
   <el-card>报修人：{{this.ShowData.Ownername}}</el-card><br>
 <el-card>报修时间：{{this.ShowData.CreatedAt}}</el-card><br>
 <el-card>报修地点：{{this.ShowData.Address}}</el-card><br>
  <el-card>报修照片：
  <div class="demo-image__lazy">
  <el-image v-for="url in this.ShowData.ShowList" :key="url" :src="url" lazy></el-image>
</div>
</el-card><br>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
  </span>
</el-dialog>


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
      deleteRow(row){
          service.delete('/api/managerauth/repair/'+row.ID).then((response)=>{
                        console.log(response.data);
                         this.$message(response.data.result)
                         this.getData()
                }).catch((response)=>{
                    console.log(response);
                })
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
          DispathchRow(row){
            service.put('api/managerauth/repairdispatch',
            {
              Managername:row.Username,
              ID:this.DispatchRowId
            }).then((response)=>{
              this.$message(response.data.result); 
                      //如果修改成功  消失对话框
                      if(response.data.code==1)
                      {
                          this.dialogVisible2 = false
                          this.getData()
                      }
                }).catch((response)=>{
                    console.log(response);
                })
          },
          getData2(){
              service.get('/api/managerauth/managertotal?keyword='+this.keyword2).then((response)=>{
              console.log(response.data.data.count);
              this.total2 = response.data.data.count
          }).catch((response)=>{
              console.log(response);
          })
          service.get('/api/managerauth/managerpage?pageindex='+this.pageindex2+'&pagesize='+this.pagesize2+'&keyword='+this.keyword2).then((response)=>{
              this.tableData2 = response.data.data
                console.log(response.data.data);
          }).catch((response)=>{
              console.log(response);
          })
        },
         getData(){
                  service.get('/api/managerauth/repairtotal?keyword='+this.keyword).then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/repairpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize+'&keyword='+this.keyword).then((response)=>{
                    this.tableData = response.data.data
                      for(var i=0;i<this.tableData.length;i++){
                      if(this.tableData[i].Pics==""){
                        this.tableData[i].Pics=[]
                        continue;
                      }
                      this.tableData[i].Pics=JSON.parse(this.tableData[i].Pics)
                    }
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
             },
             page(currentpage){
            this.getData()
            },
              page2(currentpage){
                this.getData2()
            },
            ShowRow(row){
            this.ShowData.ShowList = row.Pics
            this.ShowData.Ownername = row.Ownername
            this.ShowData.Address = row.Address
            this.ShowData.CreatedAt = row.CreatedAt
            },
        },
        
        

        data(){
            return {
              keyword:"",
              keyword2:"",
                ShowData:{
                  ShowList:[],
                  Ownername:null,
                  Address:null,
                  CreatedAt:null,
                },
              dialogVisible: false,
              dialogVisible2: false,
              DispatchManager:null,
              DispatchRowId:null,
                total:200,
                tableData2:[],
                tableData:[],
                pageindex:1,
                pagesize:5,
                total2:200,
                pageindex2:1,
                pagesize2:5,
            }
        },
        created(){
            this.getData()
        },
}
</script>

<style>

</style>