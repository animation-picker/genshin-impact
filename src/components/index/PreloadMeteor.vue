<template>
  <Transition name="ready">
    <div v-if="!readyToPull">
      <div class="tooltip">
        <div v-if="onProgress">
          <div class="loader">
            <caption class="load-text" style="position: relative">
              Loading
              <span>{{ rarity }} Star Meteor Animation </span>
            </caption>

            <div
              class="progress-bar"
              :style="{
                '--per': percentage + '%'
              }"
            >
              <span />
            </div>

            <div class="percentage">{{ percentage.toFixed(0) }} %</div>
          </div>
        </div>
        <div v-else>
          <div class="prompt-text">
            Cannot find Meteor Animation in your storage, please
            <span> Load the Meteor Animation</span> first before pulling, or
            <span> Turn ON </span> the option to skip Animation!
            <small style="text-decoration: line-through">
              * The loaded files will be stored in the Browser Storage, so you don't need to load
              them again until the site is updated.
            </small>
          </div>
          <div class="options">
            <ButtonGeneral dark @click="preloadMeteor"> Load Animation </ButtonGeneral>
            <ButtonGeneral dark @click="skipMeteor"> Skip Animation </ButtonGeneral>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import { useAudioStore } from '@/stores/audio'
import { useAssetStore } from '@/stores/asset'
import { useSettingStore } from '@/stores/setting'
import { loadAnimation, safariMeteorLoaded } from '@/lib/meteor-loader'

import ButtonGeneral from '@/components/misc/ButtonGeneral.vue'

const audioStore = useAudioStore()
const assetStore = useAssetStore()
const settingStore = useSettingStore()

const onProgress = ref(false)
const rarity = ref(3)
const progress = ref(0)
const totalItem = ref([])
const itemIndex = ref(0)

const percentage = computed(
  () => ((itemIndex.value * 100 + progress.value) / (totalItem.value * 100)) * 100
)
const readyToPull = inject('readyToPull')

const skipMeteor = () => {
  audioStore.playSfx()
  settingStore.autoskip = true
  readyToPull.value = true
}

const preloadMeteor = async () => {
  audioStore.playSfx()
  onProgress.value = true
  const data = await loadAnimation(rarity, progress, totalItem, itemIndex)
  assetStore.addAssets(data)
  readyToPull.value = false
  onProgress.value = false
}

const check = async () => {
  //   const loadedData = []

  // directly load data here
  assetStore.addAssets(safariMeteorLoaded())
  return true

  // TODO: add local cache

  // load video from network directly if user use Safari browser
  //   if (isSafari()) {
  //     assetStore.addAssets(safariMeteorLoaded())
  //     return true
  //   }

  // read blob from data from storage if using chrome
  //   for (let i = 0; i < meteorList.length; i++) {
  // 		const key = meteorList[i];
  // 		const storedData = await AssetManager.get(key);
  // 		if (!storedData) continue;
  // 		loadedData.push(storedData);
  // 	}

  // 	const allComplete = loadedData.length === meteorList.length;
  // 	if (allComplete) {
  // 		const DOMURL = window.URL || window.webkitURL;
  // 		assets.update((v) => {
  // 			loadedData.forEach(({ key, blob }) => (v[key] = DOMURL.createObjectURL(blob)));
  // 			return v;
  // 		});
  // 	}
  // 	return allComplete;
}

onMounted(async () => {
  const isReady = settingStore.autoskip || (await check())
  readyToPull.value = isReady
})
</script>

<style scoped>
.tooltip {
  max-width: 90%;
  width: 300px;
  position: fixed;
  bottom: 12%;
  right: 5%;
  z-index: +100;
  background-color: #fbf6ee;
  border: 2px solid #ddd5c8;
  padding: 2% 2% 1.5%;
  border-radius: 0.5rem;
  font-size: 85%;
}

@media screen and (min-width: 900px) {
  .tooltip {
    width: 400px;
  }
}

.prompt-text :global(span),
.loader :global(span) {
  color: var(--color-second);
  position: relative;
}

.tooltip :global(span) {
  color: #f0b164;
}

small {
  display: block;
  padding: 2%;
  opacity: 0.8;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.load-text::after {
  content: '.';
  position: absolute;
  right: 0;
  transform: translateX(100%);
  bottom: 0;
  animation: dot 3s infinite;
}

.progress-bar {
  width: 100%;
  height: 0.2rem;
  background-color: #ccc;
  margin: 3% 0;
  position: relative;
  border-radius: 1rem;
}

.progress-bar span {
  border-radius: inherit;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: var(--per);
  height: 120%;
  background-image: linear-gradient(to left, #898e9d, #4a5265);
  box-shadow: 0 0 0.1rem #fff;
  transition: width 0.05s;
}

.options {
  padding: 2% 1% 0;
  text-align: center;
}
.tooltip :global(button) {
  font-size: 80%;
  margin: 1%;
  padding: 2% 5%;
}

@keyframes dot {
  0% {
    content: '.';
  }
  25% {
    content: '..';
  }
  50% {
    content: '...';
  }
  100% {
    content: '';
  }
}
</style>
