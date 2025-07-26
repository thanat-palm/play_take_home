<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  modelValue?: number | string | null; 
  disabled?: boolean; 
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref<string | number | null>(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    internalValue.value = newValue;
  }
}, { immediate: true });

const formattedValue = computed<string>(() => {
  if (internalValue.value === null || internalValue.value === '') {
    return '';
  }
  
  const num = parseInt(String(internalValue.value), 10);
  if (isNaN(num)) {
    return ''; 
  }

  return num.toLocaleString('en-US'); 
});


const onKeydown = (event: KeyboardEvent) => {
  const allowedKeys = [
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab',
  ];

  if (allowedKeys.includes(event.key)) {
    return;
  }

  if ((event.ctrlKey || event.metaKey) && ['c', 'x', 'a'].includes(event.key.toLowerCase())) {
    return;
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') {
    return;
  }

  const isNumber = /^[0-9]$/.test(event.key);

  if (!isNumber) { 
    event.preventDefault();
  }
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  let cleanedValue = value.replace(/[^0-9]/g, '');

  internalValue.value = cleanedValue; 
};

const onBlur = () => {
  const numValue = parseInt(String(internalValue.value), 10);
  if (!isNaN(numValue)) {
    emit('update:modelValue', numValue);
  } else {
    emit('update:modelValue', null); 
  }
};
</script>

<template>
  <div class="relative flex items-center input input-bordered w-full rounded-lg">
    <input
      type="text"
      :value="formattedValue"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeydown"
      class="flex-grow bg-transparent outline-none border-none p-2"
      :disabled="disabled"
    />
  </div>
</template>

