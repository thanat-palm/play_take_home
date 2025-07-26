<script setup lang="ts">
import DiscountController from './components/DiscountController.vue';
import ItemsList from './components/ItemsList.vue';
import Result from './components/Result.vue';
import FloatingMenu from './components/FloatingMenu.vue';
import ItemDialog from './components/ItemDialog.vue';
import ResultDialog from './components/ResultDialog.vue';
</script>

<template>
  <div class="flex h-screen p-5 space-x-5 relative">
    <FloatingMenu class="lg:hidden"/>
    <Result class="max-lg:hidden"/>
    <div class="flex flex-col flex-1 space-y-5">
      <ItemsList class="max-lg:hidden"/>
      <div class="flex-1">
        <DiscountController />
      </div>
    </div>
  </div>
  <ItemDialog/>
  <ResultDialog/>
 </template>
