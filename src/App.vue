<template>
  <main>
    <p>{{ $t('test') }}</p>
    <router-view></router-view>
  </main>
</template>

<script setup>
import i18n from './i18n';

console.log(i18n.global.availableLocales)
</script>