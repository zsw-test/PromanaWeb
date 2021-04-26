<template>
  <div class="app-container">

<el-card>
    <div slot="header" class="clearfix">
        <span>购买停车卡</span>
    </div>
<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-Form">
  <el-form-item label="车牌号"  prop="Carnumber">
    <el-input v-model="form.Carnumber"></el-input>
  </el-form-item>
<el-form-item label="购买类型" prop="Cartype">
    <el-select v-model="form.Cartype" placeholder="请选择购买类型">
      <el-option label="月卡车 500元" value="月卡车"></el-option>
      <el-option label="年卡车 4000元" value="年卡车"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('form')">购买</el-button>
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
        form: {
          Carnumber: '',
          Cartype: '',
        },
         rules: {
          Carnumber: [
            { required: true, message: '请输入车牌号', trigger: 'blur' },
          ],
          Cartype: [
            { required: true, message: '请选择购买类型', trigger: 'blur' },
          ],
         },
      }
    },
     methods: {
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            service.post('/api/ownerauth/carinfo',this.form).then((response)=>{
              if(response.data.code==1)
              {
                   this.$message(response.data.result)
              }else{
                   this.$message(response.data.result)
              }
               console.log(response.data);
                }).catch((response)=>{
                    console.log(response.data);
                })
        console.log(this.form.carnumber);
          } else {
              this.$message('提交错误!');
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
  }
</script>