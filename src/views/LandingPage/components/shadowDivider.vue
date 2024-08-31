<template>
  <div v-if="!bottom" class="divider top">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path v-if="!flipped" d="M 0 100 V 50 L 100 0 V 100 Z"></path>
      <path v-else d="M 100 100 V 50 L 0 0 V 100 Z"></path>
    </svg>
  </div>
  <div v-else class="divider bottom">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path v-if="!flipped" d="M 100 0 V 50 L 0 100 V 0 Z"></path>
      <path v-else d="M 0 0 V 50 L 100 100 V 0 Z"></path>
    </svg>
  </div>
</template>

<script setup>
defineProps({
  flipped: {
    type: Boolean,
    default: false,
  },
  bottom: {
    type: Boolean,
    default: false,
  }
})
</script>

<style scoped>
.divider {
  position: absolute;
  left: 0;
  line-height: 0;
  z-index: -1;
  width: 100%;
  height: 60px;
}

.divider.top {
  top: 30px;
  transform: translateY(-100%);
  filter: drop-shadow(0 0 20px color-mix(in srgb, var(--c-bg) 40%, transparent));
}

.divider.bottom {
  bottom: 30px;
  transform: translateY(100%);
  filter: drop-shadow(0 0px 20px color-mix(in srgb, var(--c-bg) 40%, transparent));
}

.divider svg {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.divider svg path {
 fill: var(--c-acc-blue);
}
</style>

