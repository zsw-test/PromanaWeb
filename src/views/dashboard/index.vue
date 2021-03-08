<template>
  <div class="dashboard-container">
    <div class="dashboard-text">welcome {{role}}: {{ name }}</div>
    
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  
  data(){
    return{
      role:Cookies.get("role"),
      name: Cookies.get("username"),
    }
  }
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
