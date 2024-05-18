<script setup>
import { onMounted, ref } from "vue";
import {listArticle} from "@/api/board.js"

onMounted(() => {
  getArticleList()
})

const articles = ref([])
const params = {}

function getArticleList() {
  listArticle(
    params,
    ({ data }) => {
      // articles.value = data
      console.log("getArticleList success")
    },
    (err) => {
      console.log("getArticleList err >>",err)
    }
  )
}
</script>

<template>
  <div>
    boardList
  </div>
</template>

<style scoped>

</style>