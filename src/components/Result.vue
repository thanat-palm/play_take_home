<script setup lang="ts">
import { ref, watch } from 'vue';
import { CouponCalculator, onTopCalculator, seasonalCalculator, Sum } from '../services/controller';
import type { CouponCampaign, DiscountResult, OnTopCampaign } from '../types/campaign';
import { useAppStore } from '../stores/appStore';
import type { Item } from '../types/item';
import { IconMinus, IconTrash } from '@tabler/icons-vue';

const appStore = useAppStore();
const discountResult = ref<DiscountResult>({
    coupon: 0,
    onTop: 0,
    seasonal: 0,
    summaryPrice: 0,
    totalResult: 0,
})

const updateResult = () => {
    if(!appStore.itemList || !Array.isArray(appStore.itemList)) return console.log('error' , appStore.itemList);
    let currentTotal:number | null = Sum(appStore.itemList);
    discountResult.value.summaryPrice = currentTotal;
    for (const discount of appStore.discount) {
        if (discount.campaignType === 'coupon') {
            const beforecalculate = currentTotal;
            currentTotal = CouponCalculator(currentTotal, discount as CouponCampaign) || 0;
            discountResult.value.coupon = beforecalculate - currentTotal;
        } else if (discount.campaignType === 'on-top') {
            const beforecalculate = currentTotal;
            currentTotal = onTopCalculator(appStore.itemList, discount as OnTopCampaign , currentTotal) || 0;
            console.log(beforecalculate , currentTotal);
            discountResult.value.onTop = beforecalculate - currentTotal;
        } else if (discount.campaignType === 'seasonal') {
            const beforecalculate = currentTotal;
            currentTotal = seasonalCalculator(currentTotal, discount.every, discount.discount) || 0;
            discountResult.value.seasonal = beforecalculate - currentTotal;
        }
    }
    discountResult.value.totalResult = currentTotal;
}

const handleItemDecreased = (item: Item) => {
    const existingItem = appStore.itemList.find(
        (selected) => selected.name === item.name
    );

    if (existingItem) {
        if (existingItem.amount && existingItem.amount > 1) {
            existingItem.amount -= 1;
            updateResult();
        } else {
            handleItemRemoved(item);
        }
    }
    console.log('สินค้าในตะกร้าหลังลด:', appStore.itemList);
    
};

const handleItemRemoved = (item: Item) => {
    appStore.itemList = appStore.itemList.filter(
        (selected) => selected.name !== item.name
    );
    updateResult();
    console.log('สินค้าในตะกร้าหลังลบ:', appStore.itemList);
};

const handleClearAllItem = () => {
  appStore.itemList = [];
  updateResult();
}

watch(appStore.itemList , () => {
    updateResult();
}, { immediate: true })

watch( () => appStore.discount , () => {
    console.log('cal2');
    updateResult();
    console.log(discountResult.value)
}, { deep: true })

</script>
<template>
    <div class="h-full bg-stone-300 rounded-lg text-stone-700 overflow-hidden shadow-lg">
        <div class="flex flex-col bg-stone-500 py-10 px-4 rounded-lg text-stone-200 shadow-lg">
            <h4 class=" font-semibold text-lg">Total Price</h4>
            <h1 class="font-bold text-4xl">THB฿{{ discountResult.totalResult }}</h1>
        </div>
        <!-- basket list -->
        <div class="p-4 space-y-4">
            <div class="space-y-4">
                <div class="grid grid-cols-5">
                    <div class="text-lg font-semibold col-span-4 my-auto">Summary Order</div>
                    <button @click="handleClearAllItem" class="uppercase p-1 my-auto font-semibold text-sm bg-red-700 rounded-lg text-red-200 shadow-lg transition-all duration-200 hover:opacity-80 active:scale-105 cursor-pointer">clear</button>
                </div>
                <ul class="w-full max-h-[200px] overflow-y-auto space-y-1">
                    <template v-if="appStore.itemList && Array.isArray(appStore.itemList)">
                        <li 
                        v-for="list in appStore.itemList" :key="`list-${list.name}`"
                        class="grid grid-cols-5"
                        >
                        <div class="flex items-center gap-2">
                            <button class="flex items-center justify-center size-6 bg-stone-700 rounded-lg text-stone-200" @click="handleItemDecreased(list)"><IconMinus size="16"/></button>
                            <button class="flex items-center justify-center size-6 bg-red-700 rounded-lg text-red-200" @click="handleItemRemoved(list)"><IconTrash size="16"/></button>
                        </div>
                            <div class="col-span-3 flex items-center gap-2"><span class="size-5 flex items-center justify-center bg-stone-500 rounded-full text-xs font-semibold text-stone-200">{{ list.amount }}</span>{{ list.name }}</div>
                            <div v-if="list.amount" class="my-auto">{{ list.price*list?.amount }} ฿</div>
                        </li>
                    </template>
                </ul>
                <div class="grid grid-cols-5 mb-2">
                    <div class="font-semibold col-span-4">Total</div>
                    <div class="">{{ discountResult.summaryPrice }} ฿</div>
                </div>
            </div>
            <div class="">
                <div class="grid grid-cols-5 mb-2">
                    <div class="text-lg font-semibold col-span-4">Total Summary</div>
                    <div class=""></div>
                </div>
                <ul class="w-full h-[200px] overflow-y-auto space-y-1">
                    <template v-if="appStore.discount && Array.isArray(appStore.discount)">
                        <li v-for="list in appStore.discount" :key="`list-${list.title}`" class="grid grid-cols-5">
                            <template v-if="list.campaignType === 'coupon'">
                                <div class="col-span-4">{{ list.title }} ลด {{ list.value }} {{ list.type === 'percent' ? '%' : 'บาท' }} </div>
                                <div class="text-red-500">- {{ discountResult.coupon }} ฿</div>
                            </template>
                            <template v-else-if="list.campaignType === 'on-top'">
                                <div v-if="list.type === 'categories'" class="col-span-4">{{ list.title }} ลด {{ list.value }} % เมื่อซื้อสินค้าประเภท {{ list.discountCategory }}</div>
                                <div v-else class="col-span-4">{{ list.title }} ลดด้วยพ้อยต์ {{ list.value }} บาท</div>
                                <div class="text-red-500">- {{ discountResult.onTop }} ฿</div>
                            </template>
                            <template v-else-if="list.campaignType === 'seasonal'">
                                <div class="col-span-4">{{ list.title }} ทุกการซื้อ {{ list.every }} บาท ลด {{ list.discount }} บาท</div>
                                <div class="text-red-500">- {{ discountResult.seasonal }} ฿</div>
                            </template>
                        </li>
                    </template>
                    <div class="grid grid-cols-5 mb-2">
                        <div class="font-semibold col-span-4">Total Order Summary</div>
                        <div class="">{{ discountResult.totalResult }} ฿</div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>
