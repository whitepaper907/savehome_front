<script setup>
import { ref } from 'vue'
import { getUserInfo, login } from '@/api/member.js'
import { useRouter } from 'vue-router'

const emit = defineEmits(["updateUserId"])

const router = useRouter()
const id = ref('')
const pw = ref('')
emit('updateUserId')

function loginHandler() {
    //server에 login요청 처리 후...
    const formData = new FormData()
    formData.append('username', id.value)
    formData.append('password', pw.value)

    login(
        formData,
        () => {
            getUserInfo(
                (res) => {
                    if (res.data.user_id === id.value) {
                        sessionStorage.setItem('user_id', id.value)
                        sessionStorage.setItem('user_name', res.data.user_name)
                        emit('updateUserId')
                        router.push({ name: 'home' })
                    } else {
                        sessionStorage.clear()
                        alert('다시 로그인 해주세요!')
                    }
                },
                (err) => {
                    console.log(err)
                    sessionStorage.clear()
                    alert("다시 로그인해주세요.")
                }
            )
        },
        (err) => {
            console.log(err)
            alert('다시 로그인 해주세요!')
        }
    )
}

function kakaoLoginHandler() {
    window.location.href = "http://localhost/oauth2/authorization/kakao"
}

</script>

<template>
  <section class="py-5">
      <div class="container px-5">
          <!-- Contact form-->
          <div class="bg-light rounded-4 py-5 px-4 px-md-5">
              <div class="text-center mb-5">
                  <div class="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i class="bi bi-envelope"></i></div>
                  <h1 class="fw-bolder">로그인</h1>
                  <p class="lead fw-normal text-muted mb-0">아이디와 패스워드를 입력하세요</p>
              </div>
              <div class="row gx-5 justify-content-center">
                  <div class="col-lg-8 col-xl-6">
                      <!-- * * * * * * * * * * * * * * *-->
                      <!-- * * SB Forms Contact Form * *-->
                      <!-- * * * * * * * * * * * * * * *-->
                      <!-- This form is pre-integrated with SB Forms.-->
                      <!-- To make this form functional, sign up at-->
                      <!-- https://startbootstrap.com/solution/contact-forms-->
                      <!-- to get an API token!-->
                      <form id="loginForm" @submit.prevent="loginHandler">
                          <!-- Name input-->
                          <div class="form-floating mb-3">
                              <input class="form-control" id="mid" type="text" placeholder="아이디" v-model="id"/>
                              <label for="mid">아이디</label>
                              <!--<div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>-->
                          </div>
                          <!-- Email address input-->
                          <div class="form-floating mb-3">
                              <input class="form-control" id="mpw" type="password" placeholder="비밀번호" v-model="pw"/>
                              <label for="mpw">비밀번호</label>
                          </div>
                          
                          <!-- Submit Button-->
                          <div class="d-grid"><button class="btn btn-primary btn-lg" id="loginBtn" type="submit">로그인</button></div>
                          <!-- Reset Password Button-->
                          <div><button class="btn btn-link" id="resetPwBtn" type="button">비밀번호를 잊어버리셨나요?</button></div>
                          <div class="social-sign-in">
                            <hr class="social-sign-in-line">
                            <span class="social-sign-in-title">간편 로그인</span>
                            <div class="social-sign-in-buttons">
                                <button type="button" class="social-sign-in-kakao" @click="kakaoLoginHandler"><img src="@/assets/kakao_login_medium_narrow.png"></button>
                            </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </section>

</template>

<style scoped>

</style>