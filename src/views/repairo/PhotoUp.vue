<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>上传照片</span>
      </div>
      <el-upload
        action="http://112.124.103.203:31717/api/qiniuup"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleSuccess(response, file, fileList) {
      if (response.code == 1) {
        this.fileList.push({
          name: response.data.data,
          url: "http://qtl9brbch.hd-bkt.clouddn.com/" + file.name,
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>