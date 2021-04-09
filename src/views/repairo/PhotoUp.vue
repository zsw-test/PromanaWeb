<template>
    <div>
    <el-upload
    action="http://127.0.0.1:31717/api/qiniuup"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :file-list="fileList">
    <i class="el-icon-plus"></i>
    </el-upload>
    
    <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    </div>
</template>

<script>
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
            if(response.code==1){
                this.fileList.push({
                    name:response.data.data,
                    url:"http://qqdixuhr8.hd-bkt.clouddn.com/"+file.name,
                })
                
            }
        },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>