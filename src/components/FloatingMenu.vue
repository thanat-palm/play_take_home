<script setup lang="ts">
import { IconArticle, IconCategory, IconShoppingCart } from '@tabler/icons-vue';
import { ref } from 'vue';
import { useDialogStore } from '../stores/dialogStore';

const dialogStore = useDialogStore();
const isOpen = ref(false);

</script>
<template>
    <div class="absolute right-2 bottom-2 sm:right-5 sm:bottom-5 m-0 z-80">
        <ul 
        class="transition-all absolute bottom-15 left-1/2 -translate-x-1/2 flex flex-col"
        :class="isOpen ? ' mb-2 gap-2 ' : 'invisible'">
            <li 
                @click="dialogStore.showResult"
                class="transition-all hover:scale-105 active:scale-110 cursor-pointer"    
                :class="isOpen ? 'bg-stone-200 p-2 rounded-full flex items-center justify-center size-12' : 'hidden'"><IconArticle/></li>
            <li 
                @click="dialogStore.showItem"
                class="transition-all hover:scale-105 active:scale-110 cursor-pointer"    
                :class="isOpen ? 'bg-stone-200 p-2 rounded-full flex items-center justify-center size-12' : 'hidden'"><IconShoppingCart/></li>
        </ul>
        <button @click="() => isOpen = !isOpen" class="size-15 bg-stone-700 shadow-lg rounded-full flex items-center justify-center text-stone-200 hover:scale-105 active:scale-110 cursor-pointer"><IconCategory/></button>
    </div>
</template>