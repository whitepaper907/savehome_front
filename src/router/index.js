import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { validateLogin } from "@/api/member.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/member/Login.vue'),
      beforeEnter: (to, from) => {
        if (sessionStorage.getItem('user_id')) {
          alert('로그인 상태입니다.')
          return { name: 'home' }
        }
      }
    },
    {
      path: '/kakaoLogin',
      name: 'kakaoLogin',
      component: () => import('@/components/member/KakaoLogin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/member/Register.vue')
    },
    {
      path: '/homedeal',
      name: 'homedeal',
      component: () => import('@/views/HomeDealView.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/BoardView.vue'),
      beforeEnter: (to, from) => {
        validateLogin(
          { user_id: sessionStorage.getItem('user_id'), user_name:sessionStorage.getItem('user_name'), access_token: sessionStorage.getItem('access_token'), refresh_token: sessionStorage.getItem('refresh_token') },
          ({ data }) => {
            sessionStorage.setItem('access_token', data.access_token)
            sessionStorage.setItem('refresh_token', data.refresh_token)
          },
          (err) => {
            sessionStorage.clear()
            router.push({ name: 'login' })
          }
        )
      }
    }
    
  ]
})

export default router
