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

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// กำหนด Interface สำหรับ Props เพื่อความชัดเจนของ Type
interface Props {
  modelValue?: number | string | null; // ค่าที่ผูกกับ v-model, สามารถเป็น Number, String หรือ Null
  disabled?: boolean; // ปิดการใช้งาน Input
  // maxDecimalPlaces? ไม่ใช้แล้ว เพราะห้ามทศนิยม
}

// กำหนด Props และค่าเริ่มต้น (default values)
const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  disabled: false,
  // maxDecimalPlaces ไม่ใช้แล้ว
});

// กำหนด Emits สำหรับเหตุการณ์ 'update:modelValue'
const emit = defineEmits(['update:modelValue']);

// ตัวแปรภายในสำหรับเก็บค่าใน input field
const internalValue = ref<string | number | null>(props.modelValue);

// Watcher สำหรับซิงค์ internalValue กับ props.modelValue
// เพื่อรองรับการเปลี่ยนแปลงค่าจากภายนอก component (เช่น การใช้ v-model)
watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    internalValue.value = newValue;
  }
}, { immediate: true });

// Computed Property สำหรับจัดรูปแบบค่าที่จะแสดงใน Input
const formattedValue = computed<string>(() => {
  if (internalValue.value === null || internalValue.value === '') {
    return '';
  }
  // แปลงเป็นตัวเลขเต็ม (integer) ก่อนจัดรูปแบบ
  const num = parseInt(String(internalValue.value), 10); // ใช้ parseInt แทน parseFloat
  if (isNaN(num)) {
    return ''; // ถ้าแปลงไม่ได้ ให้คืนค่าว่าง
  }

  // จัดรูปแบบโดยไม่มีทศนิยมเลย
  return num.toLocaleString('en-US'); // ไม่ต้องระบุ minimum/maximumFractionDigits
});

// จัดการเหตุการณ์ Keydown เพื่อควบคุมการป้อนข้อมูล
const onKeydown = (event: KeyboardEvent) => {
  const allowedKeys = [
    'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab',
  ];

  // อนุญาตปุ่มพื้นฐาน
  if (allowedKeys.includes(event.key)) {
    return;
  }

  // อนุญาต Ctrl/Cmd + C, X, A (Copy, Cut, Select All)
  if ((event.ctrlKey || event.metaKey) && ['c', 'x', 'a'].includes(event.key.toLowerCase())) {
    return;
  }

  // อนุญาต Ctrl/Cmd + V (Paste) แต่จะไปกรองข้อมูลใน onInput แทน
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') {
    return;
  }

  const isNumber = /^[0-9]$/.test(event.key);

  // ไม่อนุญาตจุดทศนิยมเลย
  if (!isNumber) { // ถ้าไม่ใช่ตัวเลข ให้ป้องกันการพิมพ์
    event.preventDefault();
  }
};

// จัดการเหตุการณ์ Input เพื่อกรองและอัปเดตค่า
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  // ลบอักขระที่ไม่ใช่ตัวเลขออกทั้งหมด (รวมถึงจุดทศนิยม)
  let cleanedValue = value.replace(/[^0-9]/g, '');

  internalValue.value = cleanedValue; // อัปเดตค่าภายในทันที
};

// จัดการเหตุการณ์ Blur เพื่อ emit ค่าสุดท้ายที่ถูกต้อง
const onBlur = () => {
  const numValue = parseInt(String(internalValue.value), 10); // ใช้ parseInt เพื่อแปลงเป็นจำนวนเต็ม
  if (!isNaN(numValue)) {
    emit('update:modelValue', numValue);
  } else {
    emit('update:modelValue', null); // ถ้าไม่ใช่ตัวเลข (หรือว่างเปล่า) ให้ emit เป็น null
  }
};
</script>