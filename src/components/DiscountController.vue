<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Campaign, CouponCampaign } from '../types/campaign';
import EditorDialog from './EditorDialog.vue';
import NumberInput from './NumberInput.vue';

const couponLists:CouponCampaign[] = [
    {
        title: 'โค้ดโคตรคุ้ม เอาใจสายเปย์',
        value: 40,
        campaignType: 'coupon',
        type: 'percent'
    },
    {
        title: 'โค้ดโคตรคุ้ม',
        value: 20,
        campaignType: 'coupon',
        type: 'percent'
    },
    {
        title: 'โค้ดสุดคุ้ม',
        value: 10,
        campaignType: 'coupon',
        type: 'percent'
    },
    {
        title: 'โค้ดลดตรงๆ ลดทันที ',
        value: 25,
        campaignType: 'coupon',
        type: 'amount'
    },{
        title: 'โค้ดลดสุดๆ ลดทันที',
        value: 50,
        campaignType: 'coupon',
        type: 'amount'
    }
]

const emit = defineEmits<{
    (e:'select-discount', discountList: Campaign[]): void
}>()

const handleEmit = (discountList: Campaign[]) => {
    emit('select-discount',discountList);
}

const discount = ref<Campaign[]>([
    {
        title: 'ลดแรง',
        campaignType: 'on-top',
        type: 'categories',
        value: 0,
        discountCategory: 'electronics',
    },
    {
        title: 'โปร 8.8',
        campaignType: 'seasonal',
        every: 0,
        discount: 0,
    }
])


const isPointsDiscount = ref(false);
const pointValue = ref(0);

watch(() => isPointsDiscount , () => {
    if(!isPointsDiscount) {
        
    }
})

</script>
<template>
    <div class="w-full h-full bg-stone-300 rounded-lg p-4 flex flex-col gap-5 text-stone-700 shadow-lg relative">
        <h1 class="text-2xl font-semibold">Discounts</h1>
        <ul class="space-y-2 max-h-[450px] overflow-y-auto p-4">
            <li 
                v-if="couponLists && Array.isArray(couponLists)" 
                v-for="(coupon , index) in couponLists"
                :key="`coupon-${index}`"
                class="bg-stone-200 rounded-lg overflow-hidden flex h-[100px]"
            >
                <template v-if="coupon.campaignType === 'coupon'">
                    <div v-if="coupon.type === 'percent'" class="p-4 w-[200px] bg-lime-800 text-stone-200 ">
                        <p class="text-sm font-light">Discount</p>
                        <h1 class="font-bold text-4xl">{{ coupon.value }} <span class="text-sm">%</span></h1>
                    </div>
                    <div v-else class="p-4 bg-yellow-800 w-[200px] text-stone-200 ">
                        <p class="text-sm font-light">Discount</p>
                        <h1 class="font-bold text-4xl">{{ coupon.value }} <span class="text-sm">฿</span></h1>
                    </div>
                    <div class="flex-1 p-2 flex items-center justify-between">
                        <p class="text-xl">{{ coupon.title }}</p>
                        <div class="flex items-center gap-2">
                            <p class="text-stone-700/50">{{ coupon.campaignType }} / {{ coupon.type }}</p>
                            <button class="py-2 px-4 bg-stone-700 shadow-lg rounded-lg text-stone-200 font-semibold transition-all duration-200 active:scale-105 cursor-pointer">Apply</button>
                        </div>
                    </div>
                </template>
                </li>
            </ul>
            <div class="flex-1 flex bg-stone-100 rounded-lg">
                <div class="w-1/4 flex items-center justify-center">
                    <div class="space-y-5">
                        <div class="flex items-center gap-2">
                        <input type="radio" name="on-top" class="size-5" :value="false" v-model="isPointsDiscount">
                        <span>Categories Discount</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="radio" name="on-top" class="size-5" :value="true" v-model="isPointsDiscount">
                        <span>Points Discount</span>
                    </div>
                </div>
            </div>
            <div class="h-9/10 w-[2px] bg-stone-400 rounded-full mr-5 my-auto"></div>
            <div class="flex items-center justify-between w-full p-4">
                <div :class="!isPointsDiscount && 'opacity-50'">
                    <h1>Discount by points {{ pointValue }}</h1>
                    <NumberInput class="bg-stone-200" :disabled="!isPointsDiscount" v-model="pointValue"/>
                </div>
                <EditorDialog/>
            </div>
        </div>
    </div>
</template>