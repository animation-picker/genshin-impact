<template>
  <div v-if="status !== 'ok'">error bos</div>

  <Transition name="video">
    <div v-if="settingStore.animatedBG && pageActive.match(/(index|detail|history)/) && !onWish">
      <video
        muted
        loop
        autoplay
        type="video/webm"
        :src="assetStore.assets['bg.webm']"
        :poster="assetStore.assets['wish-background.webp']"
      >
        <track kind="captions" />
      </video>
    </div>
  </Transition>

  <Transition name="banner">
    <!-- Main Banner -->
    <div v-if="pageActive === 'index'">
      <MainWish />

      <div v-if="showMenu">
        <h1>ShowMenu</h1>
        <!-- <component :is="Menu" /> -->
      </div>
    </div>

    <!-- Select Banner -->
    <div v-else-if="pageActive === 'allbanners'">
      <h1>AllBanner</h1>
      <!-- <component :is="AllBanners" /> -->
    </div>

    <!-- Wish Details -->
    <div v-else-if="pageActive === 'details'">
      <h1>Details</h1>
      <!-- <component :is="GachaInfo" page="details" /> -->
    </div>

    <!-- Wish Record -->
    <div v-else-if="pageActive === 'history'">
      <h1>History</h1>
      <!-- <component :is="GachaInfo" page="history" /> -->
    </div>

    <!-- Inventory -->
    <div v-else-if="pageActive === 'inventory'">
      <h1>Inventory</h1>
      <!-- <component :is="Inventory" /> -->
    </div>

    <!-- Shop -->
    <div v-else-if="pageActive === 'shop'">
      <h1>Shop</h1>
      <!-- <component :is="Shop" /> -->
    </div>
  </Transition>

  <div v-if="showObtained">
    <h1>Show Obtained</h1>
    <!-- <component :is="ObtainedItem" :data="{ obtainedData }" /> -->
  </div>

  <!-- Utility -->
  <div v-if="showConvertModal">
    <h1>showConvertModal</h1>
    <!-- <component :is="ModalConvert" /> -->
  </div>

  <div v-if="chatLoaded">
    <h1>chatLoaded</h1>
    <!-- <component :is="Feedback" :show="showChat" /> -->
  </div>

  <div v-if="showWelkinScreen">
    <h1>showWelkin</h1>
    <!-- <welkinCheckin /> -->
  </div>

  <div v-if="showWelcomeModal">
    <h1>showWelcomeModal</h1>
    <div v-if="sharedId">
      <!-- <ModalInitBanner {sharedId} /> -->
    </div>
    <div v-else>
      <!-- <ModalWelcome /> -->
    </div>
  </div>

  <PreloadMeteor />
</template>

<script setup>
import { ref, provide, watchEffect, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAssetStore } from '@/stores/asset'
import { useAudioStore } from '@/stores/audio'
import { useSettingStore } from '@/stores/setting'
import hotkeys from 'hotkeys-js'

import MainWish from '@/components/wish/MashWish.vue'
import PreloadMeteor from '@/components/index/PreloadMeteor.vue'

const router = useRouter()
const assetStore = useAssetStore()
const audioStore = useAudioStore()
const settingStore = useSettingStore()

const status = ref('')
const pageActive = ref('index')
const showWelcomeModal = ref(true)
const sharedId = ref('')
const appReady = ref(false)
const onWish = ref(false)
const showWelkinScreen = ref(false)
const showMenu = ref(false)
const showObtained = ref(false)
const obtainedData = ref({})
const showConvertModal = ref(false)
const chatLoaded = ref(false)
const showChat = ref(false)

// background music
watchEffect(() => {
  if (showWelcomeModal.value) return
  if (pageActive.value !== 'index' || onWish.value) audioStore.pauseSfx('wishBacksound')
  else audioStore.playSfx('wishBacksound')
})

const bgmHandle = () => {
  if (showWelcomeModal.value) return // user is not ready to wish
  if (onWish.value) return // don't resume/pause if user on wishing
  if (pageActive.value !== 'index') return // don't handle BGM if not index page

  const mode = document.visibilityState
  if (mode === 'visible') audioStore.playSfx('wishBacksound')
  else audioStore.pauseSfx('wishBacksound')
}

