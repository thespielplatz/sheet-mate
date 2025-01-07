<template>
  <LayoutCenterContainer class="border-b pt-4 pb-3">
    <div class="flex justify-between items-center">
      <div class="text-2xl font-black">
        <TypographyLinkDefault to="/dashboard">
          <b-icon-file-earmark-spreadsheet />
          Sheet Mate
        </TypographyLinkDefault>
      </div>
      <TypographyButtonDefault
        size="small"
        @click="logout"
      >
        Logout
      </TypographyButtonDefault>
    </div>
  </LayoutCenterContainer>
</template>

<script setup lang="ts">
const { $auth } = useNuxtApp()

const logout = async () => {
  await $auth.logout()
  await navigateTo('/')
}
</script>
