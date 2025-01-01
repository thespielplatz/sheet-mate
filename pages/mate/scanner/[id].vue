<template>
  <TypographyNotification ref="errorNotification" :isVisible="false" state="error" />
  <div  v-if="state == 'scanning'" class="fixed">
    <StreamBarcodeReader  @decode="onDecode" @loaded="onLoaded"
    ></StreamBarcodeReader>
  </div>
  <TypographyHeadlineDefault>{{ name }}</TypographyHeadlineDefault>
  <div class="pt-4 flex justify-center items-center">
    <TypographyButtonDefault v-if="state == 'start' || state == 'edit'" @click="openScanner" class="text-4xl">
      <b-icon-upc-scan />
    </TypographyButtonDefault>
  </div>
  <div v-if="state == 'edit'">
    <div class="font-bold text-2xl">{{ inventoryData?.name }}</div>
    <div class="text-xs text-slate-600">Last Update: {{ toLocalizedDateString(inventoryData?.updatedAt || 0) }}</div>
    <div class="font-bold text-xl">Amount</div>
    <div class="flex gap-2">
      <div class="
      px-3 h-14 bg-slate-200 rounded text-black border border-slate-300 
      text-4xl
      flex items-center justify-center">{{ inventoryData?.amount }}</div>
      <TypographyButtonDefault class="text-4xl w-14">
        +1
      </TypographyButtonDefault>    
      <TypographyButtonDefault class="text-4xl w-14">
        -1
      </TypographyButtonDefault>    
    </div>
    <div class="font-bold text-xl">Fields</div>
    <ul>
      <li v-for="value, key in inventoryData?.fields">{{ key }}: {{ value }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import { StreamBarcodeReader } from 'vue-barcode-reader'
import { InventoryItemDto } from '~/server/api/scanner/item.get'

const { $auth } = useNuxtApp()
const route = useRoute()

const errorNotification = ref()

const state = ref<'start' | 'scanning' | 'loading' | 'edit' | 'error'>('start')
const name = ref('')
const decode = ref('')
const inventoryData = ref<InventoryItemDto>(null)

onMounted(async () => {
  await loadItem('testIdExists')
  return
  try {
    const scannerInfo = await $auth.$fetch('/api/scanner', {
      method: 'GET',
      query: {
        id: route.params.id
      }
    })
    name.value = scannerInfo.name
  } catch (e) {
    errorNotification.value.show(`Initial Error: ${getFetchErrorMessage(e)}`)
    state.value = 'error'
  }
})

const openScanner = () => {
  state.value ='scanning'
}

const onLoaded = () => {
}

const onDecode = (data: string) => {
  decode.value = data
  loadItem(data)
}

const loadItem = async (code: string) => {
  state.value = 'loading'

  try {
    inventoryData.value = await $auth.$fetch('/api/scanner/item', {
    method: 'GET',
    query: {
      scannerId: route.params.id,
      code,
    }
  })
    state.value = 'edit'
  } catch (e) {
    showErrorAndReset(e)
  }
}
/*
const saveItem = async({ id, amount }: { id: string, amount: number }) => {
  try {
    inventoryData.value = await $auth.$fetch('/api/scanner/item', {
    method: 'POST',
    query: {
      scannerId: route.params.id,
      id,
      amount,
    }
  })
    state.value = 'edit'
  } catch (e) {
    showErrorAndReset(e)
  }
}
*/

const showErrorAndReset = (e: any) => {
  errorNotification.value.show({
    message: `Could not load item: ${getFetchErrorMessage(e)}`,
    autoHide: 2500,
  })
  state.value = 'start'
}


</script>
