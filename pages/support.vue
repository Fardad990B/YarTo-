<template>
  <div class="mx-auto max-w-2xl py-4 sm:py-10">
    <AppCard>
      <div class="text-center">
        <img :src="creator.image" :alt="'تصویر ' + creator.name" class="mx-auto size-28 rounded-full object-cover ring-4 ring-teal-50">
        <p class="mt-5 text-sm font-semibold text-teal-700">{{ creator.title }}</p>
        <h1 class="mt-1 text-3xl font-black text-slate-900">حمایت از {{ creator.name }}</h1>
        <p class="mx-auto mt-5 max-w-lg leading-8 text-slate-600">{{ creator.bio }}</p>
        <p class="mx-auto mt-4 max-w-lg rounded-xl bg-teal-50 p-4 text-sm leading-7 text-teal-900">{{ creator.supportText }}</p>
      </div>
      <div class="mx-auto mt-7 max-w-sm space-y-3">
        <button disabled class="w-full cursor-not-allowed rounded-xl bg-slate-200 px-4 py-3 font-bold text-slate-500">حمایت ۳۰٬۰۰۰ تومان (به‌زودی فعال می‌شود)</button>
        <button disabled class="w-full cursor-not-allowed rounded-xl border border-slate-300 px-4 py-3 text-slate-500">انتخاب مبلغ دلخواه (به‌زودی)</button>
        <NuxtLink to="/" class="block text-center text-sm text-slate-500 hover:text-teal-700">فعلاً نه، ادامه رایگان</NuxtLink>
      </div>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
import { creator } from '~/config/creator'
</script>
