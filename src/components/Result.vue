<script setup lang="ts">
import { ref, watch } from 'vue';
import { CouponCalculator, onTopCalculator, seasonalCalculator, Sum } from '../services/controller';
import type { Campaign, CouponCampaign, OnTopCampaign } from '../types/campaign';
import type { Item } from '../types/item';

interface BasketListProps {
    list: Item[];
    discountlist: Campaign[];
}

interface DiscountResult {
    coupon: number | null;
    onTop: number | null;
    seasonal: number | null;
    summaryPrice: number | null;
    totalResult: number | null;
}

const props = defineProps<BasketListProps>();

const discountResult = ref<DiscountResult>({
    coupon: 0,
    onTop: 0,
    seasonal: 0,
    summaryPrice: 0,
    totalResult: 0,
})


const discountlist:Campaign[] = [
    {
        title: 'โปร-เฉือน-โปร',
        campaignType: 'coupon',
        type: 'amount',
        value: 30,
    },
    {
        title: 'ลดแรง',
        campaignType: 'on-top',
        type: 'categories',
        discountCategory: 'electronics',
        value: 15,
    },
    {
        title: 'โปร 8.8',
        campaignType: 'seasonal',
        every: 800,
        discount: 80
    }
]

const updateResult = () => {
    if(!props.list || !Array.isArray(props.list)) return console.log('error' , props.list);
    let currentTotal:number | null = Sum(props.list);
    discountResult.value.summaryPrice = currentTotal;
    for (const discount of discountlist) {
        if (discount.campaignType === 'coupon') {
            const beforecalculate = currentTotal;
            currentTotal = CouponCalculator(currentTotal, discount as CouponCampaign) || 0;
            discountResult.value.coupon = beforecalculate - currentTotal;
        } else if (discount.campaignType === 'on-top') {
            const beforecalculate = currentTotal;
            currentTotal = onTopCalculator(props.list, discount as OnTopCampaign , currentTotal) || 0;
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

watch(props.list , () => {
    updateResult();
}, { immediate: true })

</script>
<template>
    <div class="h-full sm:w-1/4 bg-stone-300 rounded-lg text-stone-700 overflow-hidden shadow-lg">
        <div class="flex flex-col bg-stone-500 py-10 px-4 rounded-lg text-stone-200 shadow-lg">
            <h4 class=" font-semibold text-lg">Total Price</h4>
            <h1 class="font-bold text-4xl">THB฿{{ discountResult.totalResult }}</h1>
        </div>
        <!-- basket list -->
        <div class="p-4 space-y-4">
            <div class="space-y-4">
                <div class="grid grid-cols-5">
                    <div class="text-lg font-semibold col-span-4">Summary Order</div>
                    <div class=" font-semibold"></div>
                </div>
                <ul class="w-full max-h-[200px] overflow-y-auto space-y-1">
                    <template v-if="props.list && Array.isArray(props.list)">
                        <li 
                        v-for="list in props.list" :key="`list-${list.name}`"
                        class="grid grid-cols-5"
                        >
                            <div class="col-span-4 flex items-center gap-2"><span class="size-5 flex items-center justify-center bg-stone-500 rounded-full text-xs font-semibold text-stone-200">{{ list.amount }}</span>{{ list.name }}</div>
                            <div v-if="list.amount" class="">{{ list.price*list?.amount }}</div>
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
                    <div class=" font-semibold"></div>
                </div>
                <ul class="w-full h-[200px] overflow-y-auto space-y-1">
                    <template v-if="discountlist && Array.isArray(discountlist)">
                        <li v-for="list in discountlist" :key="`list-${list.title}`" class="grid grid-cols-5">
                            <template v-if="list.campaignType === 'coupon'">
                                <div class="col-span-4">{{ list.title }} ลด {{ list.value }} {{ list.type === 'percent' ? '%' : 'บาท' }} </div>
                                <div class="text-red-500">- {{ discountResult.coupon }} ฿</div>
                            </template>
                            <template v-else-if="list.campaignType === 'on-top'">
                                <div v-if="list.type === 'categories'" class="col-span-4">{{ list.title }} ลด {{ list.value }} % เมื่อซื้อสินค้าประเภท {{ list.discountCategory }}</div>
                                <div v-else class="col-span-4">{{ list.title }} ลด {{ list.value }} บาท</div>
                                <div class="text-red-500">- {{ discountResult.onTop }} ฿</div>
                            </template>
                            <template v-else-if="list.campaignType === 'seasonal'">
                                <div class="col-span-4">{{ list.title }} ทุกการซื้อ {{ list.every }} บาท ลด {{ list.discount }} บาท</div>
                                <div class="text-red-500">- {{ discountResult.seasonal }} ฿</div>
                            </template>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>
