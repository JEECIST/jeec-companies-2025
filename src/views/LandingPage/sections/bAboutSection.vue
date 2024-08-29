<template>
  <section>
    <sectionDivider class="section-divider"></sectionDivider>
    <h2 id="about">{{ $t("about-section.title") }}</h2>
    <p>{{ $t("about-section.text") }}</p>
  </section>
</template>

<script setup>
import sectionDivider from '../components/sectionDivider.vue';
</script>

<style scoped>
section {
  background-color: var(--c-acc-purple-blue);
  height: 500px;
  position: relative;
}

.section-divider {
  --color: var(--c-acc-purple-blue);
  height: 100px;
}
</style>

