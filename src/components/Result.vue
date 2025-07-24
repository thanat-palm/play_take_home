<script setup lang="ts">
import { Sum } from '../services/controller';
import type { Item } from '../types/item';

const basketList: Item[] = [
    {
        name: 'Bag',
        category: 'accessories', // เปลี่ยน category ให้กว้างขึ้นเพื่อความหลากหลาย
        price: 120,
        amount: 1
    },
    {
        name: 'T-Shirt',
        category: 'apparel',
        price: 50,
        amount: 3
    },
    {
        name: 'Laptop',
        category: 'electronics',
        price: 1200,
        amount: 1
    },
    {
        name: 'iPhone',
        category: 'electronics',
        price: 15,
        amount: 1
    },
    {
        name: 'Pant',
        category: 'apparel',
        price: 80,
        amount: 1
    },
];

const discountlist = [
    
]

</script>
<template>
    <div class="h-full sm:w-1/4 bg-stone-300 rounded-lg text-stone-700 overflow-hidden shadow-lg">
        <div class="flex flex-col bg-stone-500 py-10 px-4 rounded-lg text-stone-200 shadow-lg">
            <h4 class=" font-semibold text-lg">Total Price</h4>
            <h1 class="font-bold text-4xl">THB฿{{ Sum(basketList) }}</h1>
        </div>
        <!-- basket list -->
        <div class="p-4 space-y-4">
            <div class="space-y-4">
                <div class="grid grid-cols-5">
                    <div class="text-lg font-semibold col-span-4">Summary Order</div>
                    <div class=" font-semibold"></div>
                </div>
                <ul class="w-full max-h-[200px] overflow-y-auto space-y-1">
                    <li v-if="basketList && Array.isArray(basketList)" v-for="list in basketList" :key="`list-${list.name}`" class="grid grid-cols-5">
                        <div class="col-span-4 flex items-center gap-2"><span class="size-5 flex items-center justify-center bg-stone-500 rounded-full text-xs font-semibold text-stone-200">{{ list.amount }}</span>{{ list.name }}</div>
                        <div v-if="list.amount" class="">{{ list.price*list?.amount }}</div>
                    </li>
                </ul>
                <div class="grid grid-cols-5 mb-2">
                    <div class="font-semibold col-span-4">Total</div>
                    <div class="">{{ Sum(basketList) }} ฿</div>
                </div>
            </div>
            <div class="">
                <div class="grid grid-cols-5 mb-2">
                    <div class="text-lg font-semibold col-span-4">Total Summary</div>
                    <div class=" font-semibold"></div>
                </div>
                <ul class="w-full h-[200px] overflow-y-auto space-y-1">
                    <li v-if="basketList && Array.isArray(basketList)" v-for="list in basketList" :key="`list-${list.name}`" class="grid grid-cols-5">
                        <div class="col-span-4">{{ list.name }} x {{ list.amount }}</div>
                        <div class="">{{ list.price }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
