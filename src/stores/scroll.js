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

  const navbarOffset = ref(0);

  return { isSectionIntersecting, navbarOffset }
})
