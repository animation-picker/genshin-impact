<template>
  <!-- Todo: add flip animate -->

  <div v-if="toastStore.toastMsg">
    <div class="toasts">
      <div
        v-for="{ type, id, dismissible, message, autoclose, timeout } in toastStore.toastMsg"
        :key="id"
      >
        <div class="toast-item">
          <Toast :type :dismissible :autoclose :timeout @dismiss="toastStore.dismissToast(id)">
            {{ message }}
          </Toast>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '@/stores/toast'

import Toast from './ToastItem.vue'

const toastStore = useToastStore()
</script>

<style scoped>
.toasts {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  pointer-events: none;
  z-index: 1000;
}
</style>
