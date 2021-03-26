<template>
  <div class="dashboard-container">
    <div class="dashboard-text">welcome {{role}}: {{ name }}</div>
    <div class="dashboard-text">停车位数量： {{parkdata}}</div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import service from '@/utils/request'

export default {
  
  data(){
    return{
      role:Cookies.get("role"),
      name: Cookies.get("username"),
      parkdata:null,
    }
  },
  created(){
    service.get("/api/managerauth/parkallcount").then((response)=>{
                this.parkdata = response.data.data
                     console.log(response.data.data);
                }).catch((response)=>{
                    console.log(response);
                })
   if(Cookies.get("role")=="manager"){
      service.get("/api/managerauth/manager/"+Cookies.get("ID"))
    }else{
      this.$router.push("/404")
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
