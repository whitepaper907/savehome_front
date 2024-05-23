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
      path: '/chat',
      name: 'chat',
      component: () => import('@/components/chat/ChatRoom.vue')
    },
    {
      path: '/board',
      name: 'board',
      component: () => import('@/views/BoardView.vue'),
      redirect: { name: 'article-list' },
      children: [
        {
          path: '/list',
          name: 'article-list',
          component: () => import('@/components/board/BoardList.vue')
        }
      ],
      beforeEnter: (to, from) => {
        if (!sessionStorage.getItem('user_id')){
          alert('로그인이 필요합니다.')
          return { name: 'login' }
        }
      }
    }
    
  ]
})

export default router
