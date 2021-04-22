<template>
    <div class="app-container">
      <el-card>
    <div slot="header" class="clearfix">
        <span>识别人脸门禁</span>
    </div>
        <el-upload
        class="upload-demo"
        drag
        action="http://127.0.0.1:31717/api/qiniuup"
        multiple
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :file-list="fileList"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-card>
    </div>
</template>

<script>
import service from '@/utils/request';
  export default {
    data() {
      return {
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
        handleSuccess(response, file, fileList){
            console.log(response)
            if(response.code==1){
                this.fileList.push({
                    name:response.data,
                    url:"http://qqdixuhr8.hd-bkt.clouddn.com/"+file.name,
                })
                // 人脸搜索
                service.post("/api/facesearch",{
                    image:"http://qqdixuhr8.hd-bkt.clouddn.com/"+file.name,
                    username:localStorage.getItem("username")
                }).then((response)=>{
                    if(response.data.code==1)
                    {
                        var data=JSON.parse(response.data.data)
                        console.log(data)
                        if(data.error_msg=="SUCCESS"){
                          if(data.result.user_list[0].score>=80){
                            this.$message("识别成功！请进入")
                          }else{
                            this.$message("识别失败！相似度低于%80")
                          }
                        }else{
                          this.$message("人脸识别请求失败")
                        }
                        //this.$message("score:"+String(data.result.user_list[0].score))
                    }
                     console.log(response.data.data);
                     
                }).catch((response)=>{
                    console.log(response);
                })
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
    }
  }
</script>