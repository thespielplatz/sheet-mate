<template>
  <TypographyHeadlineDefault>{{ name }}</TypographyHeadlineDefault>
</template>

<script setup lang="ts">

const { $auth } = useNuxtApp()
const route = useRoute()

const name = ref('')

onMounted(async () => {
  const scannerInfo = await $auth.$fetch('/api/scanner', {
    query: {
      id: route.params.id
    }
  })
  name.value = scannerInfo.name
})

</script>