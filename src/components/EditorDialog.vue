<template>
    <button @click="() => isOpen = true" class="py-2 px-4 bg-stone-700 rounded-lg shadow-lg text-stone-200 transition-all hover:opacity-80 active:scale-105">
        Campaign Editor
    </button>
    <Transition name="fade">
        <dialog 
            v-if="isOpen"
            class="fixed top-0 left-0 w-full h-full bg-black/50 z-70 flex items-center justify-center"
            @click.self="() =>  isOpen = false"
        >
            <div class="bg-stone-200 w-1/2 min-w-[300px] h-4/5 rounded-lg shadow-lg p-4 flex flex-col gap-2 text-stone-800">
                <div class="flex items-center justify-between my-4">
                    <h1 class="text-3xl font-semibold">Campaign Editor</h1>
                    <button class="py-2 px-4 bg-stone-700 rounded-lg shadow-lg text-stone-200 font-semibold transition-all hover:opacity-80 active:scale-105">Confirm</button>
                </div>
                <div class="flex-1 flex gap-4">
                    <div class="w-full h-full rounded-lg bg-stone-400 p-4">
                        <h1 class="text-xl font-semibold ">Discount Coupon</h1>
                        <ul>
                            <li></li>
                        </ul>
                    </div>
                    <div class="w-full h-full flex flex-col gap-4">
                        <div class="h-full rounded-lg bg-stone-400 p-4 flex flex-col justify-between">
                            <h1 class="text-xl font-semibold ">Percentage Discount Category</h1>
                            <ul class="space-y-5">
                                <li class="flex gap-2 items-center text-lg">
                                    <input type="radio" name="categoriesOption" id="" class="size-5">
                                    <h2>accessories</h2>
                                </li>
                                <li class="flex gap-2 items-center text-lg">
                                    <input type="radio" name="categoriesOption" id="" class="size-5">
                                    <h2>apparel</h2>
                                </li>
                                <li class="flex gap-2 items-center text-lg">
                                    <input type="radio" name="categoriesOption" id="" class="size-5">
                                    <h2>electronics</h2>
                                </li>
                            </ul>
                            <div class="">
                                <h2>discount amount</h2>
                                <NumberInput class="bg-stone-200"/>
                            </div>
                        </div>
                        <div class="w-full h-full p-4 bg-stone-400 rounded-lg flex flex-col justify-between">
                                <h1 class="text-xl font-semibold ">Seasonal Campaign</h1>
                                <div class="flex flex-col gap-4">
                                    <div class="">
                                        <h2>every value</h2>
                                        <NumberInput class="bg-stone-200"/>
                                    </div>
                                    <div class="">
                                        <h2>discount value</h2>
                                        <NumberInput class="bg-stone-200"/>
                                    </div>
                                </div>
                                <button 
                                    class="uppercase px-4 py-2 font-semibold text-stone-200 rounded-lg transition-all hover:opacity-80 active:scale-105 shadow-lg cursor-pointer"
                                    :class="isSeasonal === true ? 'bg-green-700' : 'bg-red-700'"
                                    @click="() => isSeasonal = !isSeasonal "
                                >
                                    campaign {{ isSeasonal === false ? 'on' : 'off' }}
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </dialog>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NumberInput from './NumberInput.vue';


const isOpen = ref(false);
const isSeasonal = ref(false);
</script>

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