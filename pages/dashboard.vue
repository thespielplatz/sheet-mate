<template>
  <div>
    <TypographyHeadlineDefault>Dashboard</TypographyHeadlineDefault>
    <div class="pt-10 flex flex-col gap-2">
      <div v-for="item in list" :key="item.id">
        <TypographyLinkDefault :to="`/mate/scanner/${item.id}`">{{ item.name }}</TypographyLinkDefault>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

const { $auth } = useNuxtApp()

const list = ref<{ id: string, name: string }[]>([])

onMounted(async () => {
  if (!$auth.isLoggedIn) {
    return await navigateTo('/')
  }
  list.value = await $auth.$fetch('/api/dashboard', {
    method: 'GET',
  })
})

</script>