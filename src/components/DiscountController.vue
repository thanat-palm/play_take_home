<script setup lang="ts">
import { ref, watch } from 'vue';
import type { CouponCampaign, DiscountSetProps } from '../types/campaign';
import EditorDialog from './EditorDialog.vue';
import NumberInput from './NumberInput.vue';
import { defaultOnTopDiscountForm } from '../constants/optop';
import { defaultSeasonalDiscountForm } from '../constants/seasonal';
import { useAppStore } from '../stores/appStore';

const appStore = useAppStore();
const couponLists = ref<CouponCampaign[]>([]);

const couponDiscountForm = ref<CouponCampaign>();
const onTopDiscountForm = ref({...defaultOnTopDiscountForm});
const seasonalDiscountForm = ref({...defaultSeasonalDiscountForm});

const isOnTopActive = ref(false);
const isSeasonalActive = ref(false);
const isPointsDiscount = ref(false);
const categoriesValue = ref(0);
const pointValue = ref(0);

const handleGetDiscountSet = (discountData:DiscountSetProps) => {
    const {coupon , ontop , seasonal} = discountData;
    couponLists.value = coupon;
    onTopDiscountForm.value.discountCategory = ontop.category;
    onTopDiscountForm.value.value = ontop.value;
    categoriesValue.value = ontop.value;
    seasonalDiscountForm.value.every = seasonal.every;
    seasonalDiscountForm.value.discount = seasonal.discount;
    isOnTopActive.value = ontop.status;
    isSeasonalActive.value = seasonal.status;
}

const handleDiscount = () => {
    appStore.discount = [];
    if(couponDiscountForm.value) {
        const discountFiltered = appStore.discount.filter(d => d.campaignType !== couponDiscountForm.value?.campaignType)
        if(discountFiltered.length !== appStore.discount.length) appStore.discount = discountFiltered;
        appStore.discount.push(couponDiscountForm.value);
    }

    if(isOnTopActive.value) {
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
        const discountFiltered = appStore.discount.filter(d => d.campaignType !== onTopDiscountForm.value.campaignType)
        if(discountFiltered.length !== appStore.discount.length) appStore.discount = discountFiltered;
        appStore.discount.push(onTopDiscountForm.value);
    }
    
    if(isSeasonalActive.value) {
        const discountFiltered = appStore.discount.filter(d => d.campaignType !== seasonalDiscountForm.value.campaignType)
        if(discountFiltered.length !== appStore.discount.length) appStore.discount = discountFiltered;
        appStore.discount.push(seasonalDiscountForm.value);
    }
    
    console.log(appStore.discount);
}

const handlePickUpCoupon = (coupon:CouponCampaign) => {
  couponDiscountForm.value = coupon;
  handleDiscount();
}

watch(()=> couponLists.value , () => {
  couponDiscountForm.value = undefined;
  handleDiscount();
},{deep:true});

watch(()=> onTopDiscountForm.value , () => {
  handleDiscount();
},{deep:true});

watch(()=> seasonalDiscountForm.value , () => {
  handleDiscount();
},{deep:true});

watch(() => isPointsDiscount.value , () => {
  onTopDiscountForm.value.value = categoriesValue.value;
  handleDiscount();
},{deep:true});

</script>
<template>
    <div class="w-full h-full bg-stone-300 rounded-lg p-4 flex flex-col gap-5 text-stone-700 shadow-lg relative">
        <h1 class="text-2xl font-semibold">Discounts</h1>
        <ul class="space-y-2 h-[300px] overflow-y-auto p-4">
            <template v-if="couponLists && Array.isArray(couponLists)" >
                <li 
                    v-for="(coupon , index) in couponLists"
                    :key="`coupon-${index}`"
                    class="bg-stone-200 rounded-lg overflow-hidden flex h-[100px]"
                >
                    <template v-if="coupon.campaignType === 'coupon'">
                        <div v-if="coupon.type === 'percent'" class="p-4 w-[150px] sm:w-[200px] bg-stone-800 text-stone-200 ">
                            <p class="text-sm font-light">Discount</p>
                            <h1 class="font-bold text-3xl sm:text-4xl">{{ coupon.value }} <span class="text-sm">%</span></h1>
                        </div>
                        <div v-else class="p-4 bg-yellow-800 w-[150px] sm:w-[200px] text-stone-200 ">
                            <p class="text-sm font-light">Discount</p>
                            <h1 class="font-bold text-3xl sm:text-4xl">{{ coupon.value }} <span class="text-sm">฿</span></h1>
                        </div>
                        <div class="flex-1 p-2 flex flex-col sm:flex-row sm:items-center justify-between">
                            <p class="text-base sm:text-xl">{{ coupon.title }}</p>
                            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
                                <p class="text-xs sm:text-stone-700/50">{{ coupon.campaignType }} / {{ coupon.type }}</p>
                                <button @click="handlePickUpCoupon(coupon)" :disabled="couponDiscountForm === coupon" class="py-1 px-3 sm:py-2 sm:px-4 bg-stone-700 shadow-lg rounded-lg text-stone-200 font-semibold transition-all duration-200 active:scale-105 cursor-pointer disabled:opacity-50 text-sm">Apply</button>
                            </div>
                        </div>
                    </template>
                </li>
            </template>
            <template v-if="!couponLists || !Array.isArray(couponLists) || couponLists.length < 1">
                <li class="w-full h-full flex items-center justify-center text-stone-800 text-xl sm:text-2xl font-semibold">
                    No Coupon
                </li>
            </template>
        </ul>
        <div class="flex-1 flex flex-col lg:flex-row bg-stone-100 rounded-lg">
            <div class="lg:w-1/4 flex items-center justify-center p-4 w-full">
                <div class="space-y-3 sm:space-y-5 text-nowrap">
                    <div class="flex items-center gap-2">
                        <input type="radio" name="on-top" class="size-4 sm:size-5" :value="false" v-model="isPointsDiscount">
                        <span class="text-sm sm:text-base">Categories Discount</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="radio" name="on-top" class="size-4 sm:size-5" :value="true" v-model="isPointsDiscount">
                        <span class="text-sm sm:text-base">Points Discount</span>
                    </div>
                </div>
            </div>
            <div class="h-9/10 w-[2px] bg-stone-400 rounded-full mr-5 my-auto max-lg:hidden"></div>
            <div class="w-9/10 h-[2px] bg-stone-400 rounded-full mx-auto lg:hidden"></div>
            
            <div class="flex flex-col md:flex-row items-center justify-around lg:justify-between w-full p-4 max-lg:h-full">
                <div :class="!isPointsDiscount && 'opacity-50'">
                    <h1 class="text-base sm:text-lg">Discount by points {{ pointValue }}</h1>
                    <span class="flex gap-2 items-center mt-2">
                        <NumberInput class="bg-stone-200 max-sm:w-[100px] w-[120px] text-sm sm:text-base" :disabled="!isPointsDiscount" v-model="pointValue"/>
                        <button @click="handleDiscount" class="uppercase px-3 py-1 sm:px-4 sm:py-2 font-semibold bg-stone-700 text-stone-200 rounded-lg transition-all hover:opacity-80 active:scale-105 shadow-lg cursor-pointer text-sm">enter</button>
                    </span>
                </div>
                <EditorDialog @discount-data="handleGetDiscountSet"/>
            </div>
        </div>
    </div>
</template>