<template>
  <div
    v-if="label"
    class="text-sm font-bold"
  >
    {{ label }}
  </div>
  <input
    v-bind="attrs"
    v-model="model"
    :type="type"
    class="border border-gray-300 rounded-md p-2 w-full"
  >
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

const { type, label, ...attrs } = toRefs(props)
</script>
