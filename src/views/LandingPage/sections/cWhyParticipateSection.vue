<template>
  <section>
    <sectionDivider class="section-divider" :flipped=true></sectionDivider>
    <h2>{{ $t("why-participate-section.title") }}</h2>
    <p>{{ $t("why-participate-section.text") }}</p>
    <div class="flex-wrapper">
      <div class="card" v-for="(text, key) in $tm('why-participate-section.cards')">
        <img :src="'/src/assets/why-participate/' + key + '.svg'" :alt="key">
        <p>{{ text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import sectionDivider from '../components/sectionDivider.vue';
</script>

<style scoped>
section {
  background-color: var(--c-bg);
  position: relative;
  color: var(--c-ft-light);
  padding-bottom: 100px;
}

.section-divider {
  --color: var(--c-bg);
  height: 80px;
}

.content {
  background-color: inherit;
}

section>h2 {
  margin: 0 auto;
  width: fit-content;
  padding-top: 1rem;
}

section>p {
  padding-top: 2rem;
  max-width: 90ch;
  text-align: center;
  margin: 0 auto;
}

.flex-wrapper {
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: min-content min-content;
  row-gap: 3rem;
  justify-items: center; */

}

.flex-wrapper .card {
  display: flex;
  flex-direction: column;
  max-width: 20ch;
  align-items: center;
  text-align: center;
  gap: 2rem;
  padding: 2rem 2ch;
  border: var(--c-acc-blue) solid 2px;
  border-radius: 5px;
  background-color: color-mix(in srgb, var(--c-acc-blue) 10%, transparent);
  flex-grow: 1;
}

.flex-wrapper .card .p {
  max-width: 10ch;
}
</style>