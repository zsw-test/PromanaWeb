<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>添加管理员</span>
    </div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="Username">
    <el-input placeholder="请输入用户名" v-model="ruleForm.Username" style="%80"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="Password">
    <el-input placeholder="请输入密码" v-model="ruleForm.Password" show-password></el-input>
  </el-form-item>
      <el-form-item label="昵称" prop="Nickname">
    <el-input placeholder="请输入昵称" v-model="ruleForm.Nickname"></el-input>
  </el-form-item>
    <el-form-item label="部门" prop="Depart">
    <el-input placeholder="请输入部门" v-model="ruleForm.Depart"></el-input>
  </el-form-item>
    <el-form-item label="联系电话" prop="Telephone">
    <el-input placeholder="请输入联系电话" v-model="ruleForm.Telephone" type="number" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-card>
 </div>
</template>
<script>
import service from "@/utils/request"
  export default {
    data() {
      return {
        ruleForm: {
          Username: '',
          Password: '',
          Depart: '',
          Telephone: '',
          Nickname:'',
        },
        rules: {
          Nickname: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
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
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
             service.post('/api/managerregister',this.ruleForm).then((response)=>{
                     console.log(response.data);
                     if(response.data.code==1)
                     {
                        this.$message('添加成功!');
                     }else{
                          this.$message('添加失败!'+response.data.result);
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>