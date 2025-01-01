<template>
  <div :class="[
    'px-1.5 py-0.5 text-xs font-mono rounded-xl',
    styleClass,
    ]">
    <slot />
  </div>
</template>


<script setup lang="ts">

const elementRef = ref<HTMLDivElement | null>(null)

type State = 'normal' | 'success' | 'error'

const { state } = defineProps({
  state: {
    type: String as PropType<State>,
    default: 'normal',
  },
})

const localState = ref(state)

const styleClass = computed(() => {
  switch (localState.value) {
    case 'error':
      return 'text-white bg-red-700 border-red-900'
    case 'success':
      return 'text-white bg-green-700 border-green-900'
    case 'normal':
    default:
      return 'text-white bg-slate-500 border-slate-900'
  }
})

</script>
