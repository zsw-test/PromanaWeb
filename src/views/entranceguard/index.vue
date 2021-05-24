<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>上传人脸图片</span>
      </div>
      <el-upload
        class="upload-demo"
        action="http://112.124.103.203:31717/api/qiniuup"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
import service from "@/utils/request";
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
      console.log(response);
      if (response.code == 1) {
        this.fileList.push({
          name: response.data,
          url: "http://qtl9brbch.hd-bkt.clouddn.com/" + file.name,
        });
        // 人脸注册
        service
          .post("/api/faceadd", {
            image: "http://qtl9brbch.hd-bkt.clouddn.com/" + file.name,
            username: localStorage.getItem("username"),
          })
          .then((response) => {
            if (response.data.code == 1) {
              var err = JSON.parse(response.data.data);
              this.$message(err.error_msg);
            }
            console.log(response.data.data);
          })
          .catch((response) => {
            console.log(response);
          });
      }
    },
    handleRemove(file, fileList) {
      Array.prototype.indexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) return i;
        }
        return -1;
      };
      Array.prototype.remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      this.fileList.remove(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlePreview(file) {
      console.log(file);
      console.log(this.fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
  },
};
</script>