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
      component: HomeLogin
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities
    },
    {
      path: '/meals',
      name: 'meals',
      component: Meals
    },
    {
      path: '/changePw',
      name: 'changePw',
      component: ChangePw
    },
    {
      path: '/:lang',
      name: 'landing',
      component: LandingPage,
      beforeEnter: [ setLanguage ]
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/" + i18n.global.locale.value,
      name: "default"
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

  // If navigating to login, don’t run auth logic
  if (to.name === "login" && to.name === "landing") {
    return true;
  }

  if (userStore.loggedInState != true) {
    userStore.loggedInState = true;

    if (userStore.loggedIn !== true) {
      router.push("/")
    }
  }

  if (!userStore.loggedIn) {
    userStore.logoutUser();
    return { name: "default" };
  }

  const routeName = router.getRoutes().find(
    rte => rte.path === '/login' + to.path.split('/')[1]
  )?.name;

  if (routeName) {
    return { name: "menu" };
  }

  return true;
});

export default router
