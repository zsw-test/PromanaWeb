<template>
  <div class="app-container">
    <el-card>
    <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
    </div>
    <div class="text item">
        {{'列表内容 ' + this.Charge.Water }}
    </div>
    </el-card>
  </div>

</template>

<script>
import service from "@/utils/request"
export default {
    methods:{
         getData(){
                service.get('/api/ownerauth/charge/'+localStorage.getItem("Houseid")).then((response)=>{
                    if(response.data.code!=1){
                        this.$message("获取失败")
                    }
                    console.log(response.data)
                    this.Charge = response.data.data
                }).catch((response)=>{
                    console.log(response);
                })
             },
        },

        data(){
            return {
                Charge:Object,
            }
        },
        created(){
            this.getData()
        },
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>