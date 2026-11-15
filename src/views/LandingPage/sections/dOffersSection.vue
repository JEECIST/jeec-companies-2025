<template>
  <section>
    <sectionDivider class="section-divider"></sectionDivider>

    <div
      v-for="(item, i) in offers"
      :key="item.key"
      class="sub-section"
      :class="`tone-${i + 1}`"
      :style="{ zIndex: i + 1 }"
    >
      <sectionDivider v-if="i > 0" class="sub-divider" :flipped="i % 2 === 1"></sectionDivider>

      <div class="content" :class="{ first: i === 0, reverse: i % 2 === 1 }">
        <div class="offer">
          <h2 v-if="i === 0" id="offers">{{ $t("offers-section.title") }}</h2>
          <h3>{{ $t(`offers-section.${item.key}.title`) }}</h3>
          <p>{{ $t(`offers-section.${item.key}.text`) }}</p>
        </div>
        <div class="image">
          <img class="photo" :src="getImageUrl(item.img)" :alt="item.alt">
          <img class="border" src="/src/assets/offers/border.svg" alt="" aria-hidden="true">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import sectionDivider from '../components/sectionDivider.vue';

const offers = [
  { key: 'job-fair',      img: 'img-feira-emprego.png', alt: 'Job Fair' },
  { key: 'cv-platform',   img: 'img-cv.png',            alt: 'CV Platform' },
  { key: 'workshops',     img: 'img-workshops.png',     alt: 'Workshops' },
  { key: 'round-tables',  img: 'img-round-table.png',   alt: 'Round Tables' },
  { key: 'speakers',      img: 'img-key-notes.png',     alt: 'Key Note Speakers e Panels' },
];

const getImageUrl = (file) =>
  new URL(`../../../assets/offers/${file}`, import.meta.url).href;
</script>

<style scoped>
section {
  --offers-1: #221D38;
  --offers-2: #1C3060;
  --offers-3: #3270D3;
  --offers-4: #199CFF;
  --offers-5: #5AC8FF;

  position: relative;
  background-color: var(--offers-5);
}

.section-divider {
  --color: var(--offers-1);
  height: 60px;
}

.sub-divider {
  --color: var(--bg);
  height: 60px;
}

.tone-1 { --bg: var(--offers-1); --fg: var(--c-ft-light); }
.tone-2 { --bg: var(--offers-2); --fg: var(--c-ft-light); }
.tone-3 { --bg: var(--offers-3); --fg: var(--c-ft-dark); }
.tone-4 { --bg: var(--offers-4); --fg: var(--c-ft-dark); }
.tone-5 { --bg: var(--offers-5); --fg: var(--c-ft-dark); }

.sub-section {
  position: relative;
  display: flex;
  justify-content: center;
}

.content {
  background-color: var(--bg);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4rem 10ch;
  gap: calc(5ch + 30px);
  z-index: 1;
  width: min(100%, 1700px);
  max-width: 100%;
}

.content::before {
  content: "";
  position: absolute;
  background-color: inherit;
  top: 0;
  left: 50%;
  translate: -50% 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}

.content.reverse {
  flex-direction: row-reverse;
  text-align: end;
  padding: 6rem 10ch;
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

.offer {
  max-width: 40ch;
  flex: 1;
}

.offer h2,
.offer h3,
.offer p {
  color: var(--fg);
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

.image .photo {
  display: block;
  position: relative;
  top: 30px;
  right: 30px;
  width: 100%;
  height: auto;
}

.image .border {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
  z-index: 1;
  scale: 120%;
}

@media screen and (max-width: 1050px) {
  .content.first {
    padding-top: 10rem;
  }

  .content.first .offer {
    align-self: center;
    padding-bottom: 0;
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

  .image,
  .content.first .image {
    max-width: 30ch;
    width: 100%;
    left: 15px;
  }

  .content.reverse {
    flex-direction: column;
    padding: 6rem 5ch 8rem 5ch;
  }

  .content.reverse .image {
    left: -15px;
  }

  .content.reverse .photo,
  .content.reverse .border {
    top: 30px;
    left: 30px;
  }
}

@media screen and (max-width: 600px) {
  .section-divider,
  .sub-divider {
    height: 40px;
  }
}
</style>