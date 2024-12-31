<template>
  <div  v-if="state == 'scanning'" class="fixed">
  <StreamBarcodeReader  @decode="onDecode" @loaded="onLoaded"

  ></StreamBarcodeReader>
</div>
  <TypographyHeadlineDefault>{{ name }}</TypographyHeadlineDefault>
  <div class="pt-4 flex justify-center items-center">
    <TypographyButtonDefault v-if="state == 'start' || state == 'product'" @click="openScanner" class="text-4xl">
      <b-icon-upc-scan />
    </TypographyButtonDefault>
  </div>
  <div v-if="state == 'product'">
    <pre>Result:{{ decode }}</pre>
  </div>
</template>

<script setup lang="ts">

import { StreamBarcodeReader } from "vue-barcode-reader";

const { $auth } = useNuxtApp()
const route = useRoute()

const state = ref<'start' | 'scanning' | 'product'>('start')
const name = ref('')
const decode = ref('')

onMounted(async () => {
  const scannerInfo = await $auth.$fetch('/api/scanner', {
    query: {
      id: route.params.id
    }
  })
  name.value = scannerInfo.name
})

const openScanner = () => {
  state.value ='scanning'
}

const onLoaded = () => {
  
}

const onDecode = (data: string) => {
  decode.value = data
  state.value = 'product'
}

</script>