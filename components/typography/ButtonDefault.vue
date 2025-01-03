<template>
  <button :class="[
    'bg-slate-700 text-white rounded-md px-2 py-1',
    'border border-slate-900', 
    'hover:bg-slate-900',
    styleClass,
    disabled ? 'cursor-not-allowed opacity-50 hover:bg-slate-700' : 'cursor-pointer',
    ]">
    <slot />
  </button> 
</template>

<script setup lang="ts">

const model = defineModel()

import { defineProps } from 'vue'

const value = ref('')

const props = defineProps({
  size: {
    type: String as PropType<'normal' | 'small'>,
    default: 'normal'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const styleClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'text-xs font-bold'
    case 'normal':
    default:
      return ''
  }
})

</script>
