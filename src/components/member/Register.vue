<script setup>
import { register } from '@/api/member.js';
import { ref } from "vue";

const id = ref('');
const pw = ref('');
const email = ref('');
const name = ref('');
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function validateEmail() {
    return emailPattern.test(email.value)
}

function registerHandler() {
    if (!validateEmail()) {
        alert("이메일 형식을 확인해주세요.")
        return
    }

    register(
        { user_id: id.value, user_pw: pw.value, user_name: name.value, email: email.value },
        ({ res }) => {
            console.log(res)
        },
        (err) => {
            console.log(err)
        }
    )
}
</script>

<template>
  <div>
    <section class="py-5">
        <div class="container px-5">
            <!-- Contact form-->
            <div class="bg-light rounded-4 py-5 px-4 px-md-5">
                <div class="text-center mb-5">
                    <div class="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3"><i class="bi bi-envelope"></i></div>
                    <h1 class="fw-bolder">회원가입</h1>
                    <!-- <p class="lead fw-normal text-muted mb-0">구해줘 홈즈</p> -->
                </div>
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-8 col-xl-6">
                        <form id="loginForm" @submit.prevent="">
                            <!-- Name input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="rid" type="text" placeholder="아이디" v-model="id"/>
                                <label for="rid">아이디</label>
                                <!--<div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>-->
                            </div>
                            <div class="form-floating mb-3">
                                <input class="form-control" id="rpw" type="password" placeholder="비밀번호" v-model="pw"/>
                                <label for="rpw">비밀번호</label>
                            </div>
                            <!-- Email address input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="remail" type="email" placeholder="이메일" v-model="email"/>
                                <label for="rid">이메일</label>
                                <!--<div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>-->
                            </div>
                            <div class="form-floating mb-3">
                                <input class="form-control" id="rname" type="text" placeholder="이름" v-model="name"/>
                                <label for="rname">이름</label>
                            </div>
                            <!-- Submit Button-->
                            <div class="d-grid"><button class="btn btn-primary btn-lg " id="registerBtn" type="button" @click="registerHandler">회원가입</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

  </div>
</template>

<style scoped>

</style>