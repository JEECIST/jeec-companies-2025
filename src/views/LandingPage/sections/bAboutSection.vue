<template>
  <section>
    <sectionDivider class="section-divider"></sectionDivider>
    <div class="content">
      <img src="/src/assets/jeec-team.webp" alt="JEEC Team Photo">
      <div class="text">
        <h2 id="about">{{ $t("about-section.title") }}</h2>
        <p>{{ $t("about-section.text") }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import sectionDivider from '../components/sectionDivider.vue';
</script>

<style scoped>
section {
  background-color: var(--c-acc-purple-blue);
  position: relative;
  color: var(--c-ft-light);
}

.section-divider {
  --color: var(--c-acc-purple-blue);
  height: 100px;
}

.content {
  background-color: inherit;
  display: flex;
  justify-content: space-around;
  padding: 0 10ch;
  padding-bottom: 50px;
  gap: 7ch;
  max-width: 1500px;
  margin: 0 auto;
}

.content > img {
  position: relative;
  align-self: flex-start;
  padding-bottom: 3rem;
  top: -50px;
  height: auto;
  aspect-ratio: 1.6;
  max-width: 40ch;
  flex: 1;
  object-fit: cover;
  object-position: center;
}

.content .text {
  max-width: 50ch;
  text-align: end;
  padding-bottom: 3rem;
  flex: 1;
}

.content .text h2 {
  padding-bottom: 2rem;
}

@media screen and (max-width: 1050px) {
  .section-divider {
    height: 60px;
  }

  .content {
    flex-direction: column;
    gap: 0;
    padding: 0 5ch;
    padding-bottom: 50px;
  }

  .content > img {
    align-self: center;
    top: -2.4rem;
    padding-bottom: 0;
    width: 100%;
  }

  .content .text {
    text-align: center;
    max-width: none;
  }
}
</style>

