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
            <div class="bg-stone-200 w-1/2 min-w-[300px] h-2/3 rounded-lg shadow-lg p-4">
                <div class="flex items-center justify-between">
                    <h1>Campaign Editor</h1>
                    <button class="py-2 px-4 bg-lime-600 rounded-lg shadow-lg text-stone-700 font-semibold transition-all hover:opacity-80 active:scale-105">Confirm</button>
                </div>
                <div class="flex-1 flex">

                </div>
            </div>
        </dialog>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const isOpen = ref(false);
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