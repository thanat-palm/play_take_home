<template>
    <Transition name="fade">
        <dialog 
            v-if="dialogStore.isItemOpen"
            class="fixed top-0 left-0 w-full h-full bg-black/50 z-70 flex items-center justify-center"
            @click.self="() =>  dialogStore.isItemOpen = false"
        >
            <ItemsList class="sm:max-w-9/10"/>
        </dialog>
    </Transition>
</template>

<script setup lang="ts">
import { useDialogStore } from '../stores/dialogStore';
import ItemsList from './ItemsList.vue';
const dialogStore = useDialogStore();
</script>