<template>
  <section>
    <div class="title-box">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M 0 10 V 100 H 100 V 0 L 0 10 Z" style="fill: var(--c-acc-violet);"></path>
      </svg>
      <h2 id="partnership">{{ $t("partnership-levels.title") }}</h2>
    </div>
    <p class="section-description">{{ $t("partnership-levels.text") }}</p>
    <div class="tiers-wrapper">
      <div class="tier bronze">
        <h3>{{ $t("partnership-levels.bronze.name") }}</h3>
        <p class="requirement">{{ $t("partnership-levels.bronze.requirement") }}</p>
        <div class="benefits">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 0 10 V 100 H 100 V 0 L 0 10 Z" style="fill: var(--c-bronze);"></path>
          </svg>
          <ul>
            <li v-for="(text, key) in $tm('partnership-levels.bronze.benefits')">
              <p>{{ text }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="tier silver">
        <h3>{{ $t("partnership-levels.silver.name") }}</h3>
        <p class="requirement">{{ $t("partnership-levels.silver.requirement") }}</p>
        <div class="benefits">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 0 10 V 100 H 100 V 0 L 0 10 Z" style="fill: var(--c-silver);"></path>
          </svg>
          <ul>
            <li v-for="(text, key) in $tm('partnership-levels.silver.benefits')">
              <p>{{ text }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="tier gold">
        <h3>{{ $t("partnership-levels.gold.name") }}</h3>
        <p class="requirement">{{ $t("partnership-levels.gold.requirement") }}</p>
        <div class="benefits">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 0 10 V 100 H 100 V 0 L 0 10 Z" style="fill: var(--c-gold);"></path>
          </svg>
          <ul>
            <li v-for="(text, key) in $tm('partnership-levels.gold.benefits')">
              <p>{{ text }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="condition">{{ $t("partnership-levels.condition") }}</p>
  </section>
</template>

<script setup></script>

<style scoped>
section {
  color: var(--c-ft-light);
  padding-top: 5rem;
  text-align: center;
  padding-bottom: 10rem;
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

.tiers-wrapper {
  padding: 0 5ch;
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 2ch;
  max-width: 1100px;
  margin: 0 auto;
  align-items: flex-end;
}

.bronze {
  color: var(--c-bronze);
}
.silver {
  color: var(--c-silver);
}
.gold {
  color: var(--c-gold);
}

.tier {
  flex: 1;
}

.tier h3 {
  font-size: 3rem;
  font-weight: 900;
}

.tier .requirement {
  font-size: 1.5rem;
  font-weight: 800;
  padding-bottom: 0.5rem;
}

.benefits {
  color: var(--c-ft-light);
  font-weight: 800;
  position: relative;
  padding: 2.5rem 3ch 2rem 3ch;
}

.benefits p {
  font-size: 1.1rem;
}

.benefits svg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
}

.benefits ul {
  list-style-type: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center
}

.benefits ul li:not(:first-child) {
  padding-top: 1rem;
}

.bronze .benefits ul {
  min-height: 8rem;
}

.silver .benefits ul {
  min-height: 12rem;
}

.gold .benefits ul {
  min-height: 16rem;
}

.condition {
  padding-top: 2rem;
}

@media screen and (max-width: 930px) {
  .tiers-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }

  .tier {
    width: 100%;
  }
}

@media screen and (max-width: 750px) {
  .title-box {
    width: calc(100% - 5ch);
    padding: 2rem 3ch;
  }
}
</style>