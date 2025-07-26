<script setup lang="ts">
import { ref } from 'vue';
import NumberInput from './NumberInput.vue';
import type { CouponCampaign, DiscountSetProps } from '../types/campaign';
import { defaultCouponForm } from '../constants/coupon';
import { categories } from '../constants/items';
import { defaultOnTopForm } from '../constants/optop';
import { defaultSeasonalForm } from '../constants/seasonal';

const emit = defineEmits<{
    (e:'discount-data' , discountData:DiscountSetProps):void
}>();

const handleEmitDiscountSet = () => {
    if(!couponList.value || !Array.isArray(couponList.value) || couponList.value.length < 1 ) return alert('ไม่มีคูปอง');
    if(onTopForm.value.status === true) {
        if(onTopForm.value.value === 0 ) return alert('ห้ามค่าเป็น 0');
    }
    if(seasonalForm.value.status === true) {
        if( seasonalForm.value.every === 0 || seasonalForm.value.discount === 0) return alert('ห้ามค่าเป็น 0');
        if(!seasonalForm.value.every || !seasonalForm.value.discount) return alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
    }
    emit('discount-data', {
        coupon:couponList.value,
        ontop: onTopForm.value,
        seasonal: seasonalForm.value,
    });
    couponForm.value = {...defaultCouponForm};
    couponList.value = [];
    isOpen.value = false;
    alert('เพิ่มข้อมูลสำเร็จ');
}

const couponForm = ref({...defaultCouponForm});
const onTopForm = ref({...defaultOnTopForm});
const seasonalForm = ref({...defaultSeasonalForm});
const isOpen = ref(false);
const couponList = ref<CouponCampaign[]>([]);

const addCoupon = () => {
    const {title , type , value} = couponForm.value;
    if(!title || !type || !value) return alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    if(couponList.value.find(c => c.title === couponForm.value.title)) return alert('ชื่อคูปองซ้ำกัน');
    couponList.value.push(couponForm.value);
    couponForm.value = {...defaultCouponForm};
}

const removeCoupon = (coupon:CouponCampaign) => {
    const updatedList = couponList.value.filter(c => c.title !== coupon.title);
    if (updatedList.length === couponList.value.length)return alert('ไม่พบคูปองที่ต้องการลบ');
    couponList.value = updatedList;
}

</script>

