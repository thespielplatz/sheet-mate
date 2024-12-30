<template>
  <div class="pt-20">
    <div class="text-2xl font-black">Dashboard</div>
    <div class="pt-10 flex flex-col gap-2">
      <div v-for="item in list" :key="item.id">
        <div>{{ item.id }} | {{ item.name }}</div>
      </div>
      <div>
        <TypographyButtonDefault @click="logout">Logout</TypographyButtonDefault>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

const { $auth } = useNuxtApp()

const list = ref<{ id: string, name: string }[]>([])

const logout = async () => {
  await $auth.logout()
  router.replace({ path: '/' })
}

onMounted(async () => {
  if (!$auth.isLoggedIn) {
    router.replace({ path: '/' })
  }
  list.value = await $auth.$fetch('/api/dashboard')
})

</script>