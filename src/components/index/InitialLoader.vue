<template>
  <div v-if="anyError && !isLoaded">
    <div class="modal">
      <div class="modal-content">
        <div class="msg">
          An error occurred while trying to load some assets, this may affect your wish experience.
          <br />
          <small>
            <small>
              If you think this is a mistake, please contact us at
              <a href="https://github.com/cyanial/genshin-impact-picker" style="color: #7289da">
                Github </a
              >!
            </small>
          </small>
        </div>
        <div class="btn">
          <button class="reload" @click="this.$router.go(0)">Reload</button>
          <button class="open" @click="handleLoaded">Open anyway</button>
        </div>
      </div>
    </div>
  </div>

  <Transition name="fade">
    <div v-if="!((isBannerLoaded || directLoad) && isLoaded && current >= 100)">
      <div class="loader">
        <div class="content">
          <div class="progress">
            <div class="icon">
              <i class="gi-pyro" />
              <i class="gi-hydro" />
              <i class="gi-anemo" />
              <i class="gi-electro" />
              <i class="gi-dendro" />
              <i class="gi-cryo" />
              <i class="gi-geo" />
            </div>
            <div class="blend">
              <div class="unfilled" />
              <div class="filled animate" :style="{ width: current.toFixed(2) + '%' }"></div>
            </div>
          </div>

          <Transition name="fade">
            <div v-show="current < 0">
              <div class="text connecting">Connecting</div>
            </div>
          </Transition>
          <Transition name="fade">
            <div v-show="current >= 0">
              <div class="text">{{ current > 99 ? 100 : current.toFixed() }} %</div>
            </div>
          </Transition>

          <div v-if="mobileStore.showRotateIcon">
            <div class="rotate">
              <i class="gi-rotate-phone" />
              <span> Rotate for better experience </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { listingAssets } from '@/lib/assets'
import { blobAssets, itemList } from '@/lib/assets'
import { useAssetStore } from '@/stores/asset'
import { useMobileStore } from '@/stores/mobile'

const assetStore = useAssetStore()
const mobileStore = useMobileStore()

const props = defineProps({
  isBannerLoaded: Boolean,
  directLoad: Boolean
})

const anyError = ref(false)
const isLoaded = ref(false)
const current = ref(-1)

const loaded = inject('loaded')

const handleLoaded = () => {
  loaded()
  isLoaded.value = true
}

const assetInit = async (param) => {
  const ispreview = param === 'preview'
  const arr = []
  let i = 0
  const raw = ispreview ? listingAssets('preview') : listingAssets()
  for await (const assetData of raw) {
    i++
    const { path, asset } = assetData
    const blob = await blobAssets(path)
    if (blob === 'error') anyError.value = true
    arr.push({ url: blob, name: asset })
    current.value = (i / raw.length) * 100
  }

  const loadedAssets = await Promise.all(arr)
  const list = itemList()
  assetStore.initAssets(loadedAssets, list)

  if (anyError.value === false) handleLoaded()
}

onMounted(() => {
  assetInit(props.directLoad ? 'preview' : '')
})
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.4rem;
  width: 500px;
  max-width: 80%;
  padding: 2%;
}

.btn {
  padding-top: 5%;
  width: 100%;
}
button {
  color: #fff;
  padding: 2% 6%;
}

.reload {
  background-color: #94866e;
}

.open {
  background-color: #353533;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2vw;
  color: #666666;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 9998;
}

@media screen and (max-width: 600px) {
  .loader {
    font-size: 4vh;
  }
}

.content {
  display: block;
  text-align: center;
}

.text {
  font-size: 1rem;
  height: 1.5rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.text.connecting::after {
  content: '..';
  display: inline-block;
  animation: dot 4s linear infinite;
}

.progress {
  width: max-content;
  position: relative;
}
.blend {
  mix-blend-mode: lighten;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.rotate {
  position: fixed;
  width: 100%;
  left: 50%;
  bottom: 20%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #000;
}
.rotate span {
  font-size: 0.8rem;
  margin-top: 1rem;
}

.rotate i {
  animation: rotatePhone 1s infinite alternate;
  transform-origin: center;
  line-height: 1rem;
}

.unfilled,
.filled {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.unfilled {
  width: 100%;
  background-color: #f7f7f7;
}
.filled {
  background-color: #666666;
}

@keyframes dot {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}

@keyframes rotatePhone {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-90deg);
  }
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-leave-to {
  opacity: 0;
}
</style>
