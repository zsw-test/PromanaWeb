<template>
  <div class="app-container">

 
<el-form :model="Form" :rules="rules" ref="Form" label-width="100px" class="demo-Form">
  <el-form-item label="车牌号" prop="carnumber">
    <el-input placeholder="车牌号" v-model="Form.carnumber" style="%80"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="ParkInfoIn('Form')">入库</el-button>
     <el-button type="primary" @click="ParkInfoOut('Form'),dialogVisible = true">结算费用缴纳</el-button>
    <el-button type="primary" @click="ParkInfoDelete('Form')">出库</el-button>
  </el-form-item>
</el-form>



<!-- 显示停车信息的页面 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
 <el-card>停车时长：{{ParkinfoData.Parktime}}</el-card><br>
 <el-card>费用：{{ParkinfoData.Fee}}元</el-card><br>
  <el-card>微信支付：
    <el-image  :src="require('@/assets/404_images/404.png')"></el-image>
    </el-card><br>
  
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">缴费完成</el-button>
  </span>
</el-dialog>


  </div>
</template>

<script>
import service from "@/utils/request"
export default {
    data() {
      return {
        ParkinfoData:{},
        dialogVisible:false,
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
       ParkInfoDelete(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            service.delete('/api/ownerauth/parkinfo/'+this.Form.carnumber).then((response)=>{
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
         ParkInfoIn(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            service.post('/api/ownerauth/parkinfo/'+this.Form.carnumber).then((response)=>{
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
            service.get('/api/ownerauth/parkinfo/'+this.Form.carnumber).then((response)=>{
              if(response.data.code==1)
              {
                  this.ParkinfoData = response.data.data
                     this.$message(String(response.data.data.Fee))
              }else{
                   this.$message(response.data.result)
              }
              console.log(response.data);
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
    },
}
</script>

<style>

</style>