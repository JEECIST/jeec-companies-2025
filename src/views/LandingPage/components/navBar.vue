<template>
  <nav class="nav-bar" :class="{ 'fixed': scrollStore.navbarFixed }">
    <div id="nav-scroll">
      <ul>
        <li><router-link class="nav-item" id="b":to="{ hash: '#about' }"><div class="scroll-point"></div>{{ $t("nav-bar.about") }}</router-link></li>
        <li><router-link class="nav-item" id="d":to="{ hash: '#offers' }"><div class="scroll-point"></div>{{ $t("nav-bar.offers") }}</router-link></li>
        <li><router-link class="nav-item" id="e":to="{ hash: '#partnership' }"><div class="scroll-point"></div>{{ $t("nav-bar.partnership-levels") }}</router-link></li>
        <li><router-link class="nav-item" id="f":to="{ hash: '#deadlines' }"><div class="scroll-point"></div>{{ $t("nav-bar.deadlines") }}</router-link></li>
        <li><router-link class="nav-item" id="g":to="{ hash: '#conditions' }"><div class="scroll-point"></div>{{ $t("nav-bar.conditions") }}</router-link></li>
        <li><router-link class="nav-item" id="h":to="{ hash: '#faqs' }"><div class="scroll-point"></div>{{ $t("nav-bar.faqs") }}</router-link></li>
      </ul>
      <button class="locale-switch nav-item" @click="switchLocale"><div>{{ $i18n.locale }}</div></button>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useScrollStore } from '@/stores/scroll';
const scrollStore = useScrollStore();

onMounted(() => {
  let active;
  let currEl;
  const navScroll = document.getElementById("nav-scroll");
  
  watch(scrollStore.isSectionIntersecting, () => {
    active = false;

    for(let key in scrollStore.isSectionIntersecting) {
      currEl = document.querySelector('#' + key);

      if (scrollStore.isSectionIntersecting[key] === true && active === false) {
        currEl.classList.add("active");
        navScroll.scrollLeft += currEl.children[0].getBoundingClientRect().left - (navScroll.offsetWidth / 2);
        active = true;
      } else {
        currEl.classList.remove("active");
      }
    }
  })
})

import i18n from '@/i18n';
import { useRouter } from 'vue-router';
const router = useRouter();

function switchLocale() {
  let scrollPos = window.scrollY;
  let locale = localStorage.getItem("locale");
  if (locale === "en")
    locale = "pt";
  else
    locale = "en";

  localStorage.setItem("locale", locale);
  i18n.global.locale.value = locale;
  router.replace({ params: {"lang":locale} });
}
</script>

<style scoped>
.nav-bar {
  position: relative;
  z-index: 100;
  max-width: max-content;
  width: calc(100% - 2ch);
  margin: 0 auto;
  background-color: var(--c-bg-lighter);
  color: var(--c-ft-light);
  border-radius: 50px;
}

.nav-bar.fixed {
  position: fixed;
  top: 15px;
  left: 50%;
  translate: -50% 0;
}

#nav-scroll {
  position: relative;
  margin: 0 3ch;
  display: flex;
  overflow-x: auto;
}

#nav-scroll::-webkit-scrollbar {
  height: 0;
}

ul {
  display: flex;
  gap: 3ch;
  flex-shrink: 0;
}

ul li {
  margin-left: 1.5ch;
}

.nav-item {
  height: 3rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  border: none;
  background: none
}

a.nav-item::before {
  content: "";
  display: inline;
  position: absolute;
  bottom: 0.7rem;
  left: calc(50%);
  translate: -50% 0;
  height: 0.1rem;
  width: 0%;
  background-color: var(--c-ft-light);
  transition: width 0.1s ease-in;
}

a.nav-item .scroll-point {
  content: "";
  position: absolute;
  left: calc(50% - 4.5ch);
}

a.nav-item:is(:hover, .active)::before {
  width: calc(100%);
  transition: width 0.2s ease-out;
}

.locale-switch {
  text-transform: uppercase;
  padding-left: 3ch;
  overflow: hidden
}

.locale-switch::before {
  content: "";
  position: absolute;
  width: 1.5px;
  height: 50%;
  left: 1.5ch;
  background-color: var(--c-ft-light); 
}

.locale-switch:hover > div {
  transition: all 0.1s ease-in;
}

.locale-switch:hover > div {
  transform: scale(1.1);
  transform-origin: center;
  transition: all 0.2s ease-out;
}

@media screen and (max-width: 390px) {
  ul {
    gap: 2ch;
  }

  a.nav-item {
    left: -0.5ch;
    margin-right: -0.5ch;
  } 

  a.nav-item .scroll-point {
    left: calc(50% - 3ch);
  }
}
</style>