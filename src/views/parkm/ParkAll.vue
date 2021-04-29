
<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>所有车位</span>
    </div>
  <el-table
    :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="ID"
      label="车位ID"
      >
    </el-table-column>
    <el-table-column
      prop="Ownerid"
      label="业主ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Status"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Location"
      label="位置"
      width="300">
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="editRow(scope.row),dialogVisible2 = true" type="primary" size="medium">编辑</el-button>
        <el-button @click="setremoveRowID(scope.row),dialogVisible = true" type="danger" size="medium">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-card>
    <!-- 删除提醒 -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%" >
        <span>确认删除?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="removeRow(),dialogVisible = false" >确 定</el-button>
        </span>
      </el-dialog>

<!-- 修改页面的dialog -->
    <el-dialog
        title="修改"
        :visible.sync="dialogVisible2"
        width="50%" >

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="业主ID" prop="Ownerid">
      <el-input placeholder="请输入业主ID" v-model="ruleForm.Ownerid" style="%80" type="number"></el-input>
    </el-form-item>
  <el-form-item label="状态" prop="Status">
      <el-input placeholder="请输入状态" v-model="ruleForm.Status" type="number"></el-input>
    </el-form-item>
  <el-form-item label="位置" prop="Location">
      <el-input placeholder="请输入位置" v-model="ruleForm.Location"></el-input>
  </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
         <el-button @click="dialogVisible2 = false">取 消</el-button>
      </el-form-item>
    </el-form>

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
/* eslint-disable */ 
import service from "@/utils/request"
export default {
  
   methods: {
     saveForm(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
             service.put('/api/managerauth/park/'+this.ruleForm.ID,this.ruleForm).then((response)=>{
                     console.log(response.data);
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
          } else {
              this.$message('提交错误!');
            console.log('error submit!!');
            return false;
          }
        });
     },
     editRow(row){
        this.ruleForm = row
     },
      removeRow() {
         service.delete('/api/managerauth/park/'+this.removeID).then((response)=>{
                        console.log(response.data);
                         this.$message(response.data.result)
                         this.getData()
                }).catch((response)=>{
                    console.log(response);
                })

      },
      setremoveRowID(row){
         this.removeID = row.ID
      },
      getData(){
                  service.get('/api/managerauth/parktotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/parkpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
      },
      page(currentpage){
                     service.get('/api/managerauth/parktotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/parkpage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response);
                }).catch((response)=>{
                    console.log(response);
                })
      },
    },
    created(){
                   this.getData()
    },

    data() {
      return {
        dialogVisible2:false,
        ruleForm: {
          Ownerid: null,
          Status: null,
          Location: '',
        },
        rules: {
          Ownerid: [
            { required: false, message: '请输入用户名', trigger: 'blur' },
          ],
          Status: [
            { required: false, message: '请输入密码', trigger: 'change' },
          ],
          Location: [
            {required: true, message: '请输入位置', trigger: 'change' },
          ]
        },
        
        removeID:null,
        editID:null,
         dialogVisible: false,
        total:200,
        tableData:[],
        pageindex:1,
        pagesize:5,
    }
   
}
}
    

</script>

<style>

</style>