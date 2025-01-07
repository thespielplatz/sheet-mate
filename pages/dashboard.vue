<template>
  <div>
    <TypographyHeadlineDefault>Dashboard</TypographyHeadlineDefault>
    <div class="pt-10 flex flex-col gap-2">
      <div
        v-for="item in list"
        :key="item.id"
      >
        <TypographyLinkDefault :to="createLink(item)">
          {{ item.name }}
        </TypographyLinkDefault>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardDtoType, DashboardItemDtoType } from '../server/api/dashboard/index.get'

const { $auth } = useNuxtApp()

const list = ref<DashboardDtoType>([])

onMounted(async () => {
  await $auth.redirectIfLoggedOut()
  list.value = await $auth.$fetch('/api/dashboard', {
    method: 'GET',
  })
})

const createLink = (item: DashboardItemDtoType) => {
  let link = '/mate/'
  switch (item.type) {
    case 'intentoryScanner':
      link += 'scanner'
      break

    case 'cmcImporter':
      link += 'cmc'
      break

    default:
      throw new Error(`Type not implemented: ${item.type}`)
  }
  link += `/${item.id}`
  return link
}
</script>
