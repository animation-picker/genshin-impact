import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {
  const toastMsg = ref([])

  const pushToast = ({
    type = 'info',
    dismissible = false,
    autoclose = true,
    timeout = 3000,
    message = ''
  }) => {
    const id = Math.floor(Math.random() * 10000)
    const toastData = { id, dismissible, autoclose, timeout, type, message }

    // push the toast to the top of the list of toasts
    toastMsg.value = [toastData, ...toastMsg.value]
  }

  const dismissToast = (id) => {
    toastMsg.value = toastMsg.value.filter((t) => t.id !== id)
  }

  return {
    toastMsg,
    pushToast,
    dismissToast
  }
})
