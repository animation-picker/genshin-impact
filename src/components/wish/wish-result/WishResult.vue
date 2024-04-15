<template>
  <h1>Wish Result Component</h1>
</template>

<script setup>
import { computed, inject, provide, ref } from 'vue'
import { useAssetStore } from '@/stores/asset'

// stores
const assetStore = useAssetStore()

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  skip: {
    type: Boolean,
    default: false
  },
  standalone: {
    type: Boolean,
    default: false
  },
  isOutfit: {
    type: Boolean,
    default: false
  }
})

const preview = ref(props.standalone || false)
const lc = ref('zh-CN'.toLowerCase())
const isYuanshen = lc.value.match(/(cn|ja)/)

const splashBG = computed(() =>
  props.isOutfit
    ? assetStore.assets['outfit-background.webp']
    : assetStore.assets['splash-background.webp']
)

const showResultList = ref(false)
const activeIndex = ref(0)

const skipHandle = () => {
  playSfx()
  showResultList.value = true
}

const closeResult = inject('closeResult')
const closeHandle = () => {
  playSfx('close')
  closeResult()
  return
}

provide('preview', (val) => (preview.value = val))
</script>

<style scoped>
.skip,
.close {
  position: fixed;
  top: 30px;
  right: 2%;
  z-index: 10;
}

:global(.mobile) .close {
  top: 0.3rem;
  right: 6%;
}

.skip {
  color: #fff;
  font-size: 1.2rem;
}

.gi-caret-up {
  display: inline-block;
  transform: rotate(90deg) translateX(-0.1rem);
  vertical-align: middle;
  margin-left: -0.5em;
}

:global(.mobile) .skip {
  font-size: 0.8rem;
  right: 5%;
  top: 0.5rem;
}

.wish-result {
  background-size: cover;
  background-position: center;
}

.wish-result {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.touch-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: +5;
}

.zoomist-container {
  aspect-ratio: 1/1;
}
.art-wrapper {
  width: 100%;
  height: 100%;
}

.share {
  display: flex;
  width: 100%;
  text-align: right;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 5%;
  right: 8%;
  color: #fff;
  font-size: 0.8rem;
  z-index: 999;
}

button:active {
  transform: scale(0.9);
}

:global(.preview) .uid {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  display: block !important;
  color: #fff;
  text-shadow: 0 0 1.5px rgba(0, 0, 0, 0.7);
}
.logo,
.uid {
  display: none;
  transition: all 0.1.5s;
  z-index: 999;
  pointer-events: none;
}

:global(.preview) .logo {
  display: block;
  width: 30vh;
  max-width: 30%;
  position: fixed;
  bottom: 0px;
  right: 2rem;
}

.logo.cn {
  max-height: 20vh;
  width: 20vh;
}
</style>
