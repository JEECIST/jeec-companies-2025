<template>
  <main>
    <aLandingSection></aLandingSection>
    <div class="scrollable" id="b">
      <bAboutSection></bAboutSection>
      <cWhyParticipateSection></cWhyParticipateSection>
    </div>
    <dOffersSection class="scrollable" id="d"></dOffersSection>
    <ePartnershipLevelsSection class="scrollable" id="e"></ePartnershipLevelsSection>
    <fDeadlinesSection class="scrollable" id="f"></fDeadlinesSection>
    <gConditionsSection class="scrollable" id="g"></gConditionsSection>
    <hFaqsSection class="scrollable" id="h"></hFaqsSection>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useScrollStore } from '@/stores/scroll';

import aLandingSection from './sections/aLandingSection.vue';
import bAboutSection from './sections/bAboutSection.vue';
import cWhyParticipateSection from './sections/cWhyParticipateSection.vue';
import dOffersSection from './sections/dOffersSection.vue';
import ePartnershipLevelsSection from './sections/ePartnershipLevelsSection.vue';
import fDeadlinesSection from './sections/fDeadlinesSection.vue';
import gConditionsSection from './sections/gConditionsSection.vue';
import hFaqsSection from './sections/hFaqsSection.vue';

const scrollStore = useScrollStore();

const sections = ref([])

const callback = (entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    scrollStore.isSectionIntersecting[target.id] = isIntersecting;
  })
}

const observer = new IntersectionObserver(callback, {
  root: null,
  rootMargin: "-200px 0px",
  threshold: 0,
})

onMounted(() => {
  document.querySelectorAll(".scrollable").forEach((el) => {
    observer.observe(el);
    el.classList.remove("scrollable");
  })
})

</script>