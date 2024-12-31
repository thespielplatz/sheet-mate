<template>
  <div class="pt-20">
    
    <div class="text-2xl font-black flex gap-1 items-center">
      <b-icon-file-earmark-spreadsheet />
      <div>Sheet Mate</div>
    </div>
    <div class="pt-10 flex flex-col gap-2">
      <TypographyInputDefault v-model="accessKey" type="text" label="Access Key" />
      <div>
        <TypographyButtonDefault @click="login">Submit</TypographyButtonDefault>
      </div>
      <TypographyNotification ref="errorNotification" :isVisible="false" state="error">{{ errorMessage }}</TypographyNotification>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'noheader',
})

const errorNotification = ref()
const accessKey = ref('')
const errorMessage = ref('')
const { $auth } = useNuxtApp()

const login = async () => {
  const success = await $auth.loginWithAccessKey(accessKey.value)
  if (success) {
    await navigateTo('/dashboard')
  } else {
    errorNotification.value.show()
    errorMessage.value = 'Could not login'
    setTimeout(() => {
      errorNotification.value.fadeOut()
    }, 2500)
  }
}

onBeforeMount(async () => {
  await $auth.redirectIfLoggedIn()
})

</script>
