<script setup lang="ts">
import DiscountController from './components/DiscountController.vue';
import ItemsList from './components/ItemsList.vue';
import Result from './components/Result.vue';

</script>

<template>
  <div class="flex h-screen p-5 space-x-5 relative">
    <Result/>
    <div class="flex flex-col flex-1 space-y-5">
      <ItemsList/>
      <div class="flex-1">
        <DiscountController/>
      </div>
    </div>
  </div>
 </template>
