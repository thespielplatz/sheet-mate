<template>
  <div 
    ref="elementRef"
    :class="[
      'px-3 py-2 text-sm border rounded',
      'transition-opacity duration-300',
      styleClass,
      localIsVisible ? 'opacity-100' : 'opacity-0',
    ]">
    {{ localMessage }}<slot />
  </div>
</template>

<script setup lang="ts">

const elementRef = ref<HTMLDivElement | null>(null)

type State = 'normal' | 'success' | 'error'

const { state, isVisible, message } = defineProps({
  state: {
    type: String as PropType<State>,
    default: 'normal',
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  message: {
    type: String,
    default: '',
  }
})

const localIsVisible = ref(isVisible)
const localMessage = ref(message)
const localState = ref(state)

const styleClass = computed(() => {
  switch (localState.value) {
    case 'error':
      return 'text-white bg-red-700  border-red-900'
    case 'success':
      return 'text-white bg-green-700  border-green-900'
    case 'normal':
    default:
      return 'text-white bg-slate-500  border-slate-900'
  }
})

const show = (params?: string | { message: string, autoHide?: number, state?: State }) => {
  if (typeof params === 'string') {
    localMessage.value = params
  }
  if (typeof params === 'object') {
    const config = params as { message: string, autoHide?: number, state?: State }
    localMessage.value = config.message
    if (config.autoHide) {
      setTimeout(() => {
        fadeOut()
      }, config.autoHide)
    }
    if (config.state) {
      localState.value = config.state
    }
  }
  localIsVisible.value = true
  if (elementRef.value) {
    elementRef.value.style.display = ''
  }
}

const hide = () => {
  localIsVisible.value = false
  if (elementRef.value) {
    elementRef.value.style.display = 'none'
  }
}

// Method to fade out the component
const fadeOut = () => {
  localIsVisible.value = false
  if (elementRef.value) {
    setTimeout(() => {
      if (elementRef.value) elementRef.value.style.display = 'none'
    }, 300) // Matches the fade-out transition duration
  }
}

defineExpose({
  show,
  hide,
  fadeOut,
})

</script>