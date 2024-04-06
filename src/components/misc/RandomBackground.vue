<template>
  <img class="bg" alt="background" :src="randomImg" />
</template>

<script setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/asset'

const assetStore = useAssetStore()

const min = 1
const max = 20

const randomImg = computed(() => {
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
  return assetStore.assets[`bg${randomNum}.webp`]
})
</script>

<style scoped>
.bg {
  width: 100vw;
  height: 100%;
  object-fit: cover;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
  filter: blur(10px);
  -webkit-filter: blur(10);
  z-index: +1;
}
</style>
