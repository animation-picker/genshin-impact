<template>
  <div class="overlay" />

  <div class="wish-container" :class="{ show: showMeteor || showWishResult }">
    <h1>hello</h1>
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
import { ref, computed } from 'vue'
import { useAssetStore } from '@/stores/asset'

const assetStore = useAssetStore()

const rollCount = ref(0)
const result = ref([])
const type = ref('')

const nowBanner = computed(() => )

let WishInstance

// wish result handler
const skipSplashArt = ref(false)
const showWishResult = ref(false)
const showMeteor = ref(false)
const single = ref(true)
const meteorStar = ref(3)
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
