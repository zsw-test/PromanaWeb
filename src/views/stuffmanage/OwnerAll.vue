
<template>
  <div class="app-container">

  <el-table
    :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="ID"
      label="Id"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Password"
      label="密码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="创建时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="Telephone"
      label="电话"
      width="120">
    </el-table-column>
     <el-table-column
      prop="Houseid"
      label="房间号"
      width="120">
    </el-table-column>
        <el-table-column
      prop="ParkId"
      label="车位号"
      width="120">
    </el-table-column>
    
    <el-table-column
      label="操作"
      width="300">
      <template slot-scope="scope">
         <el-button @click="untiePark(scope.row)" type="primary" size="small">解绑车位</el-button>
        <el-button @click="editRow(scope.row),dialogVisible2 = true" type="primary" size="medium">编辑</el-button>
        <el-button @click="setremoveRowID(scope.row),dialogVisible = true" type="danger" size="medium">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
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

       <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="Username">
    <el-input placeholder="请输入用户名" v-model="editForm.Username" style="%80"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="Password">
    <el-input placeholder="请输入密码" v-model="editForm.Password" show-password></el-input>
  </el-form-item>
    <el-form-item label="房间号" prop="Houseid">
    <el-input placeholder="请输入房产号" v-model="editForm.Houseid" type="number"></el-input>
  </el-form-item>
    <el-form-item label="联系电话" prop="Telephone">
    <el-input placeholder="请输入联系电话" v-model="editForm.Telephone" type="number"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
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
import service from "@/utils/request"
/* eslint-disable */ 
export default {
   methods: {
     untiePark(row){
       if(row.ParkId==0){
         this.$message("该用户没有车位！")
         return 
       }
         service.delete('/api/managerauth/owneruntiepark/'+row.ID).then((response)=>{
                        console.log(response.data);
                         this.$message(response.data.result)
                         this.getData()
                }).catch((response)=>{
                    console.log(response);
                })
     },
     saveForm(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
             service.put('/api/managerauth/owner/'+this.editForm.ID,this.editForm).then((response)=>{
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
        this.editForm = row
     },
      removeRow() {
         service.delete('/api/managerauth/owner/'+this.removeID).then((response)=>{
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
      handleClick(row) {
        console.log(row);
      },
      getData(){
                  service.get('/api/managerauth/ownertotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('api/managerauth/ownerpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
      },
      page(currentpage){
                     service.get('/api/managerauth/ownertotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/ownerpage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
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
        editForm:{
        Username: '',
          Password: '',
          Houseid:new Number,
          Telephone: '',
        },
        rules: {
          Username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          Password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
          Depart: [
            {required: true, message: '请输入部门', trigger: 'change' }
          ],
          Telephone: [
            {required: true, message: '请输入电话', trigger: 'change' },
              { min: 11, max: 11, message: '长度为 11个字符', trigger: 'blur' }
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