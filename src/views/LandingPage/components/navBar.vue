<template>
  <nav class="nav-bar" :class="{ 'fixed': scrollStore.navbarFixed }">
    <div id="nav-scroll">
      <ul>
        <li><router-link id="b":to="{ path: '/', hash: '#about' }">{{ $t("nav-bar.about") }}</router-link></li>
        <li><router-link id="d":to="{ path: '/', hash: '#offers' }">{{ $t("nav-bar.offers") }}</router-link></li>
        <li><router-link id="e":to="{ path: '/', hash: '#partnership' }">{{ $t("nav-bar.partnership-levels") }}</router-link></li>
        <li><router-link id="f":to="{ path: '/', hash: '#deadlines' }">{{ $t("nav-bar.deadlines") }}</router-link></li>
        <li><router-link id="g":to="{ path: '/', hash: '#conditions' }">{{ $t("nav-bar.conditions") }}</router-link></li>
        <li><router-link id="h":to="{ path: '/', hash: '#faqs' }">{{ $t("nav-bar.faqs") }}</router-link></li>
      </ul>
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
  let currElRect;
  const navScroll = document.getElementById("nav-scroll");
  let navScrollRect;
  
  watch(scrollStore.isSectionIntersecting, () => {
    active = false
    navScrollRect = navScroll.getBoundingClientRect();
    console.log(navScroll.scrollLeft)

    for(let key in scrollStore.isSectionIntersecting) {
      currEl = document.querySelector('#' + key);
      currElRect = currEl.getBoundingClientRect();

      if (scrollStore.isSectionIntersecting[key] === true && active === false) {
        currEl.classList.add("active");
        navScroll.scrollLeft += currElRect.left - navScrollRect.width / 2 + currElRect.width / 2 - 30;
        active = true;
      } else {
        currEl.classList.remove("active");
      }
    }
  })
})
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

li a {
  height: 3rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
}

li a::before {
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

ul a:is(:hover, .active)::before {
  width: calc(100%);
  transition: width 0.2s ease-out;
}
</style>