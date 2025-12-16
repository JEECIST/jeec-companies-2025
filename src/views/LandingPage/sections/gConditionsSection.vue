<template>
  <section>
    <sectionDivider class="section-divider" :flipped="true"></sectionDivider>
    <h2 id="conditions">{{ $t("conditions.title") }}</h2>
    <ul>
      <li v-for="item in $tm('conditions.condition-list')">
        <h3>{{ $rt(item.title) }}</h3>
        <p>&nbsp;{{ $rt(item.text) }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
import sectionDivider from '../components/sectionDivider.vue';
</script>

<style scoped>
section {
  position: relative;
  background-color: var(--c-acc-purple-blue);
  color: var(--c-ft-light);
  padding-top: 1rem;
  padding-bottom: 3rem;
}

.section-divider {
  --color: var(--c-acc-purple-blue);
  height: 100px;
}

section h2 {
  padding: 0 3ch;
}

section ul {
  padding: 3rem 10ch;
}

section ul li:not(:first-child) {
  padding-top: 1rem;
}

section ul li :is(h3, p){
  font-size: 1rem;
  display: inline;
}

@media screen and (max-width: 900px) {
  .section-divider {
    height: 60px;
  }
}

@media screen and (max-width: 750px) {
  section h2 {
    padding: 0 1ch;
    padding-top: 1rem;
    text-align: center;
  }
  section ul {
    padding: 3rem 5ch;
  }
}

@media screen and (max-width: 600px) {
  .section-divider {
    height: 40px;
  }

  section h2 {
    padding-top: 2rem;
  }
}
</style>