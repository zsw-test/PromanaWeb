
<template>
  <div>

  <el-table
    :data="tableData"
    border
    style="width:100%">
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
export default {
   methods: {
     saveForm(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$axios.put('http://www.zsw.test:31717/api/manager/'+this.editForm.ID,this.editForm).then((response)=>{
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
         this.$axios.delete('http://www.zsw.test:31717/api/manager/'+this.removeID).then((response)=>{
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
                  this.$axios.get('http://www.zsw.test:31717/api/managerauth/managertotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://www.zsw.test:31717/api/managerauth/managerpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
      },
      page(currentpage){
                     this.$axios.get('http://www.zsw.test:31717/api/managerauth/managertotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                this.$axios.get('http://www.zsw.test:31717/api/managerauth/managerpage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
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
          Depart: '',
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