<script setup>
import { logout } from '@/api/member.js'
import { useRouter } from 'vue-router'

const props = defineProps({
  userId: String
})

const emit = defineEmits(["updateUserId"])

const router = useRouter()

function logoutHandler() {
  logout(
    { user_id: sessionStorage.getItem('user_id'), access_token: sessionStorage.getItem('access_token') },
    ({ data }) => {
      sessionStorage.clear()
      emit('updateUserId')
      router.push({name:'home'})
    },
    (err) => {
      alert("로그아웃 오류 발생")
      console.log(err)
    }
  )

  
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
    <div class="container px-5">
      <router-link class="navbar-brand" :to="{name:'home'}"><span class="fw-bolder text-primary">구해줘 홈즈!!</span></router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
          <li class="nav-item"><router-link class="nav-link" :to="{name:'home'}">Home</router-link></li>
          <li v-if="!props.userId" class="nav-item"><router-link class="nav-link" :to="{name:'login'}">로그인</router-link></li>
          <li v-if="!props.userId" class="nav-item"><router-link class="nav-link" id = "aregister" :to="{name:'register'}">회원가입</router-link></li>
          <li v-if="props.userId" class="nav-item" id = "alogout"><button class="nav-link" @click="logoutHandler">로그아웃</button></li>
          <!-- <li v-if="props.userId" class="nav-item"id ="aRenewPw"><a class="nav-link" id="aresetPassword">비밀번호 재설정</a></li>
          <li v-if="props.userId" class="nav-item" id ="aDeleteMember"><a class="nav-link" id="deleteMember">회원탈퇴</a></li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>