<template>
    <button @click="() => isOpen = true" class="py-2 px-4 bg-stone-700 rounded-lg shadow-lg text-stone-200 transition-all hover:opacity-80 active:scale-105 text-sm sm:text-base">
        Campaign Editor
    </button>
    <Transition name="fade">
        <dialog 
            v-if="isOpen"
            class="fixed inset-0 w-full h-full bg-black/50 z-70 flex items-center justify-center p-4 sm:p-6"
            @click.self="() => isOpen = false"
        >
            <div class="bg-stone-200 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-4xl h-auto max-h-[90vh] rounded-lg shadow-lg p-4 flex flex-col gap-2 text-stone-800 overflow-y-auto">
                <div class="flex flex-col sm:flex-row items-center justify-between my-2 sm:my-4 gap-2 sm:gap-0">
                    <h1 class="text-xl sm:text-2xl md:text-3xl font-semibold text-center sm:text-left">Campaign Editor</h1>
                    <button @click="handleEmitDiscountSet" class="py-1 px-3 sm:py-2 sm:px-4 bg-stone-700 rounded-lg shadow-lg text-stone-200 font-semibold transition-all hover:opacity-80 active:scale-105 text-sm">Confirm</button>
                </div>
                <div class="flex-1 flex flex-col lg:flex-row gap-4 overflow-y-auto">
                    <div class="w-full lg:w-1/2 h-auto lg:h-full rounded-lg bg-stone-400 p-4 flex flex-col gap-2">
                        <div class="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                            <h1 class="text-lg sm:text-xl font-semibold ">Discount Coupon</h1>
                            <div class="flex flex-wrap justify-center gap-2">
                                <button 
                                    class="px-3 py-1 sm:px-4 sm:py-2 bg-stone-700 text-stone-200 rounded-lg shadow-lg transition-all hover:opacity-80 active:scale-105 cursor-pointer text-sm"
                                    @click="addCoupon()"
                                >
                                    Add
                                </button>
                                <button 
                                    class="px-3 py-1 sm:px-4 sm:py-2 bg-red-700 text-red-200 rounded-lg shadow-lg transition-all hover:opacity-80 active:scale-105 cursor-pointer text-sm"
                                    @click="() => couponList = []"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            <div class="w-full">
                                <h2 class="text-sm sm:text-base">title <span class="text-red-700">*</span></h2>
                                <input type="text" v-model="couponForm.title" class="bg-stone-200 w-full p-2 rounded-lg text-sm"/>
                            </div>
                            <div class="w-full">
                                <h2 class="text-sm sm:text-base">type</h2>
                                <select name="" id="" v-model="couponForm.type" class="p-2 rounded-lg w-full bg-stone-200 text-sm">
                                    <option value="amount">Amount</option>
                                    <option value="percent">Percent</option>
                                </select>
                            </div>
                            <div class="w-full">
                                <h2 class="text-sm sm:text-base">value <span class="text-red-700">*</span></h2>
                                <NumberInput v-model="couponForm.value" class="bg-stone-200 w-full text-sm"/>
                            </div>
                        </div>
                        <ul class="overflow-y-auto max-h-[250px] lg:max-h-[calc(100%-150px)] space-y-2 p-1">
                            <template v-if="couponList && Array.isArray(couponList)">
                                <li v-for="coupon in couponList" :key="`coupon-${coupon.title}`"
                                    class="flex flex-col sm:flex-row items-start sm:items-center p-2 justify-between bg-stone-300 rounded-lg text-sm sm:text-base gap-2 sm:gap-0"
                                >
                                    <div class="flex flex-col sm:flex-row sm:gap-4 w-full sm:w-auto">
                                        <h1 class="font-semibold text-stone-700">title: {{ coupon.title }}</h1>
                                        <h1 class="text-stone-600">type: {{ coupon.type }}</h1>
                                        <h1 class="text-stone-600">value: {{ coupon.value }}</h1>
                                    </div>
                                    <button 
                                        class="rounded-lg py-1 px-2 active:scale-105 transition-all cursor-pointer hover:opacity-80 bg-red-700 text-red-200 text-xs sm:text-sm"
                                        @click="removeCoupon(coupon)"
                                    >
                                        ลบ
                                    </button>
                                </li>
                            </template>
                             <template v-if="!couponList || !Array.isArray(couponList) || couponList.length < 1">
                                <li class="w-full h-full flex items-center justify-center text-stone-800 text-base sm:text-lg font-medium py-4">
                                    No Coupons Added
                                </li>
                            </template>
                        </ul>
                    </div>

                    <div class="w-full lg:w-1/2 h-auto lg:h-full flex flex-col gap-4">
                        <div class="h-full rounded-lg bg-stone-400 p-4 flex flex-col justify-between">
                            <h1 class="text-lg sm:text-xl font-semibold ">Percentage Discount Category</h1>
                            <ul class="space-y-2 mt-2 mb-4 overflow-y-auto max-h-[150px] sm:max-h-[200px]">
                                <li v-for="cat in categories" :key="`cat-select-${cat}`" class="flex gap-2 items-center text-base sm:text-lg">
                                    <input type="radio" name="categoriesOption" :value="cat" v-model="onTopForm.category" class="size-4 sm:size-5">
                                    <h2>{{cat}}</h2>
                                </li>
                            </ul>
                            <div class="mb-4">
                                <h2 class="text-sm sm:text-base">discount amount <span class="text-red-700">*</span></h2>
                                <NumberInput v-model="onTopForm.value" class="bg-stone-200 w-full text-sm"/>
                            </div>
                            <button 
                                class="uppercase px-4 py-2 font-semibold text-stone-200 rounded-lg transition-all hover:opacity-80 active:scale-105 shadow-lg cursor-pointer text-sm sm:text-base"
                                :class="onTopForm.status === true ? 'bg-green-700' : 'bg-red-700'"
                                @click="() => onTopForm.status = !onTopForm.status "
                            >
                                campaign {{ onTopForm.status === false ? 'off' : 'on' }}
                            </button>
                        </div>
                        
                        <div class="w-full h-full p-4 bg-stone-400 rounded-lg flex flex-col justify-between">
                            <h1 class="text-lg sm:text-xl font-semibold ">Seasonal Campaign</h1>
                            <div class="flex flex-col gap-4 my-4">
                                <div class="">
                                    <h2 class="text-sm sm:text-base">every value <span class="text-red-700">*</span></h2>
                                    <NumberInput v-model="seasonalForm.every" class="bg-stone-200 w-full text-sm"/>
                                </div>
                                <div class="">
                                    <h2 class="text-sm sm:text-base">discount value <span class="text-red-700">*</span></h2>
                                    <NumberInput v-model="seasonalForm.discount" class="bg-stone-200 w-full text-sm"/>
                                </div>
                            </div>
                            <button 
                                class="uppercase px-4 py-2 font-semibold text-stone-200 rounded-lg transition-all hover:opacity-80 active:scale-105 shadow-lg cursor-pointer text-sm sm:text-base"
                                :class="seasonalForm.status === true ? 'bg-green-700' : 'bg-red-700'"
                                @click="() => seasonalForm.status = !seasonalForm.status "
                            >
                                campaign {{ seasonalForm.status === false ? 'off' : 'on' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    </Transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>