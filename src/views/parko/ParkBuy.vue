<template>
  <div class="app-container">

<el-card>
    <div slot="header" class="clearfix">
        <span>购买停车位</span>
    </div>
<el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-Form">
<el-form-item label="绑定车辆" prop="Carnumber">
  <el-input v-model="form.Carnumber"></el-input>
  </el-form-item>
  <el-form-item label="选择车位" prop="ParkId">
    <el-select v-model="form.ParkId" placeholder="请选择车位">
      <el-option v-for="item in ParkList" :key="item.ID" :label="item.Location" :value="item.ID"></el-option>
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
        created(){
            this.getParklist()
        },
    data() {
      return {
        ParkList:[],
        form: {
          Ownerid: null,
          Carnumber: '',
          ParkId:null,
        },
         rules: {
          Carnumber: [
            { required: true, message: '请输入绑定车辆', trigger: 'blur' },
          ],
          ParkId: [
            { required: true, message: '请输入绑定车辆', trigger: 'blur' },
          ],
         },
      }
    },
     methods: {
       getParklist(){
             service.get('/api/ownerauth/park').then((response)=>{
                        console.log(response.data.data);
                    this.ParkList = response.data.data
                }).catch((response)=>{
                    console.log(response);
                })
       },
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.Ownerid = new Number(localStorage.getItem("ID")) 
            service.post('/api/ownerauth/parkbuy',this.form).then((response)=>{
              if(response.data.code==1)
              {
                   this.$message(response.data.result)
                   this.getParklist()
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