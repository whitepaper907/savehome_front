<script setup>
import { getKakaoToken } from '@/api/member.js'
import { onMounted } from "vue";
import { useRouter } from 'vue-router'

const emit = defineEmits(["updateUserId"])
const router = useRouter()

onMounted(() => {
  const code = new URLSearchParams(window.location.search).get('code')

  getKakaoToken(
    { code: code },
    ({ data }) => {
      console.log(data)
      console.log(data.id)
      sessionStorage.setItem('user_id', data.id)
      emit('updateUserId')
      router.push({ name: 'home' })
    },
    ({ err }) => {
      console.log(err)
    }
  )
})
</script>

<template>
  <div>
    processing...
  </div>
</template>

<style scoped>

</style>