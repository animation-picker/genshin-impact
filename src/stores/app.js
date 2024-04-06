import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const preloadVersion = ref({})
  const activeVersion = ref({})
  const bannerList = ref([])
  const activeBanner = ref(0)

  const showBeginner = ref(true)
  const beginnerRemaining = ref(20)

  const proUser = ref(false)
  const showAd = ref(false)

  const viewportHeight = ref(0)
  const viewportWidth = ref(0)

  const editorMode = ref(false)
  const editId = ref(0)
  const customData = ref({})
  const isCustom = ref(false)
  const isCustomBanner = ref(false)

  const setViewport = (height, width) => {
    viewportHeight.value = height
    viewportWidth.value = width
  }

  return {
    preloadVersion,
    activeVersion,
    bannerList,
    activeBanner,
    proUser,
    showAd,
    viewportHeight,
    viewportWidth,
    editorMode,
    editId,
    customData,
    isCustom,
    isCustomBanner,
    setViewport
  }
})
