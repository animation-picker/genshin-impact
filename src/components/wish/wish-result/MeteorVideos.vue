<template>
  <div :class="['meteor-wrapper', { show }]" @mousedown="() => (showSkipButton.value = true)">
    <div class="video">
      <video ref="v3star" :src="assetStore.assets['3star-single.mp4']" type="video/mp4">
        <track kind="captions" />
      </video>

      <video ref="v4starSingle" :src="assetStore.assets['4star-single.mp4']" type="video/mp4">
        <track kind="captions" />
      </video>

      <video ref="v4star" :src="assetStore.assets['4star-multi.mp4']" type="video/mp4">
        <track kind="captions" />
      </video>

      <video ref="v5starSingle" :src="assetStore.assets['5star-single.mp4']" type="video/mp4">
        <track kind="captions" />
      </video>

      <video ref="v5star" :src="assetStore.assets['5star-multi.mp4']" type="video/mp4">
        <track kind="captions" />
      </video>

      <Transition name="fade">
        <div v-if="showSkipButton">
          <button class="skip" @click="skip">跳过<i class="gi-caret-up" /></button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, watch } from 'vue'
import { playSfx } from '@/lib/audio/audio'
import { useAssetStore } from '@/stores/asset'
import { useToastStore } from '@/stores/toast'
import { useLocalStore } from '@/stores/local'
import hotkeys from 'hotkeys-js'

// stores
const assetStore = useAssetStore()
const toastStore = useToastStore()
const localStore = useLocalStore()

const props = defineProps({
  rarity: {
    type: Number,
    default: 3
  },
  show: {
    type: Boolean,
    default: false
  },
  isSingle: {
    type: Boolean,
    default: false
  }
})

// refs
const v3star = ref(null)
const v4starSingle = ref(null)
const v4star = ref(null)
const v5starSingle = ref(null)
const v5star = ref(null)
const showSkipButton = ref(false)

const showSplashArt = inject('showSplashArt')
const meteorEnd = ({ skip = false } = {}) => {
  showSplashArt({ skip })
  showSkipButton.value = false
}

const skip = () => {
  playSfx()
  const videoDOMS = [
    v3star.value,
    v4starSingle.value,
    v4star.value,
    v5starSingle.value,
    v5star.value
  ]
  meteorEnd({ skip: true })
  videoDOMS.forEach((video) => {
    video.load()
    video.style.display = 'none'
  })
}

const showVideoHandle = async (rarity, single = true) => {
  const muted = localStore.muted.value
  let videoContent = v3star
  if (single && rarity !== 3) {
    videoContent.value = rarity === 5 ? v5starSingle : v4starSingle
  }
  if (!single && rarity !== 3) {
    videoContent.value = rarity === 5 ? v5star : v4star
  }

  if (!videoContent.value || videoContent.value.error || isNaN(videoContent.value.duration)) {
    toastStore.pushToast('祈愿动画加载失败')
    console.error(
      "can't play Meteor Animation because it cannot be loaded",
      videoContent.value.error
    )
    return meteorEnd()
  }
  videoContent.value.style.display = 'unset'
  videoContent.value.muted = !!muted
  await videoContent.value.play()
  return
}

watch(
  () => props.show,
  (sh) => {
    if (sh) showVideoHandle(props.rarity, props.isSingle)
  },
  { immediate: true }
)

// shrotcut
hotkeys('esc', 'index', (e) => {
  if (!props.show) return
  e.preventDefault()
  skip()
})

hotkeys('enter', 'index', (e) => {
  if (!props.show) return
  e.preventDefault()
  if (props.showSkipButton) return skip()
  showSkipButton.value = true
})

onMounted(() => {
  const videoDOMS = [
    v3star.value,
    v4starSingle.value,
    v4star.value,
    v5starSingle.value,
    v5star.value
  ]
  videoDOMS.forEach((video) => {
    video.addEventListener('ended', () => {
      video.style.display = 'none'
      video.load()
      meteorEnd()
    })
  })
})
</script>

<style scoped>
.meteor-wrapper {
  width: 100vw;
  height: var(--screen-height);
  position: absolute;
  top: 0;
  left: 0;
}
.meteor-wrapper.show {
  display: block;
  background-color: #fff;
}
.video {
  position: relative;
  width: 100vw;
  height: 100%;
}

.skip {
  position: absolute;
  top: 30px;
  right: 2%;
  color: #fff;
  font-size: 1.2rem;
  z-index: 10;
}

.gi-caret-up {
  display: inline-block;
  transform: rotate(90deg) translateX(-0.1rem);
  vertical-align: middle;
  margin-left: -0.5em;
}

:global(.mobile) .skip {
  font-size: 0.8rem;
  top: 0.3rem;
  right: 6%;
}
video {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 105%;
  height: 105%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
