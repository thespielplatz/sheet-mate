<template>
  <div class="relative">
    <div class="absolute -top-5 left-0 right-0 z-50">
      <TypographyNotification ref="notification" :isVisible="false" />
    </div>
  </div>
  <div v-if="state == 'scanning'" class="fixed">
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
    <div class="font-bold text-2xl">Name: {{ inventoryData?.name }}<span v-if="inventoryData == undefined" class="italic text-slate-600">empty</span></div>
    <div class="flex gap-1">
      <TypographyBadge>Code: {{ code }}</TypographyBadge>
      <TypographyBadge v-if="inventoryData === undefined"  state="success">New</TypographyBadge>
      <div v-if="inventoryData" class="text-xs text-slate-600">Last Update: {{ toLocalizedDateString(inventoryData?.updatedAt || 0) }}</div>
    </div>
    <div class="font-bold text-xl">Amount</div>
    <div class="flex gap-2">
      <div class="
      px-3 h-14 bg-slate-200 rounded text-black border border-slate-300 
      text-4xl
      flex items-center justify-center">{{ amount }}</div>
      <TypographyButtonDefault class="text-4xl w-14" @click="saveItem({ amount: amount + 1 });">
        +1
      </TypographyButtonDefault>    
      <TypographyButtonDefault class="text-4xl w-14" @click="saveItem({ amount: amount - 1 })">
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

const notification = ref()

const state = ref<'start' | 'scanning' | 'loading' | 'edit' | 'error'>('start')
const name = ref('')
const decode = ref('')
const inventoryData = ref<InventoryItemDto>(null)

let code = ''
const amount = ref(0)

onMounted(async () => {
  try {
    const scannerInfo = await $auth.$fetch('/api/scanner', {
      method: 'GET',
      query: {
        id: route.params.id
      }
    })
    name.value = scannerInfo.name
  } catch (e) {
    notification.value.show(`Initial Error: ${getFetchErrorMessage(e)}`)
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

const loadItem = async (codeToLoad: string) => {
  code = codeToLoad
  amount.value = 0
  state.value = 'loading'

  try {
    inventoryData.value = await $auth.$fetch('/api/scanner/item', {
      method: 'GET',
      query: {
        scannerId: route.params.id,
        code,
      }
    })
    code = inventoryData.value?.code || codeToLoad
    amount.value = inventoryData.value?.amount || 0
    state.value = 'edit'
  } catch (e) {
    showErrorAndReset(e)
    code = ''
  }
}

const saveItem = async({ amount }: { amount: number }) => {
  try {
    inventoryData.value = await $auth.$fetch('/api/scanner/item', {
    method: 'POST',
    body: {
      scannerId: route.params.id,
      code,
      amount,
    }
  })
    state.value = 'start'
    notification.value.show({
    message: `Amount saved!`,
    autoHide: 2500,
    state: 'success',
  })

  } catch (e) {
    showErrorAndReset(e)
  }
}

const showErrorAndReset = (e: any) => {
  notification.value.show({
    message: `Could not load item: ${getFetchErrorMessage(e)}`,
    autoHide: 2500,
    state: 'error',
  })
  state.value = 'start'
}


</script>
