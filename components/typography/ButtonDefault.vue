<template>
  <button class="bg-slate-700 text-white rounded-md px-2 py-1
    border border-slate-900
    hover:bg-slate-900
    ">
    <slot />
  </button> 
</template>

<script setup lang="ts">

const model = defineModel()

import { defineProps, toRefs } from 'vue'

const value = ref('')

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})

const { type, label, ...attrs } = toRefs(props)

</script>
