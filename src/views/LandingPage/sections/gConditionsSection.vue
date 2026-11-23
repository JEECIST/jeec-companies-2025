<template>
  <section>
    <h2 id="conditions">{{ $t("conditions.title") }}</h2>
    <ul>
      <li v-for="(item, i) in $tm('conditions.condition-list')" :key="i">
        {{ $rt(item) }}
      </li>
    </ul>
  </section>
</template>

<script setup>
import sectionDivider from '../components/sectionDivider.vue';
</script>

<style scoped>

.section-divider {
  --color: var(--c-acc-medium-light-purple);
  height: 100px;
}

section {
  position: relative;
  background-color: var(--c-acc-medium-light-purple);
  color: var(--c-ft-light);
  padding: 1rem 10ch 3rem;
}

section h2,
section ul {
  width: min(100%, 1100px);
  margin: 0 auto;
}

section h2 {
  padding: 0;
}

section ul {
  padding: 3rem 0;
  list-style: none;
}

section ul li {
  max-width: 90ch;
  padding-left: 1em;
  text-indent: -1em;
}

section ul li::before {
  content: "• ";
}

@media screen and (max-width: 900px) {
  .section-divider {
    height: 60px;
  }
}

@media screen and (max-width: 750px) {
  section {
    padding: 1rem 5ch 3rem;
  }

  section h2 {
    padding-top: 1rem;
    text-align: center;
  }

  section ul {
    padding: 2rem 0;
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