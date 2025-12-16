<template>
  <section>
    <h2 id="faqs">{{ $t("faqs.title") }}</h2>
    <ul>
      <li>
        <button @click="toggleSelf" class="question-button">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.a.question") }}</p>
        </button>
        <div class="dropdown">
          <p>
            {{ $t("faqs.a.text.a") }}
            <a href="mailto:email-temporario@jeec.ist"><u>jeecist.business@gmail.com</u></a>{{ $t("faqs.a.text.b") }}
          </p>
        </div>
      </li>
      <li>
        <button @click="toggleSelf" class="question-button">
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
      </li><li>
        <button @click="toggleSelf" class="question-button">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.c.question") }}</p>
        </button>
        <div class="dropdown">
          <p>{{ $t("faqs.c.text") }}</p>
        </div>
      </li><li>
        <button @click="toggleSelf" class="question-button">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.d.question") }}</p>
        </button>
        <div class="dropdown">
          <p>{{ $t("faqs.d.text") }}</p>
        </div>
      </li><li>
        <button @click="toggleSelf" class="question-button">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.e.question") }}</p>
        </button>
        <div class="dropdown">
          <p>{{ $t("faqs.e.text") }}</p>
        </div>
      </li><li>
        <button @click="toggleSelf" class="question-button">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.f.question") }}</p>
        </button>
        <div class="dropdown">
          <p>{{ $t("faqs.f.text") }}</p>
        </div>
      </li><li>
        <button @click="toggleSelf" class="question-button">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.g.question") }}</p>
        </button>
        <div class="dropdown">
          <p>{{ $t("faqs.g.text") }}</p>
        </div>
      </li><li>
        <button @click="toggleSelf" class="question-button">
          <div class="toggle-visual">
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <p>{{ $t("faqs.h.question") }}</p>
        </button>
        <div class="dropdown">
          <p style="padding-bottom: 0.5rem;">{{ $t("faqs.h.text.a") }}</p>
          <ul>
            <li style="padding-top: 0.5rem; margin-left: 3ch;" v-for="item in $tm('faqs.h.text.list')">
              <p style="display: inline;"><b>{{ $rt(item.item) }}</b></p>
              <p style="display: inline;">&nbsp;{{ $rt(item.value) }}</p>
            </li>
          </ul>
          <p style="padding-top: 1rem;">{{ $t("faqs.h.text.b") }} <a href="mailto:tesouraria@neecist.org">tesouraria@neecist.org</a></p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
function toggleSelf(e) {
  e.currentTarget.parentElement.classList.toggle("active");
}
</script>

<style scoped>
section {
  padding-top: 6rem;
  color: var(--c-ft-light);
  padding-bottom: 6rem;
}

section h2 {
  padding: 0 3ch;
}

section > ul {
  margin: 0 auto;
  padding: 3rem 8ch;
  list-style-type: none;
  max-width: 1600px
}

section > ul > li {
  display: grid;
  grid-template-rows: min-content 0fr;
  transition: all 0.5s ease-in;
}

section > ul > li.active {
  grid-template-rows: min-content 1fr;
  transition: all 0.5 ease-out;
}

.question-button {
  border: none;
  background: none;
  cursor: pointer;
  background-color: var(--c-bg);
  border-bottom: 2px solid var(--c-acc-blue);
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 1rem 3ch;
  gap: 3ch;
}

.toggle-visual {
  position: relative;
  height: 2.5rem;
  aspect-ratio: 1;
  background-color: var(--c-acc-blue);
  border-radius: 2rem;
  flex-shrink: 0;
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
}

.toggle-visual .line:first-child {
  transform: rotate(0deg);
  transition: all 0.5s ease-in-out;
}

li.active .toggle-visual .line:first-child {
  transform: rotate(360deg);
  transition: all 0.5s ease-in-out;
}

.toggle-visual .line:last-child {
  transform: rotate(-270deg);
  transition: all 0.5s ease-in-out;
}

li.active .toggle-visual .line:last-child {
  transform: rotate(0deg);
  transition: all 0.5s ease-in-out;
}

.dropdown {
  overflow: hidden;
  padding: 0 2ch 0 5ch;
  transition: all 0.5s ease-in-out;
  border-bottom: 2px solid var(--c-acc-blue);
  position: relative;
  top: -2px;
}

li.active .dropdown {
  padding: 2rem 2ch 2rem 5ch;
  top: 0;
  transition: all 0.5s ease-in-out;
}

@media screen and (max-width: 750px) {
  section > h2 {
    text-align: center;
  }

  section > ul {
    padding: 3rem 3ch;
  }
}
</style>