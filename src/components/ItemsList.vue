<script setup lang="ts">
import { itemCatalog } from '../constants/items';
import { useAppStore } from '../stores/appStore';
import type { Item } from '../types/item';

const appStore = useAppStore();
const handleItemSelected = (item:Item) => {
  const existingItem = appStore.itemList.find(
        (selected) => selected.name === item.name
  );
  if(existingItem) {
    if(existingItem.amount) existingItem.amount += 1;
  } else {
    appStore.itemList.push({ ...item, amount: 1 });
  }
  console.log('สินค้าในตะกร้า',appStore.itemList);
}

</script>
<template>
    <div class="w-full bg-stone-500 rounded-lg shadow-lg p-4 sm:p-5">
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
            <template v-if="itemCatalog && Array.isArray(itemCatalog)">
                <li 
                    v-for="item in itemCatalog"
                    :key="`item-${item.name}`"
                    @click="handleItemSelected(item)"
                    class="bg-stone-800 w-full max-w-[150px] overflow-hidden rounded-lg text-stone-200 shadow-lg transition-all duration-200 hover:opacity-80 active:scale-105 cursor-pointer flex flex-col"
                >
                    <div class="w-full h-[80px] sm:h-[100px] bg-stone-300">
                        <img :src="item.imagePath" :alt="item.name" class="w-full h-full object-cover">
                    </div>
                    <div class="p-2 flex flex-col flex-grow">
                        <h1 class="font-semibold text-xs sm:text-sm truncate">{{ item.name }}</h1>
                        <h2 class="text-[0.65rem] sm:text-xs text-stone-200/50 mt-1">{{ item.category }}</h2>
                        <h3 class="text-sm sm:text-base mt-2 whitespace-nowrap">{{ item.price }} ฿</h3>
                    </div>
                </li>
            </template>
            <template v-else>
                <li class="col-span-full text-center py-8 text-stone-200 text-lg sm:text-xl font-semibold">
                    No items in catalog.
                </li>
            </template>
        </ul>
    </div>
</template>