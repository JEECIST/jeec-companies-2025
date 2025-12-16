<template>
  <section>
    <sectionDivider class="section-divider"></sectionDivider>
    <h2 id="deadlines">{{ $t("deadlines.title") }}</h2>
    <div class="deadline">
      <h3>{{ $t("deadlines.first.text") }}</h3>
      <p>{{ $t("deadlines.first.date") }}</p>
    </div>
    <div class="deadline">
      <h3>{{ $t("deadlines.second.text") }}</h3>
      <p>{{ $t("deadlines.second.date") }}</p>
    </div>
    <div class="deadline">
      <h3>{{ $t("deadlines.third.text") }}</h3>
      <p>{{ $t("deadlines.third.date") }}</p>
    </div>
  </section>
</template>

<script setup>
import sectionDivider from '../components/sectionDivider.vue';
</script>

<style scoped>
section {
  position: relative;
  background-color: var(--c-acc-violet);
  color: var(--c-ft-light);
  text-align: center;
  padding: 3rem 5ch 10rem 5ch;
}

.section-divider {
  height: 100px;
  --color: var(--c-acc-violet);
}

.deadline h3 {
  padding-top: 3rem;
  font-size: 1.5rem;
  font-weight: 800;
}

.deadline p {
  padding-top: 2rem;
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 900;
}

@media screen and (max-width: 900px) {
  .section-divider {
    height: 60px;
  }
}

@media screen and (max-width: 600px) {
  .section-divider {
    height: 40px;
  }
}
</style>