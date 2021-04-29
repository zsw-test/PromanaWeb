<template>
  <div class="app-container">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>修改公告</span>
      </div>

      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="标题"
          prop="Title"
        >
          <el-input
            v-model="ruleForm.Title"
            placeholder="标题"
          />
        </el-form-item>
        <el-form-item
          label="公告内容"
          prop="Text"
        >
          <el-input
            v-model="ruleForm.Text"
            placeholder="请输入内容"
          />
        </el-form-item>
  
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >
            立即修改
          </el-button>
          <el-button @click="resetForm('ruleForm')">
            重置
          </el-button>
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
          ID:null,
          Title: null,
          Text: null,
          Managername:null,
        },
        rules: {
          Title: [
            { required: true, message: '请输入标题', trigger: 'change' },
          ],
          Text: [
            { required: true, message: '请输入原因', trigger: 'change' },
          ],
        }
      };
    },
    created(){
        if(!this.$route.params.announceid) {
            this.$router.push("/AnnounceM/AnnounceAll")
            return 
        }
         service.get("api/managerauth/announce/"+this.$route.params.announceid).then((response)=>{
                    if(response.data.code==1){
                        console.log(response.data.data)
                        this.ruleForm.Title = response.data.data.Title
                        this.ruleForm.Text = response.data.data.Text
                        this.ruleForm.Managername = response.data.data.Managername
                        this.ruleForm.ID = response.data.data.ID
                    }
                    else{
                        this.$message("res code!=1 获取失败")
                    }
                     console.log(response.data);
                }).catch((response)=>{
                    console.log(response);
                })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             service.put('/api/managerauth/announce/'+this.ruleForm.ID,this.ruleForm).then((response)=>{
                     console.log(response.data);
                     if(response.data.code==1)
                    {
                        this.$message('修改成功!');
                     }else{
                          this.$message('修改失败!'+response.data.result);
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