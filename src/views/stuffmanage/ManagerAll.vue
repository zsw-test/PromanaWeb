
<template>
  <div class="app-container">

<el-card>
    <div slot="header" class="clearfix">
        <span>管理员列表</span>
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
      label="Id"
      >
    </el-table-column>
    <el-table-column
      prop="Username"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Nickname"
      label="昵称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="CreatedAt"
      label="创建时间"
      width="300">
    </el-table-column>
    <el-table-column
      prop="Depart"
      label="部门"
      width="120">
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

       <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="Username">
        <el-input placeholder="请输入用户名" v-model="editForm.Username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="Nickname">
        <el-input placeholder="请输入昵称" v-model="editForm.Nickname"></el-input>
      </el-form-item>
        <el-form-item label="密码" prop="Password">
        <el-input placeholder="请输入密码" v-model="editForm.Password" show-password></el-input>
      </el-form-item>
        <el-form-item label="部门" prop="Depart">
        <el-input placeholder="请输入部门" v-model="editForm.Depart"></el-input>
      </el-form-item>
        <el-form-item label="联系电话" prop="Telephone">
        <el-input placeholder="请输入联系电话" v-model="editForm.Telephone" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm('editForm')">保存</el-button>
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
            
             service.put('api/managerauth/manager/'+this.editForm.ID,this.editForm).then((response)=>{
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
         service.delete('/api/managerauth/manager/'+this.removeID).then((response)=>{
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

                  service.get('/api/managerauth/managertotal?keyword='+this.keyword,).then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/managerpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize+'&keyword='+this.keyword).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
      },
      change(){
      this.$forceUpdate()
      },
      page(currentpage){
                  this.getData()
      },
    },
    created(){
                   this.getData()
    },

    data() {
      return {
        keyword:"",
        dialogVisible2:false,
        editForm:{
          Username: '',
          Password: '',
          Nickname:'',
          Depart: '',
          Telephone: '',
        },
        rules: {
          Nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
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
        keyword:'',
    }
   
}
}
    

</script>

<style>

</style>