<template>
  <div>
<el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-Form">
  <el-form-item label="车牌号" prop="carnumber">
    <el-input placeholder="车牌号" v-model="Form.carnumber" style="%80"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="ParkInfoIn('Form')">入库</el-button>
    <el-button type="primary" @click="ParkInfoOut('Form')">出库</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
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
         ParkInfoIn(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('http://www.zsw.test:31717/api/ownerauth/parkinfo/'+this.Form.carnumber).then((response)=>{
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

          } else {
              this.$message('提交错误!');
            console.log('error submit!!');
            return false;
          }
        });
      },
         ParkInfoOut(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.get('http://www.zsw.test:31717/api/ownerauth/parkinfo/'+this.Form.carnumber).then((response)=>{
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