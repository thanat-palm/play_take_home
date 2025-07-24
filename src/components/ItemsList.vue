<script setup lang="ts">
import { itemCatalog } from '../constants/items';

// interface ItemProps {
//     discountData: any[];
// }
// defineProps<ItemProps>();

</script>
<template>
    <div class="w-full bg-stone-500 rounded-lg shadow-lg p-5">
        <ul class="flex items-center justify-around">
            <li 
            v-if="itemCatalog && Array.isArray(itemCatalog)" 
            v-for="item in itemCatalog" 
            :key="`item-${item.name}`" 
            class=" bg-lime-800 w-[200px] overflow-hidden rounded-lg text-stone-200 shadow-lg transition-all duration-200 hover:opacity-80 active:scale-105 cursor-pointer"
            >
                <div class="w-full h-[100px] bg-stone-300">
                </div>
                <div class="p-2 flex max-sm:flex-col sm:justify-between">
                    <div class="">
                        <h1 class="font-semibold">{{ item.name }}</h1>
                        <h2 class="text-sm">{{ item.category }}</h2>
                    </div>
                    <h3 class="sm:text-2xl text-nowrap">{{ item.price }} ฿</h3>
                </div>
            </li>
        </ul>
    </div>
</template>