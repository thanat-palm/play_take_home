<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Campaign, CouponCampaign, DiscountSetProps, OnTopCampaign, SeasonalCampaign } from '../types/campaign';
import EditorDialog from './EditorDialog.vue';
import NumberInput from './NumberInput.vue';
import { defaultOnTopDiscountForm } from '../constants/optop';
import { defaultSeasonalDiscountForm } from '../constants/seasonal';

const couponLists = ref<CouponCampaign[]>([]);

const emit = defineEmits<{
    (e:'select-discount', discountList: Campaign[]): void
}>()

const defaultDiscount = [
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
]

const discount = ref<Campaign[]>([]);
const couponDiscountForm = ref<CouponCampaign>();
const onTopDiscountForm = ref({...defaultOnTopDiscountForm});
const seasonalDiscountForm = ref({...defaultSeasonalDiscountForm});

const isOnTopActive = ref(true);
const isSeasonalActive = ref(true);
const isPointsDiscount = ref(false);
const pointValue = ref(0);

const handleGetDiscountSet = (discountData:DiscountSetProps) => {
    console.log(discountData);
    const {coupon , ontop , seasonal} = discountData;
    couponLists.value = coupon;
    onTopDiscountForm.value.discountCategory = ontop.category;
    onTopDiscountForm.value.value = ontop.value;
    seasonalDiscountForm.value.every = seasonal.every;
    seasonalDiscountForm.value.discount = seasonal.discount;
    isOnTopActive.value = ontop.status;
    isSeasonalActive.value = seasonal.status;
}

const handleDiscount = () => {
    if(couponDiscountForm.value) {
        const discountFiltered = discount.value.filter(d => d.campaignType !== couponDiscountForm.value?.campaignType)
        if(discountFiltered.length !== discount.value.length) discount.value = discountFiltered;
        discount.value.push(couponDiscountForm.value);
    }

    if(isOnTopActive) {
        switch(isPointsDiscount.value) {
            case true: {
                onTopDiscountForm.value.type = 'points';
                onTopDiscountForm.value.value = pointValue.value;
                break;
            }
            case false: {
                onTopDiscountForm.value.type = 'categories';
                break;
            }
        }
        const discountFiltered = discount.value.filter(d => d.campaignType !== onTopDiscountForm.value.campaignType)
        if(discountFiltered.length !== discount.value.length) discount.value = discountFiltered;
        discount.value.push(onTopDiscountForm.value);
    }
    
    if(isSeasonalActive) {
        const discountFiltered = discount.value.filter(d => d.campaignType !== seasonalDiscountForm.value.campaignType)
        if(discountFiltered.length !== discount.value.length) discount.value = discountFiltered;
        discount.value.push(seasonalDiscountForm.value);
    }
    
    console.log(discount.value);
}

const handleEmit = () => {
    emit('select-discount',discount.value);
}

const handlePickUpCoupon = (coupon:CouponCampaign) => {
  couponDiscountForm.value = coupon;
  console.log(couponDiscountForm.value);
}

</script>
<template>
    <div class="w-full h-full bg-stone-300 rounded-lg p-4 flex flex-col gap-5 text-stone-700 shadow-lg relative">
        <h1 class="text-2xl font-semibold">Discounts</h1>
        <ul class="space-y-2 h-[400px] overflow-y-auto p-4">
            <template v-if="couponLists && Array.isArray(couponLists)" >
                <li 
                    v-for="(coupon , index) in couponLists"
                    :key="`coupon-${index}`"
                    class="bg-stone-200 rounded-lg overflow-hidden flex h-[100px]"
                >
                    <template v-if="coupon.campaignType === 'coupon'">
                        <div v-if="coupon.type === 'percent'" class="p-4 w-[200px] bg-stone-800 text-stone-200 ">
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
                                <button @click="handlePickUpCoupon(coupon)" :disabled="couponDiscountForm === coupon" class="py-2 px-4 bg-stone-700 shadow-lg rounded-lg text-stone-200 font-semibold transition-all duration-200 active:scale-105 cursor-pointer disabled:opacity-50">Apply</button>
                            </div>
                        </div>
                    </template>
                </li>
            </template>
            <template v-if="!couponLists || !Array.isArray(couponLists) || couponLists.length < 1">
                <li class="w-full h-full flex items-center justify-center text-stone-800 text-2xl font-semibold">
                    No Coupon
                </li>
            </template>
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
                <EditorDialog @discount-data="handleGetDiscountSet"/>
            </div>
        </div>
    </div>
</template>