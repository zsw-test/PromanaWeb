
<template>
  <div class="app-container">

  <el-table
    :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
    <el-table-column
      prop="ID"
      label="住户ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Age"
      label="年龄"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Sex"
      label="性别"
      width="120">
    </el-table-column>
        <el-table-column
      prop="Work"
      label="工作"
      width="120">
    </el-table-column>
  <el-table-column
      prop="IdCard"
      label="身份证号"
      width="120">
    </el-table-column>
  <el-table-column
      prop="HouseId"
      label="房屋ID"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="editRow(scope.row),dialogVisible2 = true" type="primary" size="medium">编辑</el-button>
        <el-button @click="setremoveRowID(scope.row),dialogVisible = true" type="danger" size="medium">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <!-- 删除提醒 -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%" >
        <span>确认删除?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="removeRow(),dialogVisible = false" >确 定</el-button>
        </span>
      </el-dialog>

<!-- 修改页面的dialog -->
    <el-dialog
        title="修改"
        :visible.sync="dialogVisible2"
        width="50%" >

  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="姓名" prop="Name">
      <el-input placeholder="请输入姓名" v-model="ruleForm.Name" style="%80"></el-input>
    </el-form-item>
  <el-form-item label="年龄" prop="Age">
      <el-input placeholder="请输入年龄" v-model="ruleForm.Age" type="number"></el-input>
    </el-form-item>
  <el-form-item label="性别" prop="Sex">
      <el-input placeholder="请输入性别" v-model="ruleForm.Sex"></el-input>
  </el-form-item>
      <el-form-item label="工作" prop="Work">
      <el-input placeholder="请输入工作" v-model="ruleForm.Work" style="%80"></el-input>
    </el-form-item>
  <el-form-item label="身份证" prop="IdCard">
      <el-input placeholder="请输入身份证" v-model="ruleForm.IdCard" type="number"></el-input>
    </el-form-item>
  <el-form-item label="房屋ID" prop="HouseId">
      <el-input placeholder="请输入房屋ID" v-model="ruleForm.HouseId"  type="number"></el-input>
  </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
         <el-button @click="dialogVisible2 = false">取 消</el-button>
      </el-form-item>
    </el-form>

      </el-dialog>


<el-pagination
  background
  layout="prev, pager, next"
  :page-size.sync=pagesize
  :current-page.sync=pageindex
  :total=total
  @current-change="page">
</el-pagination>



  </div>
</template>

<script>
import service from "@/utils/request"
/* eslint-disable */ 
export default {
   methods: {
     saveForm(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
             this.ruleForm.Age=Number(this.ruleForm.Age)
            this.ruleForm.HouseId=Number(this.ruleForm.HouseId)
             service.put('/api/managerauth/resident/'+this.ruleForm.ID,this.ruleForm).then((response)=>{
                     console.log(response.data);
                      this.$message(response.data.result); 
                      //如果修改成功  消失对话框
                      if(response.data.code==1)
                      {
                          this.dialogVisible2 = false
                          this.getData()
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
     editRow(row){
        this.ruleForm = row
     },
      removeRow() {
         service.delete('/api/managerauth/resident/'+this.removeID).then((response)=>{
                        console.log(response.data);
                         this.$message(response.data.result)
                         this.getData()
                }).catch((response)=>{
                    console.log(response);
                })

      },
      setremoveRowID(row){
         this.removeID = row.ID
      },
      getData(){
                  service.get('/api/managerauth/residenttotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/residentpage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
      },
      page(currentpage){
                     service.get('/api/managerauth/residenttotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/residentpage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response);
                }).catch((response)=>{
                    console.log(response);
                })
      },
    },
    created(){
                   this.getData()
    },

    data() {
      return {
        dialogVisible2:false,
        ruleForm: {
          ID:null,
          Name: null,
          Age: null,
          Sex: null,
          Work:null,
          IdCard:null,
          HouseId:null,
        },
        rules: {
          Name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          Age: [
            { required: true, message: '请输入年龄', trigger: 'change' },
          ],
          Sex: [
            {required: true, message: '请输入性别', trigger: 'change' },
          ],
          Work: [
            { required: false, message: '请输入工作', trigger: 'blur' },
          ],
          IdCard: [
            { required: true, message: '请输入身份证', trigger: 'change' },
            {min:18,max:18}
          ],
          HouseId: [
            {required: true, message: '请输入房屋ID', trigger: 'change' },
          ]
        },
        
        removeID:null,
        editID:null,
         dialogVisible: false,
        total:200,
        tableData:[],
        pageindex:1,
        pagesize:5,
    }
   
}
}
    

</script>

<style>

</style>