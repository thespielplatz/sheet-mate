<template>
  <div class="relative">
    <div class="absolute -top-3 left-0 -right-0 z-50">
      <TypographyNotification
        ref="notification"
        :is-visible="false"
      />
    </div>
  </div>
  <TypographyHeadlineDefault>{{ baseInfo?.name }}</TypographyHeadlineDefault>
</template>

<script setup lang="ts">
import type { OutputDtoType } from '~/server/api/scanner/index.get'

const { $auth } = useNuxtApp()
const route = useRoute()

const notification = ref()

const baseInfo = ref<OutputDtoType>(null)

onMounted(async () => {
  await $auth.redirectIfLoggedOut()
  try {
    baseInfo.value = await $auth.$fetch('/api/cmc', {
      method: 'GET',
      query: {
        id: route.params.id,
      },
    })
  } catch (e) {
    notification.value.show({
      message: `Initial Error: ${getFetchErrorMessage(e)}`,
      state: 'error',
    })
    baseInfo.value = null
  }
})
</script>
