import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAssetStore = defineStore('assets', () => {
  // asset name -> asset url
  const assets = ref({})

  const initAssets = (loadedAssets, list) => {
    let pv = {}
    loadedAssets.forEach(({ url, name }) => (pv[name] = url))
    assets.value = { ...pv, ...list }
  }

  const addAssets = (loadedAssets) => {
    let pv = {}
    loadedAssets.forEach(({ url, name }) => (pv[name] = url))
    assets.value = { ...pv, ...assets.value }
  }

  return {
    assets,
    initAssets,
    addAssets
  }
})
