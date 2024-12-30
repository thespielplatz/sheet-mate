<template>
  <div 
    ref="elementRef"
    :class="[
      'px-3 py-2 text-sm border rounded',
      'transition-opacity duration-300',
      styleClass,
      localIsVisible ? 'opacity-100' : 'opacity-0',
    ]">
    <slot />
  </div>
</template>

<script setup lang="ts">

const elementRef = ref<HTMLDivElement | null>(null)

const { state, isVisible } = defineProps({
  state: {
    type: String as PropType<'normal' | 'error'>,
    default: 'normal',
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
})

const localIsVisible = ref(isVisible)

const styleClass = computed(() => {
  switch (state) {
    case 'error':
      return 'text-white bg-red-700  border-red-900'
    case 'normal':
    default:
      return 'text-white bg-slate-500  border-slate-900'
  }
})

const show = () => {
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