import { ref } from 'vue'
import { defineStore } from 'pinia'
import { play, pause } from '@/lib/audio/audio'

export const useAudioStore = defineStore('audio', () => {
  const muted = ref(false)

  const toggleMute = () => {
    muted.value = !muted.value
  }

  const playSfx = (sfxName = 'click') => {
    if (muted.value) return
    play(sfxName)
  }

  const pauseSfx = (sfxName) => {
    if (muted.value) return
    pause(sfxName)
  }

  return {
    muted,
    toggleMute,
    playSfx,
    pauseSfx
  }
})
