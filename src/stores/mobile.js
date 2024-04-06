import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMobileStore = defineStore('mobile', () => {
  const mobileMode = ref(false)
  const isMobile = ref(false)
  const isPWA = ref(false)

  const showRotateIcon = computed(() => isMobile.value && !mobileMode.value)

  const initMobileMode = (pwa, mobile) => {
    isPWA.value = pwa
    isMobile.value = mobile
    if (isPWA.value) return (mobileMode.value = true)
  }

  const setMobileMode = (mode) => {
    mobileMode.value = mode
  }

  return {
    isPWA,
    mobileMode,
    showRotateIcon,
    initMobileMode,
    setMobileMode
  }
})
