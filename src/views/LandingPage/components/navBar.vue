<template>
  <nav class="nav-bar" :style="{ top: scrollStore.navbarOffset + 'px' }">
    <div class="contents">
      <ul>
        <router-link id="b":to="{ path: '/', hash: '#about' }"><li>{{ $t("nav-bar.about") }}</li></router-link>
        <router-link id="d":to="{ path: '/', hash: '#offers' }"><li>{{ $t("nav-bar.offers") }}</li></router-link>
        <router-link id="e":to="{ path: '/', hash: '#partnership' }"><li>{{ $t("nav-bar.partnership-levels") }}</li></router-link>
        <router-link id="f":to="{ path: '/', hash: '#deadlines' }"><li>{{ $t("nav-bar.deadlines") }}</li></router-link>
        <router-link id="g":to="{ path: '/', hash: '#conditions' }"><li>{{ $t("nav-bar.conditions") }}</li></router-link>
        <router-link id="h":to="{ path: '/', hash: '#faqs' }"><li>{{ $t("nav-bar.faqs") }}</li></router-link>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useScrollStore } from '@/stores/scroll';
const scrollStore = useScrollStore();

onMounted(() => {
  let active = false;
  watch(scrollStore.isSectionIntersecting, () => {
    active = false
    for(let key in scrollStore.isSectionIntersecting)
      if(scrollStore.isSectionIntersecting[key] === true && active === false) {
        document.querySelector('#' + key).classList.add("active");
        active = true;
      } else {
        document.querySelector('#' + key).classList.remove("active");
      }
  })
})

</script>

<style scoped>
.nav-bar {
  position: fixed;
  left: 50%;
  translate: -50% 0;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
}

.contents {
  background-color: var(--c-bg-lighter);
  color: var(--c-ft-light);
  padding: 0 3ch;
  border-radius: 50px;
  display: flex;
  width: fit-content;
}

ul {
  display: flex;
  flex-grow: 1;
  gap: 3ch;
}

ul > a {
  height: 3rem;
  padding-left: 1.5ch;
  color: var(--c-ft-light);
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

ul > a::before {
  content: "";
  display: inline;
  position: absolute;
  bottom: 0.7rem;
  left: calc(50% + 0.75ch);
  translate: -50% 0;
  height: 0.1rem;
  width: 0%;
  background-color: var(--c-ft-light);
  transition: width 0.1s ease-in;
}

ul > a:is(:hover, .active)::before {
  width: calc(100% - 1.5ch);
  transition: width 0.2s ease-out;
}
</style>