// welkin checkin
const welkinCheckin = () => {
  console.log('todo: welkin checkin')
  // const { remaining, diff, latestCheckIn } = dailyWelkin.getData()
  // showWelkinScreen.value = remaining > 0 && remaining - diff >= 0 && diff > 0
  // if (latestCheckIn) return dailyWelkin.checkin()
}

// menu
const handleMenu = () => {
  showMenu.value = !showMenu.value
  audioStore.playSfx(!showMenu.value ? 'close' : 'click')
}

// page navigation
const navigate = (page, updateState = true) => {
  let beforeNavigate = pageActive.value
  pageActive.value = page
  showMenu.value = false
  hotkeys.setScope(page)

  if (beforeNavigate === pageActive.value) return
  hotkeys.deleteScope(beforeNavigate)

  if (!updateState) return
  if (beforeNavigate !== 'index') router.go(-1)
  else router.push({ name: page })
}

// component loader
let AllBanners, GachaInfo, Inventory, Shop, Feedback, Menu, ObtainedItem, ModalConvert
const asyncLoadComponent = async () => {
  // ObtainedItem = (await import('$lib/components/ObtainedItem.svelte')).default
  // ModalConvert = (await import('./_index/ModalConvert.svelte')).default
  // Menu = (await import('./_menu/index.svelte')).default
  // GachaInfo = (await import('./_gachainfo/index.svelte')).default
  // AllBanners = (await import('./_allbanners/index.svelte')).default
  // Inventory = (await import('./_inventory/index.svelte')).default
  // Shop = (await import('./_shop/index.svelte')).default
  // Feedback = (await import('./_feedback/index.svelte')).default
}

// switching banner
const bannerLoaded = inject('bannerLoaded')
const loadBanner = async (patchPhase) => {
  console.log('loadBanner', patchPhase)
  // const initBanner = await initializeBanner()
  const initBanner = { status: 'ok' }
  status.value = initBanner.status
  bannerLoaded()
}

// welcome modal && custom banner modal
const startApp = () => {
  appReady.value = true
  hotkeys.setScope('index')
  showWelcomeModal.value = false
  welkinCheckin()
  audioStore.playSfx()
}

// obtained
const openObtained = (data) => {
  obtainedData.value = data
  showObtained.value = true
}

const closeObtained = () => {
  showObtained.value = false
  obtainedData.value = {}
}

// feedback
const chatToogle = () => {
  chatLoaded.value = true
  showChat.value = !showChat.value
  audioStore.playSfx(showChat.value ? 'shopnav' : 'close')
}

watchEffect(() => {
  hotkeys('o', pageActive.value, chatToogle)
})

provide('onWish', onWish)
provide('appReady', appReady)
provide('query', ref('')) // query store to help finding a banner
provide('readyToPull', ref(true)) // ready to pull if meteor animation are loaded already
provide('closeWelkin', () => (showWelkinScreen.value = false))
provide('startApp', startApp) // welcome modal && custom banner modal
provide('handleMenu', handleMenu)
provide('navigate', navigate)
provide('openObtained', openObtained)
provide('closeObtained', closeObtained)
provide('openConvertModal', () => (showConvertModal.value = true))
provide('closeConvertModal', () => (showConvertModal.value = false))
provide('chatToogle', chatToogle)

onMounted(() => {
  console.log('appView.onMounted')
  window.addEventListener('popstate', (e) => {
    if (e.state.page) return
    if (pageActive.value === 'index') return
    navigate('index')
  })
  document.addEventListener('visibilitychange', bgmHandle)

  asyncLoadComponent()
})
</script>

<style scoped>
video {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 20%;
}

.video-enter-active,
.video-leave-active {
  transition: opacity 2s;
}

.video-enter-from,
.video-leave-to {
  opacity: 0;
}

.banner-enter-active,
.banner-leave-active {
  transition: opacity 0.5s;
}

.banner-enter-from,
.banner-leave-to {
  opacity: 0;
}
</style>
