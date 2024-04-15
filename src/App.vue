<template>
  <Initial :isBannerLoaded :directLoad />

  <main
    :class="['zh-CN', { preview, mobile: mobileStore.mobileMode }]"
    :style="{
      '--screen-height': appStore.viewportHeight + 'px',
      '--screen-width': appStore.viewportWidth + 'px',
      '--genshin-font': 'var(--gi-zh-font)'
    }"
  >
    <Toasts />

    <div v-if="isLoaded">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useAppStore } from './stores/app'
import { useMobileStore } from './stores/mobile'
import { mobileDetect } from '@/lib/detector'

import Initial from '@/components/index/InitialLoader.vue'
import Toasts from '@/components/toast/ToastManager.vue'

import './assets/app.css'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const mobileStore = useMobileStore()

const innerHeight = ref(window.innerHeight)
const innerWidth = ref(window.innerWidth)
const isBannerLoaded = ref(false)
const isLoaded = ref(false)
const directLoad = ref(false)
const preview = ref(false)
// const font = ref('--gi-zh-font')

watch(
  [innerHeight, innerWidth],
  ([newHeight, newWidth]) => {
    appStore.setViewport(newHeight, newWidth)
  },
  { immediate: true }
)

const checkPath = () => {
  const path = route.path.split('/')
  directLoad.value = !!path[1]
  preview.value = path[1] === 'screen'

  const validPaths = ['adkey', 'bnlist', 'install', 'privacy-policy', 'screen']
  const isPathValid = validPaths.includes(path[1].toLocaleLowerCase)
  const redirect = path[1] && !isPathValid
  return redirect
}

const handleWindowSize = () => {
  innerHeight.value = window.innerHeight
  innerWidth.value = window.innerWidth
}

const handleRotate = () => {
  if (!mobileStore.mobileMode) {
    const angle = screen.orientation?.angle || 0
    const rotate = angle === 90 || angle === 270
    mobileStore.setMobileMode(rotate)
  }
}

provide('bannerLoader', () => (isBannerLoaded.value = true))
provide('loaded', () => {
  isLoaded.value = true

  // TODO: del this line
  isBannerLoaded.value = true
})

onMounted(() => {
  window.addEventListener('resize', handleWindowSize)
  window.addEventListener('orientationchange', handleRotate)

  if (checkPath()) router.replace('/')

  const url = new URL(window.location.href)
  const searchParams = new URLSearchParams(url.search)
  mobileStore.initMobileMode(
    // detect PWA
    searchParams.get('pwa') === 'true' || !!searchParams.get('pwasc'),

    // detect Mobile
    mobileDetect() || innerWidth.value < 601
  )

  // TODO-later:
  // 1. register service worker;
  //      for better network performance if deployed online
  // 2. wakeLock
  //      prevent screen off when app is open if deployed mobile
  // 3. contentmenu event listener preventDefault
  // 3.   // prevent Righ click (hold on android) on production mode

  // TODO:
  // 1. syncCustomBanner(); // Sync Custom Banner
  // 2. initializeDriveAPI(); // Drive API for cloud Sync
  // 3. document.addEventListener('storageUpdate', () => sync($autoExport));
})

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowSize)
  window.removeEventListener('orientationchange', handleRotate)
})
</script>

<style>
@import './assets/OverlayScrollbars.css';

@font-face {
  font-family: 'GI_Global_Web';
  src: url('/fonts/optimized_global_web.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'GI_JA_Web';
  src: url('/fonts/optimized_jp_web.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'GI_TH_Web';
  src: url('/fonts/optimized_th_web.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'GI_ZH_Web';
  src: url('/fonts/optimized_zh_web.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

:global(.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle) {
  background-color: #d2c69c;
  opacity: 0.5;
}

:global(.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover),
:global(.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:active) {
  background-color: #d2c69c;
  opacity: 1;
}

:global(.os-theme-light > .os-scrollbar-vertical) {
  width: 8px;
}

:global(.os-theme-light > .os-scrollbar-horizontal) {
  height: 8px;
}

main {
  display: block;
  width: var(--screen-width);
  height: var(--screen-height);
  font-family: var(--genshin-font);
  overflow: hidden;
}

.uid {
  display: block;
  position: fixed;
  bottom: 0px;
  right: 2em;
  z-index: 9999;
  color: #fff;
  text-shadow: 0 0 1.5px rgba(0, 0, 0, 0.7);
  font-family: Roboto, sans-serif;
  pointer-events: none;
}

.mobile .uid {
  right: 5%;
}

.preview .uid {
  pointer-events: unset;
  right: unset;
  left: 1rem;
  bottom: 1rem;
}
</style>
