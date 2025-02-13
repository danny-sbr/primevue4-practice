<template>
  <div class="space-y-8">
    <h2 class="mb-8 text-3xl font-bold">IconField</h2>
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText v-model="value1" placeholder="Search" />
    </IconField>

    <IconField>
      <InputIcon class="top-[43.75%]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
            fill="#6366F1"
            stroke="#4F46E5"
            stroke-width="1"
          />
          <path
            d="M12 8L16 10V14L12 16L8 14V10L12 8Z"
            fill="white"
            stroke="#4F46E5"
            stroke-width="0.5"
          />
          <circle cx="12" cy="12" r="2" fill="#4F46E5" />
          <path d="M12 6L14 7V9L12 10L10 9V7L12 6Z" fill="#C7D2FE" />
        </svg>
      </InputIcon>
      <InputText v-model="value2" placeholder="Search" />
    </IconField>

    <FloatLabel variant="on">
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          id="on_label"
          v-model="value3"
          autocomplete="off"
          size="large"
        />
      </IconField>
      <label for="on_label">On Label</label>
    </FloatLabel>
  </div>
</template>

<script setup>
const value1 = ref(null)
const value2 = ref(null)
const value3 = ref(null)
</script>
