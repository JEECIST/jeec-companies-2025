<template>
  <section>
  <img class="traces left" src="/src/assets/Traces.png" alt="" aria-hidden="true">
  <img class="traces right" src="/src/assets/Traces.png" alt="" aria-hidden="true">
    <div class="title-box">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M 0 10 V 100 H 100 V 0 L 0 10 Z" style="fill: var(--c-acc-dark-blue);"></path>
      </svg>
      <h2 id="partnership">{{ $t("partnership-levels.title") }}</h2>
    </div>
    <p class="section-description">{{ $t("partnership-levels.text") }}</p>
      <div class="tiers-wrapper">
        <div v-for="tier in tiers" :key="tier" class="tier" :class="tier">
          <div class="benefits">
            <h3>{{ $t(`partnership-levels.${tier}.name`) }}</h3>
            <p class="requirement">{{ $t(`partnership-levels.${tier}.requirement`) }}</p>
            <ul>
              <li v-for="(text, key) in $tm(`partnership-levels.${tier}.benefits`)" :key="key">
                <p>{{ $t(`partnership-levels.${tier}.benefits.${key}`) }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <p class="condition">{{ $t("partnership-levels.condition") }}</p>
  </section>
</template>

<script setup>
const tiers = ['platinum', 'gold', 'bronze', 'silver'];
</script>

<style scoped>

section {
  position: relative;
  overflow-x: clip;
  color: var(--c-ft-light);
  padding-top: 5rem;
  padding-bottom: 10rem;
  text-align: center;
}

.traces { position: absolute; width: 15rem; pointer-events: none; }
.traces.left  { left: 0;  top: 6rem; }
.traces.right { right: 0; bottom: 4rem; transform: scaleX(-1); }

.tiers-wrapper {
  align-items: start;
  padding: 0 5ch;
  padding-top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.platinum .benefits {
  background: var(--c-platinum);
  clip-path: polygon(0 1%, 100% 0, 100% 97%, 0 100%);
}

.gold .benefits {
  background: var(--c-gold);
  clip-path: polygon(0 0, 100% 1%, 100% 100%, 0 96%);
}

.bronze .benefits {
  background: var(--c-bronze);
  clip-path: polygon(0 2%, 100% 5%, 100% 100%, 0 100%);
}

.silver .benefits {
  background: var(--c-silver);
  clip-path: polygon(0 4%, 100% 0, 100% 100%, 0 100%);
}

.tier {
  flex: 1;
}

.tier h3 {
  font-size: 2.5rem;
  font-weight: 900;
}

.tier .requirement {
  font-size: 1.2rem;
  font-weight: 800;
  padding-bottom: 1rem;
}

.benefits {
  color: var(--c-bg);
  font-weight: 800;
  position: relative;
  padding: 2rem 3ch;
  text-align: center;
}

.benefits ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  min-height: 0;
}

.benefits ul li p::before {
  content: "• ";
}

.benefits ul li p {
  font-size: 0.85rem;
}

.benefits ul li + li {
  margin-top: 0.6rem;
}

.title-box {
  position: relative;
  padding: 2rem 10ch;
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  filter: drop-shadow(10px 10px 20px black);
}

.title-box svg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.title-box h2 {
  position: relative;
  bottom: -0.3rem;
}

.section-description {
  margin: 0 auto;
  max-width: 95ch;
  padding: 0 5ch;
  padding-top: 3rem;
}

.condition {
  padding-top: 2rem;
}

@media screen and (max-width: 930px) {
  .tiers-wrapper {
    grid-template-columns: 1fr;
    max-width: 420px;
  }
}

@media screen and (max-width: 750px) {
  .title-box {
    width: calc(100% - 5ch);
    padding: 2rem 3ch;
  }
}
</style>