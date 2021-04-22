<template>
  <div class="app-container">
<el-card>
    <div slot="header" class="clearfix">
        <span>上报报修</span>
    </div>

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="地址" prop="Address">
    <el-input placeholder="请输入地址" v-model="ruleForm.Address" ></el-input>
  </el-form-item>
<el-form-item label="保修原因" prop="Reason">
    <el-input placeholder="请输入保修原因" v-model="ruleForm.Reason"></el-input>
  </el-form-item>
  <el-form-item>
        <el-upload
        action="http://127.0.0.1:31717/api/qiniuup"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="fileList">
        <i class="el-icon-plus"></i>
        </el-upload>
    
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
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
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [],
        ruleForm: {
          Address: null,
          Reason: null,
          Ownername:localStorage.getItem("username"),
          Pics:String,
        },
        rules: {
          Address: [
            { required: true, message: '请输入地址', trigger: 'change' },
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
            console.log(this.fileList)
            var picsobj  =[]
            for(var i=0;i<this.fileList.length;i++){
              picsobj.push(this.fileList[i].url)
            }
            this.ruleForm.Pics = JSON.stringify(picsobj)
            console.log(JSON.parse(this.ruleForm.Pics))
             service.post('/api/ownerauth/repair',this.ruleForm).then((response)=>{
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
      handleSuccess(response, file, fileList){
          console.log(response)
            if(response.code==1){
                this.fileList.push({
                    name:response.data,
                    url:"http://qqdixuhr8.hd-bkt.clouddn.com/"+file.name,
                })
                console.log(this.fileList)
            }
        },
      handleRemove(file, fileList) {
        Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
        }
        return -1;
        };
        Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
        this.splice(index, 1);
        }
        };
        this.fileList.remove(file)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>