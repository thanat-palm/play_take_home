<template>
    <Transition name="fade">
        <dialog 
            v-if="dialogStore.isResultOpen"
            class="fixed top-0 left-0 w-full h-full bg-black/50 z-70 flex items-center justify-center"
            @click.self="() =>  dialogStore.isResultOpen = false"
        >
            <Result class="max-h-4/5 w-4/5"/>
        </dialog>
    </Transition>
</template>

<script setup lang="ts">
import { useDialogStore } from '../stores/dialogStore';
import Result from './Result.vue';
const dialogStore = useDialogStore();
</script>