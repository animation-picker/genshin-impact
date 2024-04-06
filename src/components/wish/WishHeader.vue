<template>
  <!-- <div id="header" style={headerHeightstyle}></div> -->

  <div id="header">
    <!-- // n:fly={{ y: -20, duration: 800 }} -->
    <div class="top">
      <h1 class="wish-title">
        <img alt="Brand" crossorigin="anonymous" :src="assetStore.assets['brand.png']" />

        <div v-if="!appStore.editorMode">
          <span>Wish</span>
        </div>
        <div v-else>
          <span>Customize Banner</span>
        </div>

        <button class="help" @click="handleMenu" title="Setting" aria-label="Setting">
          <i class="gi-help" />
        </button>

        <button class="chat" @click="chatToggle" title="Chats" aria-label="Chats">
          <i class="gi-chat" />
        </button>

        <div v-if="!mobileStore.isPWA || mobileStore.isMobiles">
          <button
            class="fullscreen"
            @click="handleFullscreen"
            title="FullScreen"
            aria-label="FullScreen"
          >
            <i :class="!fullscreen ? 'gi-fullscreen' : 'gi-shrink'" />
          </button>
        </div>
      </h1>
      <div class="budget">
        <div v-if="!appStore.editorMode">
          <div class="fates">
            <div v-if="mobileStore.mobileMode">
              <MyFund type="starglitter">
                {{ currencyStore.starglitter }}
              </MyFund>

              <MyFund type="stardust">
                {{ currencyStore.stardust }}
              </MyFund>
            </div>

            <MyFund type="primogem" plusbutton>
              {{ unlimitedWish ? '∞' : currencyStore.primogem }}
            </MyFund>
            <MyFund :type="isEvent ? 'intertwined' : 'acquaint'">
              {{ unlimitedWish ? '∞' : balance }}
            </MyFund>
          </div>
        </div>
        <div v-else>
          <button
            class="close"
            title="Cancel Edit"
            @click="
              () => {
                appStore.editorMode = false
                playSfx('close')
              }
            "
          >
            <i class="gi-close" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="!appStore.editorMode && !appStore.isCustomBanner">
      <!-- // in:inTransition={{ mobile: $mobileMode }} -->
      <div class="banner-button">
        <div class="bg" :style="headerHeightstyle">
          <img alt="Brand" crossorigin="anonymous" :src="assetStore.assets['brand.png']" />
        </div>

        <!-- <div class="button-wrapper" :style="bannlerL"></div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useCurrencyStore } from '@/stores/currency'
import { useSettingStore } from '@/stores/setting'
import { useMobileStore } from '@/stores/mobile'
import { useAssetStore } from '@/stores/asset'
import { playSfx } from '@/lib/audio/audio'
import hotkeys from 'hotkeys-js'

import MyFund from '@/components/misc/MyFund.vue'

const appStore = useAppStore()
const currencyStore = useCurrencyStore()
const settingStore = useSettingStore()
const mobileStore = useMobileStore()
const assetStore = useAssetStore()

const props = defineProps({
  bannerType: {
    type: String,
    default: ''
  }
})

const isEvent = computed(() => props.bannerType.match(/(event|chronicled)/))
const balance = computed(() => (isEvent.value ? currencyStore.intertwined : currencyStore.acquaint))
const unlimitedWish = computed(() => settingStore.wishAmount.value === 'unlimited')

const inTransition = (node, args) => {
  //   return args.mobile ? fly(node, { x: -20, duration: 1000 }) : fly(node, { y: -20, duration: 1000 })
}

const selectBanner = (banner) => {
  if (appStore.activeBanner.value === banner) return
  activeBanner.value = banner
  playSfx('changebanner')
}

const chatToggle = inject('chatToggle')
const navigate = inject('navigate')

const previousClick = () => {
  navigate('allbanners')
  playSfx()
}

const handleMenu = inject('handleMenu')
// $: headerHeightstyle = $mobileMode ? `height: ${$viewportHeight}px` : '';
const fullscreen = computed(() => appStore.viewportHeight === window.screen.height)

// const handleFullscreen = () => {
// 		if (!fullscreen) {
// 			const body = document.body;
// 			if (body.requestFullscreen) return body.requestFullscreen();
// 			if (body.webkitRequestFullscreen) return body.webkitRequestFullscreen();
// 			if (body.msRequestFullscreen) return body?.msRequestFullscreen();
// 		} else {
// 			if (document.exitFullscreen) return document?.exitFullscreen();
// 			if (document.webkitExitFullscreen) return document?.webkitExitFullscreen();
// 			if (document.msExitFullscreen) return document?.msExitFullscreen();
// 		}
// 	};

// shortcut
const onWish = inject('onWish')
hotkeys('esc', 'index', (e) => {
  if (!onWish.value) return
  e.preventDefault()
  previousClick()
})

hotkeys('m', 'index', (e) => {
  if (!onWish.value) return
  e.preventDefault()
  handleMenu()
})
</script>

<style scoped>
#header {
  position: relative;
  display: block;
  width: 100%;
  padding: 30px 2%;
  z-index: 5;
}

h1 button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-left: 0.7rem;
  line-height: 0;
  transition: all 0.2s;
}

h1 button:hover {
  background-color: var(--tertiary-color);
  color: #3a4156;
}

.help {
  border-radius: 50px;
  border: 0.15rem solid #fff;
  width: 1.7rem;
  height: 1.7rem;
}

.fullscreen,
.chat {
  border-color: transparent;
  transform: scale(1.3);
  width: 1.3rem;
  height: 1.3rem;
}

.chat {
  border-radius: 100%;
}

.bg {
  display: none;
}
.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
}

.wish-title {
  color: #fff;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 110%;
}

.wish-title img {
  width: 30px;
  margin-right: 15px;
}

.budget {
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.banner-button,
.button-wrapper {
  text-align: center;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
}

/* mobile */

:global(.mobile) #header {
  padding: 0 !important;
}

:global(.mobile) .top {
  position: fixed;
  top: 0;
  right: 2%;
  width: calc(100% - 100px);
  display: flex;
  justify-content: space-between;
  padding-right: 4%;
}

:global(.mobile) .wish-title img {
  display: none;
}

:global(.mobile) .button-wrapper {
  flex-direction: column;
  align-items: center;
  width: 120px;
  margin-top: 0;
  height: 100%;
  justify-content: flex-start;
  padding-top: 2.5rem;
}

:global(.mobile) .bg {
  display: block;
  position: absolute;
  top: 0;
  left: 50%;
  width: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
  transform: translateX(-50%);
  text-align: center;
  border: solid rgba(207, 186, 143, 0.5);
  border-width: 0 2px;
}
.bg > img {
  width: 60%;
  margin-top: 3px;
}

@media screen and (min-width: 975px) {
  :global(main):not(.mobile) .banner-button {
    position: absolute;
    max-width: 50%;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0;
  }
}
@media screen and (max-width: 975px) {
  :global(main):not(.mobile) .button-wrapper {
    flex-wrap: wrap;
  }
}
</style>
