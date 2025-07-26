<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

</script>
<template>
    <div class="absolute right-2 bottom-2 sm:right-5 sm:bottom-5 m-0 z-80">
        <ul 
        class="transition-all absolute bottom-15 right-0 flex flex-col"
        :class="isOpen ? 'bg-stone-700/50 rounded-lg p-2 mb-2  gap-2 w-[100px] ' : 'invisible'">
            <li 
                class="transition-all"    
                :class="isOpen ? 'bg-stone-200 p-2 rounded-lg' : 'invisible'">Result</li>
            <li 
                class="transition-all"    
                :class="isOpen ? 'bg-stone-200 p-2 rounded-lg' : 'invisible'">Item</li>
        </ul>
        <button @click="() => isOpen = !isOpen" class="size-15 bg-stone-700 shadow-lg rounded-full flex items-center justify-center text-stone-200 hover:scale-105 active:scale-110 cursor-pointer">A</button>
    </div>
</template>