<template>
  <section>
    <sectionDivider class="section-divider"></sectionDivider>
    <div class="sub-section" style="z-index: 2;">
      <div class="content first">
        <div class="offer">
          <h2 id="offers">{{ $t("offers-section.title") }}</h2>
          <h3>{{ $t("offers-section.job-fair.title") }}</h3>
          <p>{{ $t("offers-section.job-fair.text") }}</p>
        </div>
        <div class="image">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 0 0 V 100 H 100 V 8 L 0 0 Z" style="fill: var(--c-acc-red-pink);"></path>
          </svg>
          <img src="/src/assets/offers/job-fair.png" alt="Job Fair">
        </div>
      </div>
      <shadowDivider :bottom="true" :flipped="true"></shadowDivider>
    </div>
    <div class="sub-section" style="z-index: 1;">
      <div class="content">
        <div class="offer">
          <h3>{{ $t("offers-section.cv-platform.title") }}</h3>
          <p>{{ $t("offers-section.cv-platform.text") }}</p>
        </div>
        <div class="image">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 0 0 V 100 H 100 V 8 L 0 0 Z" style="fill: var(--c-acc-pink);"></path>
          </svg>
          <img src="/src/assets/offers/cv-platform.png" alt="CV Platform">
        </div>
      </div>
    </div>
    <div class="sub-section" style="z-index: 2;">
      <shadowDivider></shadowDivider>
      <div class="content">
        <div class="offer">
          <h3>{{ $t("offers-section.eletrolink.title") }}</h3>
          <p>{{ $t("offers-section.eletrolink.text") }}</p>
        </div>
        <div class="image">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 0 0 V 100 H 100 V 8 L 0 0 Z" style="fill: var(--c-acc-purple-blue);"></path>
          </svg>
          <img src="/src/assets/offers/eletrolink.png" alt="Eletrolink">
        </div>
      </div>
      <shadowDivider :bottom="true" :flipped="true"></shadowDivider>
    </div>
    <div class="sub-section" style="z-index: 1;">
      <div class="content">
        <div class="offer">
          <h3>{{ $t("offers-section.15-15.title") }}</h3>
          <p>{{ $t("offers-section.15-15.text") }}</p>
        </div>
        <div class="image">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 0 0 V 100 H 100 V 8 L 0 0 Z" style="fill: var(--c-acc-red-pink);"></path>
          </svg>
          <img src="/src/assets/offers/15-15.png" alt="15-15 Sessions">
        </div>
      </div>
    </div>
    <div class="sub-section" style="z-index: 2;">
      <shadowDivider></shadowDivider>
      <div class="content">
        <div class="offer">
          <h3>{{ $t("offers-section.inside-talks.title") }}</h3>
          <p>{{ $t("offers-section.inside-talks.text") }}</p>
        </div>
        <div class="image">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 0 0 V 100 H 100 V 8 L 0 0 Z" style="fill: var(--c-acc-pink);"></path>
          </svg>
          <img src="/src/assets/offers/inside-talks.png" alt="Inside Talks">
        </div>
      </div>
      <shadowDivider :bottom="true" :flipped="true"></shadowDivider>
    </div>
    <div class="sub-section" style="z-index: 1;">
      <div class="content">
        <div class="offer">
          <h3>{{ $t("offers-section.workshops.title") }}</h3>
          <p>{{ $t("offers-section.workshops.text") }}</p>
        </div>
        <div class="image">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M 0 0 V 100 H 100 V 8 L 0 0 Z" style="fill: var(--c-acc-violet);"></path>
          </svg>
          <img src="/src/assets/offers/workshops.png" alt="Workshops">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import sectionDivider from '../components/sectionDivider.vue';
import shadowDivider from '../components/shadowDivider.vue';
</script>

<style scoped>
section {
  position: relative;
  background-color: var(--c-acc-blue);
}

.section-divider {
  --color: var(--c-acc-blue);
  height: 60px;
}

.sub-section {
  position: relative;
}

.content {
  position: relative;
  background-color: var(--c-acc-blue);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4rem 10ch;
  gap: calc(5ch + 30px);
  z-index: 1;
  max-width: 1700px;
  margin: 0 auto;
}

.content::before {
  content: "";
  position: absolute;
  background-color: inherit;
  top: 0;
  left: 50%;
  translate: -50% 0;
  width: 100svw;
  max-width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.sub-section:nth-child(odd) .content {
  flex-direction: row-reverse;
  text-align: end;
  padding: 6rem 10ch;
}

.offer {
  max-width: 40ch;
  flex: 1;
}

.content.first .offer {
  align-self: flex-end;
  padding-bottom: 3rem;
}

.content.first h2 {
  position: absolute;
  top: 3rem;
}

.content.first .image {
  max-width: 40ch;
}

.offer h3 {
  padding-bottom: 1rem;
  font-weight: 800;
  font-size: 1.5rem;
}

.image {
  flex: 1;
  position: relative;
  max-width: 35ch;
}

.image svg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.image img {
  display: block;
  position: relative;
  top: 30px;
  right: 30px;
  width: 100%;
  height: auto;
}

@media screen and (max-width: 1050px) {
  .content.first {
    padding-top: 10rem;
  }

  .content.first .offer {
    align-self: center;
    padding-bottom: 0
  }
}

@media screen and (max-width: 900px) {
  .content.first h2 {
    left: 50%;
    translate: -50% 0;
    padding: 0;
    text-align: center;
  }

  .content {
    flex-direction: column;
    gap: 2rem;
    padding: 4rem 5ch;
  }

  .image, .content.first .image {
    max-width: 30ch;
    width: 100%;
    left: 15px;
  }

  .sub-section:nth-child(odd) .content {
    flex-direction: column;
    padding: 6rem 5ch 8rem 5ch;
  }

  .sub-section:nth-child(odd) .content .image {
    left: -15px;
  }

  .sub-section:nth-child(odd) .image svg {
    transform: scaleX(-1);
  }

  .sub-section:nth-child(odd) .image img {
    top: 30px;
    left: 30px;
  }
}

@media screen and (max-width: 600px) {
  .section-divider {
    height: 40px;
  }
}
</style>