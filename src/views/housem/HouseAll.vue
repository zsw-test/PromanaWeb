
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
      label="房屋ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Building"
      label="楼栋号码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Unit"
      label="单元号码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="Door"
      label="门牌号"
      width="120">
    </el-table-column>
        <el-table-column
      prop="Area"
      label="面积"
      width="120">
    </el-table-column>
  <el-table-column
      prop="Prorityright"
      label="产权"
      width="120">
    </el-table-column>
  <el-table-column
      prop="HouseType"
      label="户型"
      width="120">
    </el-table-column>
      <el-table-column
      prop="Ownerid"
      label="业主ID"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="250">
      <template slot-scope="scope">
        <el-button @click="showRow(scope.row),dialogVisible3 = true" type="text" size="small">查看成员</el-button>
        <el-button @click="editRow(scope.row),dialogVisible2 = true" type="primary" size="small">编辑</el-button>
       
        <el-button @click="setremoveRowID(scope.row),dialogVisible = true" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 查看提示框 -->
  <el-dialog
        title="查看"
        :visible.sync="dialogVisible3"
        width="50%" >
          <el-table
              :data="showData"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row>
              <el-table-column
                prop="Name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="Sex"
                label="性别"
                width="120">
              </el-table-column>
              <el-table-column
                prop="IdCard"
                label="身份证号"
                width="120">
              </el-table-column>
               <el-table-column
                prop="Work"
                label="工作"
                width="120">
              </el-table-column>
          </el-table>
          <el-button type="primary" @click="dialogVisible3 = false" >确 定</el-button>
      </el-dialog>
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
    <el-form-item label="产权" prop="Prorityright">
      <el-input placeholder="请输入产权" v-model="ruleForm.Prorityright" style="%80" type="number"></el-input>
    </el-form-item>
  <el-form-item label="户型" prop="HouseType">
      <el-input placeholder="请输入户型" v-model="ruleForm.HouseType"></el-input>
    </el-form-item>
  <el-form-item label="业主ID" prop="Ownerid">
      <el-input placeholder="请输入业主ID" v-model="ruleForm.Ownerid"></el-input>
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
     showRow(row){
       service.get('/api/managerauth/residenthousepage/'+row.ID+"?pageindex=0&pagesize=100").then((response)=>{
          console.log(response);
          this.showData = response.data.data
        }).catch((response)=>{
            console.log(response);
        })

     },
     saveForm(formName){
       this.$refs[formName].validate((valid) => {
          if (valid) {
             this.ruleForm.Ownerid=Number(this.ruleForm.Ownerid)
             service.put('/api/managerauth/house/'+this.ruleForm.ID,this.ruleForm).then((response)=>{
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
         service.delete('/api/managerauth/house/'+this.removeID).then((response)=>{
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
                  service.get('/api/managerauth/housetotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/housepage?pageindex='+this.pageindex+'&pagesize='+this.pagesize).then((response)=>{
                    this.tableData = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
      },
      page(currentpage){
                     service.get('/api/managerauth/housetotal').then((response)=>{
                        console.log(response.data.data.count);
                    this.total = response.data.data.count
                }).catch((response)=>{
                    console.log(response);
                })
                service.get('/api/managerauth/housepage?pageindex='+currentpage+'&pagesize='+this.pagesize).then((response)=>{
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
        showData:[],
        dialogVisible2:false,
        ruleForm: {
          ID:null,
          Prorityright: null,
          HouseType: null,
          Ownerid: null,
        },
        rules: {
          Prorityright: [
            { required: false, message: '请输入产权', trigger: 'blur' },
          ],
          HouseType: [
            { required: false, message: '请输入房型', trigger: 'change' },
          ],
          Ownerid: [
            {required: true, message: '请输入业主ID', trigger: 'change' },
          ]
        },
        
        removeID:null,
        editID:null,
         dialogVisible: false,
         dialogVisible3: false,
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