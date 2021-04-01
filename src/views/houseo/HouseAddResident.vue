<template>
<div class="app-container">

 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="Name">
      <el-input placeholder="请输入姓名" v-model="ruleForm.Name" style="%80"></el-input>
    </el-form-item>
  <el-form-item label="年龄" prop="Age">
      <el-input placeholder="请输入年龄" v-model="ruleForm.Age" type="number"></el-input>
    </el-form-item>
  <el-form-item label="性别" prop="Sex">
      <el-input placeholder="请输入性别" v-model="ruleForm.Sex"></el-input>
  </el-form-item>
      <el-form-item label="工作" prop="Work">
      <el-input placeholder="请输入工作" v-model="ruleForm.Work" style="%80"></el-input>
    </el-form-item>
  <el-form-item label="身份证" prop="IdCard">
      <el-input placeholder="请输入身份证" v-model="ruleForm.IdCard" type="number"></el-input>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="CreateResident('ruleForm')">添加</el-button>
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
                Name: null,
                Age: null,
                Sex: null,
                Work:null,
                IdCard:null,
                HouseId:null,
              },
              rules: {
                Name: [
                  { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                Age: [
                  { required: true, message: '请输入年龄', trigger: 'change' },
                ],
                Sex: [
                  {required: true, message: '请输入性别', trigger: 'change' },
                ],
                Work: [
                  { required: false, message: '请输入工作', trigger: 'blur' },
                ],
                IdCard: [
                  { required: true, message: '请输入身份证', trigger: 'change' },
                  {min:18,max:18}
                ],
              },
      };
    },
    methods: {
      CreateResident(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
             this.ruleForm.Age=Number(this.ruleForm.Age)
            this.ruleForm.HouseId=Number(localStorage.getItem("Houseid"))
             service.post('/api/ownerauth/resident',this.ruleForm).then((response)=>{
                     console.log(response.data);
                      this.$message(response.data.result); 
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