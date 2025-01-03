<template>
  <div class="relative">
    <div class="absolute -top-3 left-0 -right-0 z-50">
      <TypographyNotification ref="notification" :isVisible="false" />
    </div>
  </div>
  <TypographyHeadlineDefault>{{ baseInfo?.name }}</TypographyHeadlineDefault>
  <div class="pt-4 flex justify-center items-center">
    <TypographyButtonDefault v-if="state == 'start' || state == 'edit'" @click="openScanner" class="text-4xl">
      <b-icon-upc-scan />
    </TypographyButtonDefault>
  </div>
  <div v-if="state == 'scanning'" class="fixed inset-0">
    <div class="relative w-full h-full bg-black">
      <TypographyButtonDefault 
        @click="cancelScanner" 
        class="absolute top-4 left-1/2 transform -translate-x-1/2 text-4xl z-10 text-white bg-red-800">
        <b-icon-x-circle />
      </TypographyButtonDefault>
      <div class="flex justify-center items-center h-full">
        <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" />
        </div>
    </div>
  </div>
  <div v-if="state == 'edit'">
    <div class="font-bold text-2xl">Name: {{ inventoryData?.name }}<span v-if="inventoryData == undefined" class="italic text-slate-600">empty</span></div>
    <div class="flex gap-1">
      <TypographyBadge>Code: {{ code }}</TypographyBadge>
      <TypographyBadge v-if="inventoryData === undefined"  state="success">New</TypographyBadge>
      <div v-if="inventoryData" class="text-xs text-slate-600">Last Update: {{ toLocalizedDateString(inventoryData?.updatedAt || 0) }}</div>
    </div>
    <div class="h-2"></div>
    <a v-if="inventoryData" :href="createNocoDBLink()" target="_blank">
      <TypographyButtonDefault class="flex gap-2 items-center">
        <b-icon-pencil-square class="my-1 text-4xl"/>
        <div class="italic">Open in NocoDB</div>
      </TypographyButtonDefault>
    </a>
    <TypographyButtonDefault v-else class="flex gap-2 items-center" disabled>
        <b-icon-pencil-square class="my-1 text-4xl"/>
        <div class="italic">Item not created yet</div>
      </TypographyButtonDefault>
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
import { type OutputDtoType } from '~/server/api/scanner/index.get'
import { InventoryItemDto } from '~/server/api/scanner/item.get'

const { $auth } = useNuxtApp()
const route = useRoute()

const notification = ref()

const state = ref<'start' | 'scanning' | 'loading' | 'edit' | 'error'>('start')
const inventoryData = ref<InventoryItemDto>(null)
const baseInfo = ref<OutputDtoType>(null)

let code = ''
const amount = ref(0)

onBeforeMount(async () => {
  if (!await $auth.isLoggedIn()) {
    return await navigateTo('/')
  }
})

onMounted(async () => {
  try {
    baseInfo.value = await $auth.$fetch('/api/scanner', {
      method: 'GET',
      query: {
        id: route.params.id
      }
    })
  } catch (e) {
    notification.value.show({
      message: `Initial Error: ${getFetchErrorMessage(e)}`,
      state: 'error',
    })
    baseInfo.value = null
    state.value = 'error'
  }
})

const openScanner = () => {
  state.value ='scanning'
}

const cancelScanner = () => {
  state.value = 'start'
}

const onLoaded = () => {
}

const onDecode = (data: string) => {
  data = data.trim()
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

const createNocoDBLink = () => {
  return createNocoDBUrl({
    domain: baseInfo.value?.domain || '',
    base: baseInfo.value?.base_id || '',
    table: baseInfo.value?.table || '',
    id: inventoryData.value?.id || 0,
  })
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
