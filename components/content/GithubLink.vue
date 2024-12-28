<template>
  <div class="inline-flex gap-1 items-center">
    <span class="font-bold">
      Source:
    </span>
    <LinkDefault :href="githubLink" target="_blank"><b-icon-github /> Github</LinkDefault>
  </div>
</template>

<script setup lang="ts">

import LinkDefault from '~/components/typography/LinkDefault.vue'

const runtimeConfig = useRuntimeConfig()
const githubLink = ref(runtimeConfig.public.githubLink)

</script>
