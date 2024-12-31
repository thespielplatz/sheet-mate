<template>
  <LayoutCenterContainer class="border-b pt-4 pb-3">
    <div class="flex justify-between items-center">
    <div class="text-2xl font-black">
      <TypographyLinkDefault href="/dashboard" >
        <b-icon-file-earmark-spreadsheet />
        Sheet Mate
      </TypographyLinkDefault>
    </div>
      <TypographyButtonDefault @click="logout" size="small">Logout</TypographyButtonDefault>
    </div>
  </LayoutCenterContainer>
</template>


<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()
const { $auth } = useNuxtApp()

const logout = async () => {
  await $auth.logout()
  router.replace({ path: '/' })
}

</script>
