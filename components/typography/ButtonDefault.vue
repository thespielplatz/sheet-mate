<template>
  <button :class="[
    'bg-slate-700 text-white rounded-md px-2 py-1',
    'border border-slate-900', 
    'hover:bg-slate-900',
    styleClass,
    ]">
    <slot />
  </button> 
</template>

<script setup lang="ts">

const model = defineModel()

import { defineProps, toRefs } from 'vue'

const value = ref('')

const props = defineProps({
  size: {
    type: String as PropType<'normal' | 'small'>,
    default: 'normal'
  },
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

const { ...attrs } = toRefs(props)

</script>
