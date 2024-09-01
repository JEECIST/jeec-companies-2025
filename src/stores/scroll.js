import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useScrollStore = defineStore('scroll', () => {
  const isSectionIntersecting = ref({
    b: false,
    d: false,
    e: false,
    f: false,
    g: false,
    h: false,
  })

  const navbarFixed = ref(false);

  return { isSectionIntersecting, navbarFixed }
})
