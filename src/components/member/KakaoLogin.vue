<script setup>
import { getUserInfo } from "@/api/member";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["updateUserId"])
const router = useRouter()

onMounted(() => {
  getUserInfo(
    (res) => {
      console.log(res.data)
      sessionStorage.setItem("user_id",res.data.user_id)
      sessionStorage.setItem("user_name",res.data.user_name)
      emit('updateUserId')
      router.push({name:'home'})
    },
    (err) => {
      console.log(err)
      sessionStorage.clear()
      alert("다시 로그인해주세요.")
      router.push({ name:'login'})
    })
})

</script>

<template>
  <div>
    processing...
  </div>
</template>

<style scoped>

</style>