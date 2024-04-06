import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('settings', () => {
  const autoskip = ref(false)
  const wishAmount = ref('default')
  const multipull = ref(10)
  const animatedBG = ref(false)

  return {
    autoskip,
    wishAmount,
    multipull,
    animatedBG
  }
})
