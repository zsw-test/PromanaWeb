<template>
  <div class="app-container">


<el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-Form">
  <el-form-item label="收件人" prop="Ownername">
    <el-input placeholder="请输入收件人" v-model="Form.Ownername" style="%80"></el-input>
  </el-form-item>
<el-form-item label="到达地点" prop="ExpressLocation">
    <el-input placeholder="请输入快件到达地点" v-model="Form.ExpressLocation"></el-input>
  </el-form-item>
<el-form-item label="联系电话" prop="Telephone">
    <el-input placeholder="请输入联系电话" v-model="Form.Telephone"></el-input>
  </el-form-item>
 <el-form-item label="类型" prop="ExpType">
    <el-input placeholder="请输入类型" v-model="Form.ExpType"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('Form')">录入</el-button>
    <el-button @click="resetForm('Form')">重置</el-button>
  </el-form-item>
</el-form>

 </div>
</template>
<script>
  export default {
    data() {
      return {
        Form: {
          Ownername: '',
          ExpressLocation: '',
          Telephone: '',
          ExpType: '',
        },
        rules: {
          Ownername: [
            { required: true, message: '请输入收件人', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          ExpressLocation: [
            { required: true, message: '请输入到达地点', trigger: 'change' }
          ],
          ExpType: [
            {required: true, message: '请输入类型', trigger: 'change' }
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
            
             this.$axios.post('http://127.0.0.1:31717/api/managerauth/expressage',this.Form).then((response)=>{
                     console.log(response.data);
                     if(response.data.code==1)
                     {
                        this.$message('录入成功!');
                     }else{
                          this.$message('录入失败!'+response.data.result);
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