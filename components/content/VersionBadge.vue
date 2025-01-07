<template>
  <Badge>
    <LinkDefault
      target="_blank"
      :href="tagLink"
    >
      {{ version }}
    </LinkDefault>
  </Badge>
</template>

<script setup lang="ts">
import Badge from '~/components/typography/Badge.vue'
import LinkDefault from '~/components/typography/LinkDefault.vue'

const runtimeConfig = useRuntimeConfig()

const version = ref(runtimeConfig.public.version ? `v${runtimeConfig.public.version}` : 'undefined')
const releasedVersion = ref(runtimeConfig.public.releasedVersion ? `v${runtimeConfig.public.releasedVersion}` : 'undefined')

const tagLink = ref(`${runtimeConfig.public.githubLink}/releases/tag/${releasedVersion.value}`)
</script>
