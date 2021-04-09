<template>
  <div class="dashboard-container">
    <div class="dashboard-text">welcome {{role}}: {{ name }}</div>
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
    if(Cookies.get("role")=="owner"){
      service.get("/api/ownerauth/owner/"+Cookies.get("ID"))
    }else{
      this.$message("请重新登陆")
      this.$router.push("/login")
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
