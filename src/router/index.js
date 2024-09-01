import { createRouter, createWebHistory } from 'vue-router'
import i18n from '@/i18n'

import LandingPage from '../views/LandingPage/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:lang',
      name: 'landing',
      component: LandingPage,
      beforeEnter: [ setLanguage ]
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/" + i18n.global.locale.value,
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition)
      return { top: savedPosition.top }
    else if (to.hash) {
      const scrollY = document.documentElement.clientHeight * 0.29;
      return { el: to.hash, top: scrollY, behavior: "smooth" }
    }
    else
      return { top: 0 }
  }
})

function setLanguage (to) {
  if(i18n.global.availableLocales.indexOf(to.params.lang) === -1)
    return { path: "/" + i18n.global.locale.value }

  i18n.global.locale.value = to.params.lang;
  return
}

export default router
