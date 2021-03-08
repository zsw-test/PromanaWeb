<template>
 <div>

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="Username">
    <el-input placeholder="请输入用户名" v-model="ruleForm.Username" style="%80"></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="Password">
    <el-input placeholder="请输入密码" v-model="ruleForm.Password" show-password></el-input>
  </el-form-item>
    <el-form-item label="房间号" prop="Houseid">
    <el-input placeholder="请输入房产号" v-model="ruleForm.Houseid" type="number"></el-input>
  </el-form-item>
    <el-form-item label="联系电话" prop="Telephone">
    <el-input placeholder="请输入联系电话" v-model="ruleForm.Telephone" type="number"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>

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
          Houseid:null,
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
          Houseid: [
            {required: true, message: '请输入房间号', trigger: 'change' },
            
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
            this.ruleForm.Houseid = Number(this.ruleForm.Houseid)
             service.post('/api/ownerregister',this.ruleForm).then((response)=>{
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