<template>
  <div class="app-container">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>发布公告</span>
      </div>
      <el-form
        ref="Form"
        :model="Form"
        :rules="rules"
        label-width="100px"
        class="demo-Form"
      >
        <el-form-item
          label="公告标题"
          prop="Title"
        >
          <el-input
            v-model="Form.Title"
            placeholder="请输入公告标题"
            style="%80"
          />
        </el-form-item>
        <el-form-item
          label="公告内容"
          prop="Text"
        >
          <el-input
            v-model="Form.Text"
            placeholder="请输入公告内容"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('Form')"
          >
            发布
          </el-button>
          <el-button @click="resetForm('Form')">
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
        Form: {
          Title: '',
          Text: '',
          Managername:localStorage.getItem("username")
        },
        rules: {
          Title: [
            { required: true, message: '请输入收件人', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          Text: [
            { required: true, message: '请输入到达地点', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
             service.post('/api/managerauth/announce',this.Form).then((response)=>{
                     console.log(response.data);
                     if(response.data.code==1)
                     {
                        this.$message('发布成功!');
                     }else{
                          this.$message('发布失败!'+response.data.result);
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