<template>
  <NuxtLink 
    v-if="to"
    :to="to"
    class="underline decoration-accent hover:decoration-white flex gap-1 items-center"
  >
    <slot></slot>
  </NuxtLink>
  <a 
    v-else-if="href" 
    :href="href"
    :target="target" 
    class="underline decoration-accent hover:decoration-white flex gap-1 items-center"
  >
    <slot></slot>
  </a>
  <span 
    v-else 
    @click="handleClick" 
    class="underline decoration-accent hover:decoration-white cursor-pointer inline-flex gap-1 items-center"
  >
    <slot></slot>
  </span>
</template>

<script setup lang="ts">

const props = defineProps<{
  href?: string;
  target?: string;
  to?: string;
}>()

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}

</script>
