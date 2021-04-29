<template>
  <div class="app-container">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>查看公告</span>
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
          label="公告单号"
        />
        <el-table-column
          prop="Title"
          label="标题"
          width="120"
        />
        <el-table-column
          prop="UpdatedAt"
          label="公告时间"
          width="220"
        />
        <el-table-column
          prop="Text"
          label="公告内容"
          width="300"
        />
        <el-table-column
          prop="Managername"
          label="发布人"
          width="120"
        />

        <el-table-column
          label="操作"
          width="220"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click="ShowRow(scope.row),dialogVisible = true"
            >
              查看详情
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="EditRow(scope.row)"
            >
              编辑
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
      title="详情"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-card>公告标题：{{ this.ShowData.Title }}</el-card><br>
      <el-card>公告内容：{{ this.ShowData.Text }}</el-card><br>
      <el-card>公告时间：{{ this.ShowData.UpdatedAt }}</el-card><br>
      <el-card>发布人：{{ this.ShowData.Managername }}</el-card><br>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import service from "@/utils/request"
export default {

        data(){
            return {
                ShowData:{
                  Title:null,
                  UpdatedAt:null,
                  Text:null,
                  Managername:null,
                },
                dialogVisible:false,
                tableData:[],
            }
        },
        created(){
            this.getData()
        },
    methods:{
        EditRow(row){
          this.$router.push({name: 'AnnounceEdit', params: {announceid: row.ID}})
        },
        deleteRow(row){
          service.delete('/api/managerauth/announce/'+row.ID).then((response)=>{
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
        ShowRow(row){
          this.ShowData.Title = row.Title
          this.ShowData.UpdatedAt = row.UpdatedAt
          this.ShowData.Managername = row.Managername
          this.ShowData.Text = row.Text
        },
         getData(){
                service.get('/api/managerauth/announceall',).then((response)=>{
                  
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