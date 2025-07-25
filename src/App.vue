<script setup lang="ts">
import { ref } from 'vue';
import DiscountController from './components/DiscountController.vue';
import ItemsList from './components/ItemsList.vue';
import Result from './components/Result.vue';
import type { Item } from './types/item';
import type { Campaign } from './types/campaign';

const selectedList = ref<Item[]>([]);
const selectedDiscount = ref<Campaign[]>([]);

const handleItemSelected = (item:Item) => {
  const existingItem = selectedList.value.find(
        (selected) => selected.name === item.name
  );
  if(existingItem) {
    if(existingItem.amount) existingItem.amount += 1;
  } else {
    selectedList.value.push({ ...item, amount: 1 });
  }
  console.log('สินค้าในตะกร้า',selectedList.value);
}

const handleDiscountSelected = (discountList: Campaign[]) => {

}

</script>

<template>
  <div class="flex h-screen p-5 space-x-5 relative">
    <Result :list="selectedList" :discountlist="selectedDiscount"/>
    <div class="flex flex-col flex-1 space-y-5">
      <ItemsList @select-item="handleItemSelected"/>
      <div class="flex-1">
        <DiscountController @select-discount="handleDiscountSelected"/>
      </div>
    </div>
  </div>
 </template>
