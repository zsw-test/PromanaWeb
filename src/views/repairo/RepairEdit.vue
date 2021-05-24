<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>修改报修</span>
      </div>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="地址" prop="Address">
          <el-input
            placeholder="请输入地址"
            v-model="ruleForm.Address"
          ></el-input>
        </el-form-item>
        <el-form-item label="报修原因" prop="Reason">
          <el-input
            placeholder="请输入报修原因"
            v-model="ruleForm.Reason"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            action="http://112.124.103.203:31717/api/qiniuup"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即修改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import service from "@/utils/request";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],

      ruleForm: {
        ID: null,
        Address: null,
        Reason: null,
        Ownername: null,
        Pics: String,
      },
      rules: {
        Address: [{ required: true, message: "请输入地址", trigger: "change" }],
        Reason: [{ required: true, message: "请输入原因", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.fileList);
          var picsobj = [];
          for (var i = 0; i < this.fileList.length; i++) {
            picsobj.push(this.fileList[i].url);
          }
          this.ruleForm.Pics = JSON.stringify(picsobj);
          console.log(JSON.parse(this.ruleForm.Pics));
          service
            .put("/api/ownerauth/repair/" + this.ruleForm.ID, this.ruleForm)
            .then((response) => {
              console.log(response.data);
              if (response.data.code == 1) {
                this.$message("修改成功!");
              } else {
                this.$message("修改失败!" + response.data.result);
              }
            })
            .catch((response) => {
              console.log(response);
            });
        } else {
          this.$message("提交错误!");
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == 1) {
        this.fileList.push({
          name: response.data,
          url: "http://qtl9brbch.hd-bkt.clouddn.com/" + file.name,
        });
        console.log(this.fileList);
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
  },
  created() {
    if (!this.$route.params.repairid) {
      this.$router.push("/RepairO/RepairGet");
      return;
    }
    service
      .get("api/ownerauth/repair/" + this.$route.params.repairid)
      .then((response) => {
        if (response.data.code == 1) {
          console.log(response.data.data);
          this.ruleForm.Address = response.data.data.Address;
          this.ruleForm.Reason = response.data.data.Reason;
          this.ruleForm.Ownername = response.data.data.Ownername;
          this.ruleForm.ID = response.data.data.ID;
          if (response.data.data.Pics == "") {
            this.ruleForm.Pics = [];
          } else {
            this.ruleForm.Pics = JSON.parse(response.data.data.Pics);
          }
          for (var i = 0; i < this.ruleForm.Pics.length; i++) {
            this.fileList.push({
              name: this.ruleForm.Pics[i],
              url: this.ruleForm.Pics[i],
            });
          }
          console.log(this.fileList);
        } else {
          this.$message("res code!=1 获取失败");
        }
        console.log(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  },
};
</script>