<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NuxtLink to="/dashboard" class="focus-ring flex items-center gap-2 rounded-xl text-lg font-bold text-teal-800">
          <span class="grid size-10 place-items-center rounded-xl bg-teal-700 text-xl text-white">ی</span> یار تو
        </NuxtLink>
        <nav class="hidden items-center gap-1 sm:flex" aria-label="منوی اصلی">
          <NuxtLink v-for="item in mainLinks" :key="item.to" :to="item.to" class="focus-ring rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800">{{ item.label }}</NuxtLink>
          <NuxtLink to="/support" class="focus-ring rounded-lg px-3 py-2 text-sm text-teal-700 hover:bg-teal-50">حمایت</NuxtLink>
        </nav>
        <button v-if="loggedIn" class="focus-ring rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100" @click="logout">خروج</button>
        <NuxtLink v-else to="/login" class="focus-ring rounded-lg px-3 py-2 text-sm text-teal-700">ورود</NuxtLink>
      </div>
    </header>
    <main class="mx-auto max-w-6xl px-4 py-6 pb-24"><slot /></main>
    <nav v-if="loggedIn" class="fixed inset-x-0 bottom-0 z-10 border-t border-slate-200 bg-white sm:hidden" aria-label="منوی موبایل">
      <div class="mx-auto grid max-w-md grid-cols-4">
        <NuxtLink v-for="item in mobileLinks" :key="item.to" :to="item.to" class="focus-ring flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-slate-600"><span class="text-xl">{{ item.icon }}</span>{{ item.label }}</NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { loggedIn, clear: clearSession } = useUserSession()
const mainLinks = [{ to: '/dashboard', label: 'داشبورد' }, { to: '/planning', label: 'برنامه‌ریزی' }, { to: '/home-management', label: 'خانه' }, { to: '/finance', label: 'مالی' }]
const mobileLinks = [{ to: '/dashboard', label: 'خانه', icon: '⌂' }, { to: '/planning', label: 'برنامه‌ها', icon: '✓' }, { to: '/finance', label: 'مالی', icon: '◈' }, { to: '/settings', label: 'تنظیمات', icon: '⚙' }]
async function logout() { await $fetch('/api/auth/logout', { method: 'POST' }); await clearSession(); await navigateTo('/login') }
watch(() => route.path, () => refreshNuxtData())
</script>
