<template>
  <div class="mx-auto max-w-xl py-10">
    <AppCard>
      <div class="text-center">
        <div class="mx-auto grid size-16 place-items-center rounded-2xl bg-teal-50 text-3xl text-teal-700">{{ icon }}</div>
        <h1 class="mt-5 text-2xl font-bold text-slate-900">{{ title }}</h1>
        <p class="mt-3 leading-8 text-slate-600">{{ text }}</p>
        <NuxtLink to="/dashboard" class="mt-6 inline-block rounded-xl bg-teal-700 px-5 py-3 font-bold text-white">بازگشت به داشبورد</NuxtLink>
      </div>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; text: string; icon: string }>()
</script>
