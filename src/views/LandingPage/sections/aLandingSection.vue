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
      <a href="mailto:email-temporario@jeec.ist"><u>jeecist.business@gmail.com</u></a>
    </p>
    <div class="buttons">
      <a href="">{{ $t("landing-section.buttons.magazine") }}</a>
      <a href="https://jeec.ist" target="_blank">{{ $t("landing-section.buttons.website") }}</a>
    </div>
    <div ref="el" class="nav-bar-placeholder"></div>
    <navBar :topOffset="offset"></navBar>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useScrollStore } from '@/stores/scroll';
import navBar from '../components/navBar.vue';

const scrollStore = useScrollStore();

const el = ref(null);
const offset = ref();

function onScroll() {
  scrollStore.navbarOffset = Math.max(16, el.value.getBoundingClientRect().top)
}

onMounted(() => {
  scrollStore.navbarOffset = el.value.getBoundingClientRect().top + 23; //to account for the 1.5rem position discrepancy
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
})


</script>

<style scoped>
section {
  background-image: url(/src/assets/landing-bg.png);
  padding-bottom: calc(80px + 5rem);
  position: relative;
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
  padding-top: 4rem;
  margin: 0 auto;
  max-width: 100ch;
  text-align: center;
}

.buttons {
  padding-top: 3.5rem;
  display: flex;
  justify-content: space-around;
  margin: 0 20ch;
  padding-bottom: 5rem
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
  height: 3rem;
}
</style>