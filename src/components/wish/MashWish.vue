<template>
  <div class="overlay" />

  <div :class="['wish-container', { show: showMeteor || showWishResult }]">
    <Meteor :show="showMeteor" :isSingle="single" :rarity="meteorStar" />
    <div v-if="showWishResult">
      <!-- TODO: impl this compoent -->
      <WishResult :list="result" :skip="skipSplashArt" />
    </div>
  </div>

  <section
    :style="{ 'background-image': 'url(' + assetStore.assets['wish-background.webp'] + ')' }"
  >
    <div class="col top">
      <!-- <Header :bannerType /> -->
    </div>

    <div class="col banner">
      <div class="item">
        <h3>BannerItem</h3>
        <!-- <BannerItem /> -->
      </div>

      <!-- // in:fly={{ y: 20, duration: 1000 }} -->
      <div class="col button">
        <h3>Footer</h3>
        <!-- <Footer :bannerType /> -->
      </div>
    </div>
  </section>

  <div v-if="openEpitomized">
    <!-- <EpitomizedModal /> -->
  </div>

  <div v-if="showConvertModal">
    <!-- <OutOfPrimogem isEventBanner={isEvent} {rollCost} /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, provide, inject } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAssetStore } from '@/stores/asset'
import { useCurrencyStore } from '@/stores/currency'
import { useSettingStore } from '@/stores/setting'

import Meteor from '@/components/wish/wish-result/MeteorVideos.vue'

const appStore = useAppStore()
const assetStore = useAssetStore()
const currencyStore = useCurrencyStore()
const settingStore = useSettingStore()

const rollCount = ref(0)
const result = ref([])
const openEpitomized = ref(false)
const multi = ref(false)
const rollCost = ref()
const showConvertModal = ref(false)
const skipSplashArt = ref(false)
const showWishResult = ref(false)
const showMeteor = ref(false)
const single = ref(true)
const meteorStar = ref(3)

const nowBanner = computed(() => appStore.bannerList[appStore.activeBanner] || {})
const type = computed(() => nowBanner.value.type)
const bannerType = computed(() => type.value || '')
const isEvent = computed(() => bannerType.value.match(/(event|chronicled)/))
const isUnlimited = computed(() => settingStore.wishAmount.value === 'unlimited')
const currencyUsed = computed(() =>
  isEvent.value ? currencyStore.intertwined : currencyStore.acquaint
)

let WishInstance

// load wish configuration when changing banner version
const initialWish = async ({ patch, phase }) => {
  if (!patch || !phase) return
  // WishInstance = await WISH.init(patch, phase, $customData)
}

const getIndexOfCharBanner = () => {
  console.log('getIndexOfCharBanner')
  // const events = $bannerList.filter(({ type }) => type === 'character-event')
  // const index = events.findIndex(({ character }) => character === nowBanner.value.character)
  // return index
}

// epitomized modal
const handleEpitomizedModal = () => (openEpitomized.value = !openEpitomized.value)

// wish roller
const onWish = inject('onWish')

const doRoll = async (count, bannerToRoll) => {
  console.log('doRoll')
  // rollCount.value = count
  // multi.value = count > 1
  // const tmp = []

  // rollCost.value = bannerToRoll === 'beginner' ? 8 : count
  // if (!isUnlimited.value && rollCost.value > currencyUsed.value)
  //   return (showConvertModal.value = true)
  // const indexOfCharBanner = bannerToRoll === 'character-event' ? getIndexOfCharBanner() : 0
  // onWish.set(true)

  // for (let i = 0; i < count; i++) {
  //   const result = await roll(bannerToRoll, WishInstance, indexOfCharBanner)
  //   tmp.push(result)
  // }

  // result.value = tmp
  // handleMeteorAnimation()
  // if (isUnlimited.value) return
  // updateMilestones()
  // updateFatesBalance(bannerToRoll)
}

const updateFatesBalance = (banner) => {
  console.log('updateFatesBalance')

  // const isAcquaint = ['beginner', 'standard'].includes(banner)
  // const funds = isAcquaint ? acquaint : intertwined
  // funds.update((n) => {
  //   const afterUpdate = n - (banner === 'beginner' && rollCount.value > 1 ? 8 : rollCount)
  //   localBalance.set(isAcquaint ? 'acquaint' : 'intertwined', afterUpdate)
  //   return afterUpdate
  // })
}
const updateMilestones = () => {
  console.log('updateMilestones')
  // const update = (type) => {
  //   const qty = result.value.reduce((prev, { bonusQty, bonusType }) => {
  //     return prev + (bonusType === type ? bonusQty : 0)
  //   }, 0)

  //   const milestone = type === 'stardust' ? stardust : starglitter
  //   milestone.update((n) => {
  //     const afterUpdate = n + qty
  //     localBalance.set(type, afterUpdate)
  //     return afterUpdate
  //   })
  // }

  // update('starglitter')
  // update('stardust')
}

// wish result handler
const closeResult = () => {
  showWishResult.value = false
  onWish.value = false
  checkObtained()
}

const showSplashArt = ({ skip = false } = {}) => {
  skipSplashArt.value = skip
  showMeteor.value = false
  showWishResult.value = true
}

const handleMeteorAnimation = () => {
  const autoSkip = settingStore.autoSkip.value
  if (autoSkip) return showSplashArt({ skip: true })

  const stars = result.value.map(({ rarity }) => rarity)
  single.value = stars.length === 1
  meteorStar.value = 3
  if (stars.includes(4)) meteorStar.value = 4
  if (stars.includes(5)) meteorStar.value = 5
  showMeteor.value = true
}

// modal convert
const closeModal = () => {
  // audioS
}

provide('handleEpitomizedModal', handleEpitomizedModal)
provide('doRoll', doRoll)
provide('closeResult', closeResult)
provide('showsplashArt', showSplashArt)

onMounted(() => {
  // activeVersion.subscribe(initialWish)
})
</script>

<style>
section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-position: 20%;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 50vh rgba(0, 0, 0, 0.4) inset;
}

.wish-container {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 15;
  top: 0;
  left: 0;
  pointer-events: none;
}

.wish-container.show {
  pointer-events: unset;
}

.top,
.banner,
.button,
.item {
  display: block;
  width: 100%;
}

.top {
  min-height: 70px;
}
.banner,
.item {
  height: 100%;
}
.item {
  position: relative;
}
.banner {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.button {
  height: 120px;
}

/* Mobile */
:global(.mobile) section {
  flex-direction: row;
}
:global(.mobile) .top {
  height: 100%;
  width: min-content;
}
:global(.mobile) .banner {
  width: 120%;
  margin-left: -20px;
}
:global(.mobile) .button {
  height: 50px;
  margin-bottom: 0.2rem;
}
</style>
