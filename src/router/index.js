import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "../stores/user";
import i18n from '@/i18n'

import LandingPage from '../views/LandingPage/LandingPage.vue'
import HomeLogin from '../views/LandingPage/pages/home_login.vue'
import ChangePw from '../views/LandingPage/pages/change_pw.vue'
import Menu from '../views/LandingPage/pages/menu.vue'
import Activities from '../views/LandingPage/pages/activities.vue'
import Meals from '../views/LandingPage/pages/meals.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/changePw',
    //   name: 'changePw',
    //   component: ChangePw
    // },
    {
      path: '/login',
      name: 'login',
      component: HomeLogin,
      meta: { protected: false}
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu,
      meta: { protected: true}
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities,
      meta: { protected: true}
    },
    {
      path: '/meals',
      name: 'meals',
      component: Meals,
      meta: { protected: true}
    },
    {
      path: '/changePw',
      name: 'changePw',
      component: ChangePw,
      meta: { protected: true}
    },
    {
      path: '/:lang',
      name: 'landing',
      component: LandingPage,
      meta: { protected: false },
      beforeEnter: [ setLanguage ]
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/" + i18n.global.locale.value,
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.name === from.name && to.hash === from.hash)
      return false
    else if (savedPosition)
      return savedPosition
    else if (to.hash) {
      const scrollY = Math.min(document.documentElement.clientHeight * 0.29, 110);
      return { el: to.hash, top: scrollY, behavior: "smooth" }
    }
    else
      return { top: 0 }
  }
})

function setLanguage (to) {
  if (to.params.lang !== "en" && to.params.lang !== "pt") {

    if (localStorage.getItem("locale") === null || (localStorage.getItem("locale") !== "en" && localStorage.getItem("locale") !== "pt"))
      setNavigatorLocale();

    i18n.global.locale.value = localStorage.getItem("locale")
    return { path: "/" + localStorage.getItem("locale")}
  }

  localStorage.setItem("locale", to.params.lang)
  i18n.global.locale.value = to.params.lang
  return
}

function setNavigatorLocale() {
  const navLocale = (navigator.language || navigator.userLanguage).split("-")[0];
  if (navLocale !== "pt" && navLocale !== "en")
    localStorage.setItem("locale", "en");
  else
    localStorage.setItem("locale", navLocale);
}

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  document.title = to.meta.title;

  if (to.meta.protected) {
    if (userStore.loggedInState != true) {
      userStore.loggedInState = true;
  
      if (userStore.loggedIn !== true) {
        router.push({ name: "login" });
      }
    }
  }

  if (to.name === "login") {
    if (userStore.loggedIn) {
      router.push({ name: "menu" });
    }
  }

  // if (!userStore.loggedIn) {
  //   userStore.logoutUser();
  //   return { name: "default" };
  // }
});

export default router
