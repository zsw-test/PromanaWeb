<template>
  <div class="app-container">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>所有投诉</span>
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
          label="投诉单号"
        />
        <el-table-column
          prop="Depart"
          label="投诉部门"
          width="120"
        />
        <el-table-column
          prop="CreatedAt"
          label="投诉时间"
          width="220"
        />
        <el-table-column
          prop="Reason"
          label="投诉原因"
          width="300"
        />
        <el-table-column
          prop="Managername"
          label="解决人员"
          width="120"
        />
        <el-table-column
          prop="Ownername"
          label="业主姓名"
          width="120"
        />
        <el-table-column
          prop="Status"
          label="状态"
          width="120"
        />
        <el-table-column
          prop="Resolve"
          label="解决"
          :formatter="formatBoolean"
          width="120"
        />
        <el-table-column
          label="操作"
          width="250"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="ShowRow(scope.row),dialogVisible2 = true"
            >
              查看详情
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="getData2(),dialogVisible = true,DispatchRowId=scope.row.ID"
            >
              派人维修
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteRow(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="派人维修"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-table
        :data="tableData2"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          prop="Username"
          label="用户名"
        />
        <el-table-column
          prop="Depart"
          label="投诉部门"
          width="100"
        />
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="DispathchRow(scope.row),dialogVisible = false"
            >
              派遣
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size.sync="pagesize2"
        :current-page.sync="pageindex2"
        :total="total2"
        @current-change="page2"
      />
    </el-dialog>


    <el-dialog
      title="详情"
      :visible.sync="dialogVisible2"
      width="50%"
    >
      <el-card>投诉人：{{ this.ShowData.Ownername }}</el-card><br>
      <el-card>投诉时间：{{ this.ShowData.CreatedAt }}</el-card><br>
      <el-card>投诉部门：{{ this.ShowData.Depart }}</el-card><br>
      <el-card>投诉原因：{{ this.ShowData.Reason }}</el-card><br>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible2 = false"
        >确 定</el-button>
      </span>
    </el-dialog>


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
                ShowData:{
                  Reason:null,
                  Ownername:null,
                  Depart:null,
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
    methods:{
      deleteRow(row){
          service.delete('/api/managerauth/complaint/'+row.ID).then((response)=>{
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
            service.put('api/managerauth/complaintdispatch',
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
              service.get('/api/managerauth/managertotal',).then((response)=>{
              console.log(response.data.data.count);
              this.total2 = response.data.data.count
          }).catch((response)=>{
              console.log(response);
          })
          service.get('/api/managerauth/managerpage?pageindex='+this.pageindex2+'&pagesize='+this.pagesize2).then((response)=>{
              this.tableData2 = response.data.data
                console.log(response.data.data);
          }).catch((response)=>{
              console.log(response);
          })
        },
         getData(){
                  service.get('/api/managerauth/complainttotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/complaintpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
             },
             page(){
            this.getData()
            },
              page2(){
                this.getData2()
            },
            ShowRow(row){
            this.ShowData.Reason = row.Reason
            this.ShowData.Ownername = row.Ownername
            this.ShowData.Depart = row.Depart
            this.ShowData.CreatedAt = row.CreatedAt
            },
        },
}
</script>

<style>

</style>