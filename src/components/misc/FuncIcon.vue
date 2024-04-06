<template>
  <div v-if="type !== 'loader'">
    <img :alt="type" :src="pic[type]" :width :height :style />
  </div>
  <div v-else>
    <div
      class="loader-icon"
      :style="{
        '--width': width,
        '--height': height
      }"
    >
      <span />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAssetStore } from '@/stores/asset'

defineProps({
  type: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '20px'
  },
  height: {
    type: String,
    default: 'auto'
  },
  style: {
    type: String,
    default: ''
  }
})

const assetStore = useAssetStore()

const pic = computed(() => ({
  acquaint: assetStore.assets['acquaint-fate.webp'],
  intertwined: assetStore.assets['intertwined-fate.webp'],
  stardust: assetStore.assets['masterless-stardust.webp'],
  starglitter: assetStore.assets['masterless-starglitter.webp'],
  primogem: assetStore.assets['primogem.webp'],
  genesis: assetStore.assets['genesis.webp']
}))
</script>

<style scoped>
.loader-icon {
  position: relative;
  aspect-ratio: 1/1;
}
span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
span::before,
span::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  border: calc(0.15 * var(--width)) solid var(--text-color);
  border-radius: 50%;
  opacity: 0.5;
}
span::before {
  animation: loaderAnim1 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
}

span::after {
  animation: loaderAnim2 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s infinite;
}

@keyframes loaderAnim1 {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes loaderAnim2 {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
