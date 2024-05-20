<script setup>
import { onMounted, ref } from "vue";
import { listArticle } from "@/api/board.js"
import { useRouter } from "vue-router";
import { useLoading } from 'vue-loading-overlay'
const { VITE_EXPIRED_REFRESH_TOKEN } = import.meta.env

const $loading = useLoading({
})
  
onMounted(() => {
  getArticleList()
})

const articles = ref([])
const params = {}
const router = useRouter()

function getArticleList() {
  const loader = $loading.show({
    color: '#1e30f3',
    loader: 'dots',
    // backgroundColor: '#000000',
    // opacity: 0.5,
    zIndex: 999
  })

  listArticle(
    params,
    (res) => {
      console.log(res)
      console.log("getArticleList success")
      loader.hide()
    },
    (err) => {
      console.log("getArticleList err >>", err)
      loader.hide()

      if (err == VITE_EXPIRED_REFRESH_TOKEN) {
        alert("로그인이 필요합니다.")
        sessionStorage.clear()
        router.push({name:'login'})
      }
      else {
        alert("에러 발생")
        router.push({ name: 'home' })
      }
      
    }
  )
}
</script>

<template>
  <div>
    
  </div>
</template>

<style scoped>

</style>