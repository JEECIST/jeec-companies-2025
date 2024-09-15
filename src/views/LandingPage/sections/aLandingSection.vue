<template>
  <section>
    <h1 class="hidden-header">JEEC</h1>
    <div class="hero-flex">
      <img src="/src/assets/jeec-logo.svg" alt="JEEC Logo">
      <div class="hero-text">
        <p>
          {{ $t("landing-section.hero-text.a") }}
          <b>{{ $t("landing-section.hero-text.b-bold") }}</b>{{ $t("landing-section.hero-text.c") }}
        </p>
        <p class="hero-date">{{ $t("landing-section.hero-date") }}</p>
      </div>
    </div>
    <p class="contact-us">
      {{ $t("landing-section.contacts-text") }}
      <a href="mailto:jeecist.business@gmail.com" target="_blank"><u>jeecist.business@gmail.com</u></a>
    </p>
    <div class="buttons">
      
      <a v-if="$i18n.locale === 'pt'" href="https://drive.google.com/file/d/1DyGrYKKhmzpkZehOTgqVi6c_OVSvX8x5/view?usp=sharing" target="_blank">{{ $t("landing-section.buttons.magazine") }}</a>
      <a v-else-if="$i18n.locale === 'en'" href="https://drive.google.com/file/d/1AsL-JIEwHAKdDXfgh0pPmEQ4QEmL6cDv/view?usp=sharing" target="_blank">{{ $t("landing-section.buttons.magazine") }}</a>
      <a v-else href="">{{ $t("landing-section.buttons.magazine") }}</a>
      <a href="https://jeec.ist" target="_blank">{{ $t("landing-section.buttons.website") }}</a>
    </div>
    <div class="nav-bar-placeholder" :class="{ 'active': scrollStore.navbarFixed }">
      <div id="nav-bar-trigger"></div>
    </div>
    <navBar></navBar>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useScrollStore } from '@/stores/scroll';
import navBar from '../components/navBar.vue';

const scrollStore = useScrollStore();

const navTrigger = (entries) => {
  scrollStore.navbarFixed = !entries[0].isIntersecting;
}

const navObserver = new IntersectionObserver(navTrigger, {
  root: null,
  rootMargin: "-15px 0px 0px 0px",
  threshold: 0,
})

onMounted(() => {
  navObserver.observe(document.querySelector("#nav-bar-trigger"))
})

</script>

<style scoped>
section {
  background-image: url(/src/assets/landing-bg.png);
  background-position: center;
  padding-bottom: calc(80px + 5rem);
  height: 100%;
}

section a, section p {
  color: var(--c-ft-light);
}

.hidden-header {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}

.hero-flex {
  gap: 5ch;
  padding: 5rem 5ch 0 5ch;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
}

.hero-flex > img {
  max-width: 45ch;
  flex-grow: 1;
  margin: -3%;
}

.hero-text {
  height: 100%;
  max-width: 52ch;
  flex-grow: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.hero-text > p:first-child {
  max-width: 35ch;
  padding-bottom: 1rem;
}

.hero-date {
  font-size: clamp(2rem, 4vw, 4rem);
  font-weight: 900;
}

.contact-us {
  padding: 0 5ch;
  padding-top: 4rem;
  margin: 0 auto;
  max-width: 105ch;
  text-align: center;
}

.buttons {
  padding-top: 3.5rem;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  padding-bottom: 5rem;
  max-width: 800px;
}

.buttons > a {
  border: var(--c-acc-blue) 2px solid;
  border-radius: 100px;
  padding: 0.8rem 0;
  width: 15ch;
  text-align: center;
  text-decoration: none;
  background-color: color-mix(in srgb, var(--c-acc-blue) 10%, transparent);
  backdrop-filter: blur(4px);
}

.nav-bar-placeholder {
  position: relative;
  width: 100%;
  height: 0rem;
}

.nav-bar-placeholder.active {
  height: 3rem;
}

#nav-bar-trigger {
  pointer-events: none;
  position: absolute;
  bottom: 100%;
  height: 100vh;
  z-index: -99;
}

@media screen and (max-width: 900px) {
  .hero-flex {
    flex-direction: column;
  }
  .hero-flex > img {
    width: 100%;
  }
  .hero-text > p:first-child {
    max-width: 50ch;
  }
}
</style>