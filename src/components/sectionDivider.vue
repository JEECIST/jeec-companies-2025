<template>
  <div>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path v-if="!flipped" d="M 0 100 V 90 L 100 0 V 100 z"></path>
      <path v-else d="M 100 100 V 90 L 0 0 V 100 Z"></path>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  flipped: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped>
div {
  position: absolute;
  top: 1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: translateY(-100%);

  /*

  Requires: 

  --color: #hhhhhh; variable;
  height: x; property 

  */
}

div svg {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

div svg path {
 fill: var(--color);
}
</style>

