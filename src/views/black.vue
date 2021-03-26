<template>
  
</template>

<script>
export default {
    data(){
        if(localStorage.getItem("role")=="owner"){
            this.$router.replace({
            path:'/homeO',
            })
        }else{
            this.$router.replace({
            path:'/homeM',
            })
        }
        
        return {

        }
    },
    created(){
        location.reload()
    }
}
</script>

<style>

</style>