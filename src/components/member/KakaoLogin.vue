<script setup>
import { getToken, getUserInfo } from "@/api/member";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useLoading } from 'vue-loading-overlay'

const emit = defineEmits(["updateUserId"])
const router = useRouter()
const $loading = useLoading({})

onMounted(() => {
  const loader = $loading.show({
    color: '#1e30f3',
    loader: 'dots',
    // backgroundColor: '#000000',
    // opacity: 0.5,
    zIndex: 999
  })
  // oauth (w/spring security)
  // -- start
  getUserInfo(
    () => {
      // console.log(res.data)
      // sessionStorage.setItem("user_id",res.data.user_id)
      // sessionStorage.setItem("user_name",res.data.user_name)
      loader.hide()
      emit('updateUserId')
      router.push({name:'home'})
    },
    (err) => {
      console.log(err)
      // sessionStorage.clear()
      loader.hide()
      alert("다시 로그인해주세요.")
      router.push({ name:'login'})
    })
  // -- end

    // oauth (w/o spring security)
  // -- start
  // const code = new URLSearchParams(window.location.search).get('code')
  // // console.log("code >> ", code)
  // getToken(
  //   { code: code },
  //   () => {
  //     getUserInfo(
  //       ({ data }) => {
  //         // console.log(data.id)
  //         sessionStorage.setItem("user_id",data.user_id)
  //         sessionStorage.setItem("user_name",data.user_name)
  //         loader.hide()
  //         emit('updateUserId')
  //         router.push({name:'home'})
  //       },
  //       ({ err }) => {
  //         loader.hide()
  //         sessionStorage.clear()
  //         alert("다시 로그인해주세요.")
  //         router.push({ name:'login'})
  //       }
  //     )
  //   },
  //   ({ err }) => {
  //     loader.hide()
  //     sessionStorage.clear()
  //     alert("다시 로그인해주세요.")
  //     router.push({ name:'login'})
  //   })
  
  // -- end
})

</script>

<template>
  <div>
  </div>
</template>

<style scoped>

</style>