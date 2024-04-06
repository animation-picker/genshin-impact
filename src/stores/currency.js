import { ref } from 'vue'
import { defineStore } from 'pinia'
import { initialAmount } from '@/lib/data/wish-setup.json'

const { fates, genesis: igen, primogem: ipri } = initialAmount

export const useCurrencyStore = defineStore('currency', () => {
  const gensis = ref(igen)
  const primogem = ref(ipri)
  const acquaint = ref(fates)
  const intertwined = ref(fates)
  const stardust = ref(0)
  const starglitter = ref(0)
  const pricelist = ref({})

  return {
    gensis,
    primogem,
    acquaint,
    intertwined,
    stardust,
    starglitter,
    pricelist
  }
})
