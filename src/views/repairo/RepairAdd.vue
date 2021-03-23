<template>
  <div class="app-container">


<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="地址" prop="Address">
    <el-input placeholder="请输入地址" v-model="ruleForm.Address" ></el-input>
  </el-form-item>
<el-form-item label="保修原因" prop="Reason">
    <el-input placeholder="请输入保修原因" v-model="ruleForm.Reason"></el-input>
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
          Address: null,
          Reason: null,
          Ownername:localStorage.getItem("username")
        },
        rules: {
          Address: [
            { required: true, message: '请输入地址', trigger: 'change' },
          ],
          Reason: [
            { required: true, message: '请输入原因', trigger: 'change' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             service.post('/api/ownerauth/repair',this.ruleForm).then((response)=>{
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