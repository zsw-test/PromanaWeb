<template>
  <div class="app-container">
    <el-card style="margin-bottom: 18px;">
    <div>
        <span> {{'水量(L)： ' + this.Charge.Water }}</span>
        <el-button @click="dialogWater=true"  style="float: right; padding: 3px 0" type="text">缴费</el-button>
    </div>
    </el-card>
        <el-card style="margin-bottom: 18px;">
    <div>
        <span> {{'电量(度)： ' + this.Charge.Electric }}</span>
        <el-button @click="dialogElectric=true" style="float: right; padding: 3px 0" type="text">缴费</el-button>
    </div>
    </el-card>
        <el-card style="margin-bottom: 18px;">
    <div >
        <span> {{'燃气量(L)： ' + this.Charge.Gas }}</span>
        <el-button @click="dialogGas=true" style="float: right; padding: 3px 0" type="text">缴费</el-button>
    </div>
    </el-card>
        <el-card style="margin-bottom: 18px;">
    <div >
        <span> {{'物业费： ' + this.Charge.Property }}</span>
        <el-button @click="dialogProperty=true" style="float: right; padding: 3px 0" type="text">缴费</el-button>
    </div>
    </el-card>

<el-dialog :visible.sync="dialogWater">
  <el-form>
    <el-form-item label="金额">
      <el-input v-model="WaterFee" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="payWater">提交</el-button>
  </div>
</el-dialog>

<el-dialog :visible.sync="dialogElectric">
  <el-form>
    <el-form-item label="金额">
      <el-input v-model="ElectricFee" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="payElectric">提交</el-button>
  </div>
</el-dialog>

<el-dialog :visible.sync="dialogGas">
  <el-form>
    <el-form-item label="金额">
      <el-input v-model="GasFee" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="payGas">提交</el-button>
  </div>
</el-dialog>

<el-dialog :visible.sync="dialogProperty">
  <el-form>
    <el-form-item label="金额">
      <el-input v-model="PropertyFee" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="payProperty">提交</el-button>
  </div>
</el-dialog>
  </div>

</template>

<script>
import service from "@/utils/request"
export default {
    methods:{
              payGas(){
           service.post('/api/ownerauth/charge/'+localStorage.getItem("Houseid")+'/gas',{
             GasFee:Number(this.GasFee),
           }).then((response)=>{
                    if(response.data.code==1){
                        this.$message("缴费成功")
                        this.getData()
                    }else{
                      this.$message("缴费失败"+response.data.result)
                    }
                    this.dialogGas = false
                    console.log(response.data);
                }).catch((response)=>{
                    console.log(response);
                })
         },
              payProperty(){
           service.post('/api/ownerauth/charge/'+localStorage.getItem("Houseid")+'/property',{
             PropertyFee:Number(this.PropertyFee),
           }).then((response)=>{
                    if(response.data.code==1){
                        this.$message("缴费成功")
                        this.getData()
                    }else{
                      this.$message("缴费失败"+response.data.result)
                    }
                    this.dialogProperty = false
                    console.log(response.data);
                }).catch((response)=>{
                    console.log(response);
                })
         },
        payElectric(){
           service.post('/api/ownerauth/charge/'+localStorage.getItem("Houseid")+'/electric',{
             ElectricFee:Number(this.ElectricFee),
           }).then((response)=>{
                    if(response.data.code==1){
                        this.$message("缴费成功")
                        this.getData()
                    }else{
                      this.$message("缴费失败"+response.data.result)
                    }
                    this.dialogElectric = false
                    console.log(response.data);
                }).catch((response)=>{
                    console.log(response);
                })
         },
         payWater(){
           service.post('/api/ownerauth/charge/'+localStorage.getItem("Houseid")+'/water',{
             WaterFee:Number(this.WaterFee),
           }).then((response)=>{
                    if(response.data.code==1){
                        this.$message("缴费成功")
                        this.getData()
                    }else{
                      this.$message("缴费失败"+response.data.result)
                    }
                    this.dialogWater = false
                    console.log(response.data);
                }).catch((response)=>{
                    console.log(response);
                })
         },
         getData(){
                service.get('/api/ownerauth/charge/'+localStorage.getItem("Houseid")).then((response)=>{
                    if(response.data.code!=1){
                        this.$message("获取失败")
                    }
                    
                    this.Charge.Water = response.data.data.Water
                    this.Charge.Gas = response.data.data.Gas
                    this.Charge.Electric = response.data.data.Electric
                    this.Charge.Property = response.data.data.Property
                    console.log(this.Charge)
                }).catch((response)=>{
                    console.log(response);
                })
             },
        },

        data(){
            return {
                Charge:{
                  Water:null,
                  Property:null,
                  Gas:null,
                  Electric:null,
                },
                dialogWater:false,
                dialogElectric:false,
                dialogGas:false,
                dialogProperty:false,
                WaterFee:null,
                ElectricFee:null,
                GasFee:null,
                PropertyFee:null,
            }
        },
        created(){
            this.getData()
        },
}
</script>

<style>
</style>