<script setup>
import { onMounted, ref } from "vue";
import { listArticle } from "@/api/board.js"
import { useRouter } from "vue-router";
import { useLoading } from 'vue-loading-overlay'

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
    ({ data }) => {
      // articles.value = data
      console.log("getArticleList success")
      loader.hide()
    },
    (err) => {
      console.log("getArticleList err >>", err)
      alert("로그인이 필요합니다.")
      loader.hide()
      router.push({ name: 'login' })
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