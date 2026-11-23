<template>
  <section>
    <h2 id="faqs">{{ $t("faqs.title") }}</h2>
    <ul>

      <li :class="{ active: isOpen('a') }">
        <button class="question-button" :aria-expanded="isOpen('a')" @click="toggle('a')">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.a.question") }}</p>
        </button>
        <div class="dropdown">
          <p>
            {{ $t("faqs.a.text.a") }}
            <a href="mailto:jeecist.business@gmail.com"><u>jeecist.business@gmail.com</u></a>{{ $t("faqs.a.text.b") }}
          </p>
        </div>
      </li>

      <li :class="{ active: isOpen('b') }">
        <button class="question-button" :aria-expanded="isOpen('b')" @click="toggle('b')">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.b.question") }}</p>
        </button>
        <div class="dropdown">
          <p>{{ $t("faqs.b.text.a") }}</p>
          <p>{{ $t("faqs.b.text.b") }}</p>
        </div>
      </li>

      <li v-for="id in simple" :key="id" :class="{ active: isOpen(id) }">
        <button class="question-button" :aria-expanded="isOpen(id)" @click="toggle(id)">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t(`faqs.${id}.question`) }}</p>
        </button>
        <div class="dropdown">
          <p>{{ $t(`faqs.${id}.text`) }}</p>
        </div>
      </li>

      <li :class="{ active: isOpen('h') }">
        <button class="question-button" :aria-expanded="isOpen('h')" @click="toggle('h')">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.h.question") }}</p>
        </button>
        <div class="dropdown">
          <p class="intro">{{ $t("faqs.h.text.a") }}</p>
          <ul class="detail-list">
            <li v-for="(item, i) in $tm('faqs.h.text.list')" :key="i">
              <p class="inline"><b>{{ $rt(item.item) }}</b></p>
              <p class="inline">&nbsp;{{ $rt(item.value) }}</p>
            </li>
          </ul>
          <p class="outro">
            {{ $t("faqs.h.text.b") }}
            <a href="mailto:tesouraria@neecist.org">tesouraria@neecist.org</a>
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const simple = ['c', 'd', 'e', 'f', 'g'];
const open = ref([]);

const isOpen = (id) => open.value.includes(id);

const toggle = (id) => {
  open.value = isOpen(id)
    ? open.value.filter((x) => x !== id)
    : [...open.value, id];
};
</script>

<style scoped>
section {
  padding: 6rem 10ch;
  color: var(--c-ft-light);
}

section h2,
section > ul {
  width: min(100%, 1100px);
  margin: 0 auto;
}

section h2 {
  padding: 0;
}

section > ul {
  padding: 3rem 0 0;
  list-style-type: none;
}

section > ul > li {
  display: grid;
  grid-template-rows: min-content 0fr;
  transition: grid-template-rows 0.5s ease-in-out;
}

section > ul > li.active {
  grid-template-rows: min-content 1fr;
}

.question-button {
  border: none;
  cursor: pointer;
  background-color: var(--c-bg);
  border-bottom: 2px solid var(--c-acc-blue);
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 1rem 3ch;
  gap: 3ch;
  color: inherit;
}

.question-button:focus-visible {
  outline: 2px solid var(--c-acc-blue);
  outline-offset: 2px;
}

.toggle-visual {
  position: relative;
  height: 2.5rem;
  aspect-ratio: 1;
  background-color: var(--c-acc-blue);
  border-radius: 2rem;
  flex-shrink: 0;
  transition: filter 0.2s;
}

.question-button:hover .toggle-visual {
  filter: brightness(1.15);
}

.toggle-visual .line {
  position: absolute;
  background-color: var(--c-bg);
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  transform-origin: center;
  width: 70%;
  height: 3px;
  border-radius: 5px;
  transition: transform 0.5s ease-in-out;
}

.toggle-visual .line:first-child {
  transform: rotate(0deg);
}

.toggle-visual .line:last-child {
  transform: rotate(-270deg);
}

li.active .toggle-visual .line:first-child {
  transform: rotate(360deg);
}

li.active .toggle-visual .line:last-child {
  transform: rotate(0deg);
}

.dropdown {
  min-height: 0;
  overflow: hidden;
  padding: 0 2ch 0 5ch;
  transition: padding 0.5s ease-in-out;
  border-bottom: 2px solid var(--c-acc-blue);
  position: relative;
  top: -2px;
}

li.active .dropdown {
  padding: 2rem 2ch 2rem 5ch;
  top: 0;
}

.dropdown .intro {
  padding-bottom: 0.5rem;
}

.dropdown .outro {
  padding-top: 1rem;
}

.dropdown .inline {
  display: inline;
}

.detail-list {
  list-style-type: none;
}

.detail-list li {
  padding-top: 0.5rem;
  margin-left: 3ch;
}

@media screen and (max-width: 750px) {
  section {
    padding: 4rem 3ch;
  }

  section > h2 {
    text-align: center;
  }

  section > ul {
    padding-top: 2rem;
  }
}
</style>