<template>
  <div class="app-container">


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
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.ruleForm.Ownerid = Number(this.ruleForm.Ownerid)
                this.ruleForm.Status = Number(this.ruleForm.Status)
             service.post('/api/managerauth/park',this.ruleForm).then((response)=>{
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