import { defineStore } from "pinia";
import { ref } from "vue";
import type { Item } from "../types/item";
import type { Campaign } from "../types/campaign";

export const useAppStore = defineStore('app', () => {
    const itemList = ref<Item[]>([]);
    const discount = ref<Campaign[]>([]);

    return { itemList , discount };
})