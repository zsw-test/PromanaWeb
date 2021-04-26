<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>获取车辆信息</span>
    </div>

<el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-Form">
  <el-form-item label="车牌号" prop="carnumber">
    <el-input placeholder="车牌号" v-model="Form.carnumber" style="%80"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('Form')">查询</el-button>
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
        Form: {
          carnumber: '',
        },
        rules: {
          carnumber: [
            { required: true, message: '请输入车牌号', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            service.get('/api/ownerauth/carinfo/'+this.Form.carnumber).then((response)=>{
              if(response.data.code==1)
              {
                   this.$message("车辆类型:"+response.data.data.CarType)
              }else{
                   this.$message(response.data.result)
              }
                }).catch((response)=>{
                    console.log(response.data);
                })
        console.log(this.Form.carnumber);
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

<style>

</style>