<template>
  <div class="pt-20">
    <div class="text-2xl font-black">Dashboard</div>
    <div class="pt-10 flex flex-col gap-2">
      <div>
        <TypographyButtonDefault @click="logout">Logout</TypographyButtonDefault>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { $auth } = useNuxtApp()

const logout = async () => {
  //await $auth.logout()
}

</script>