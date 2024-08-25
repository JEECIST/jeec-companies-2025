<template>
  <section>
    <sectionDivider class="section-divider"></sectionDivider>
    <h1>{{ $t("about-section.title") }}</h1>
    <p>{{ $t("about-section.text") }}</p>
  </section>
</template>

<script setup>
import sectionDivider from '@/components/sectionDivider.vue';
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

