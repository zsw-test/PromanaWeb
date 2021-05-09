<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>投诉</span>
    </div>

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="投诉部门" prop="Depart">
    <el-input placeholder="请输入投诉部门" v-model="ruleForm.Depart" ></el-input>
  </el-form-item>
<el-form-item label="投诉原因" prop="Reason">
    <el-input placeholder="请输入投诉原因" v-model="ruleForm.Reason"></el-input>
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
          Depart: null,
          Reason: null,
          Ownername:localStorage.getItem("username"),
        },
        rules: {
          Depart: [
            { required: true, message: '请输入部门', trigger: 'change' },
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
             service.post('/api/ownerauth/complaint',this.ruleForm).then((response)=>{
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
      },
    }
  }
</script>