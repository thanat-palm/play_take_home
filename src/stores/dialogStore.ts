import { defineStore } from "pinia";
import { ref } from "vue";

export const useDialogStore = defineStore('dialog',() => {
    const isItemOpen = ref(false);
    const isResultOpen = ref(false);

    
    const showItem = () => {
        isResultOpen.value = false;
        isItemOpen.value = !isItemOpen.value;
    }

    const showResult = () => {
        isItemOpen.value = false;
        isResultOpen.value = !isResultOpen.value;
    }
    

    return { isItemOpen , isResultOpen , showResult , showItem };
})