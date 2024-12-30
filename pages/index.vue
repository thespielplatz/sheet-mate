<template>
  <div class="pt-20">
    <div class="text-2xl font-black">Sheet Mate</div>
    <div class="pt-10 flex flex-col gap-2">
      <TypographyInputDefault v-model="accessKey" type="text" label="Access Key" />
      <div>
        <TypographyButtonDefault @click="login">Submit</TypographyButtonDefault>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const accessKey = ref('')
const { $auth } = useNuxtApp()

const login = async () => {
  const success = await $auth.loginWithAccessKey(accessKey.value)
  alert(`Login: ${success}`)
}

</script>