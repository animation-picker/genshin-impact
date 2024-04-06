<template>
  <div
    :class="['toast', type, { dismissible, autoclose: autoclose && timeout > 0 }]"
    role="alert"
    :style="{ '--duration': duration }"
  >
    <div class="text">
      <slot />
    </div>

    <div v-if="dismissible">
      <button class="dismiss" @click="$emit('dismiss')">
        <i class="gi-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info'
  },
  dismissible: {
    type: Boolean,
    default: false
  },
  timeout: {
    type: Number,
    default: 0
  },
  autoclose: {
    type: Boolean,
    default: true
  }
})

defineEmits(['dismiss'])

const duration = props.timeout ? `${props.timeout / 1000}s` : '0s'
</script>

<style scoped>
.toast {
  pointer-events: initial;
  padding: 0.5rem 1.5rem 0.7rem;
  text-align: center;
  border-top-right-radius: 0.3rem;
  border-top-left-radius: 0.3rem;
  min-width: 10rem;
  max-width: 20rem;
  margin: 0.2rem;
  background-color: var(--tertiary-color);
  color: #4a5265;
  font-size: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
  transition:
    transform 0.3s ease-out,
    opacity 0.2s ease-out;
  transform: translateY(-20px);
}

.toast.autoclose::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: #4a5265 0.2rem solid;
  animation: scaleX forwards linear;
  transform-origin: 0%;
  animation-duration: var(--duration);
}

.toast.dismissible {
  padding-right: 0.75rem;
}

.toast.error {
  color: #d14a29;
}
.toast.error::after {
  border-color: #d14a29;
}

.toast.success {
  color: #359697;
}
.toast.success::after {
  border-color: #359697;
}

button {
  color: inherit;
  background: transparent;
  border: 0 none;
  padding: 0;
  line-height: 0;
  font-size: 80%;
  margin-left: auto;
  aspect-ratio: 1/1;
  padding: 0.25rem;
  transform: scale(1.2);
}

.dismiss {
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
}

@keyframes scaleX {
  0% {
    transform: scaleX(100%);
  }
  100% {
    transform: scaleX(0%);
  }
}
</style>
