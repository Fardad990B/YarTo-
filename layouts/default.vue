<template>
  <div class="app-shell min-h-screen">
    <aside v-if="loggedIn" class="gradient-brand fixed inset-y-0 right-0 z-30 hidden w-72 flex-col px-5 py-6 text-white lg:flex">
      <NuxtLink to="/dashboard" class="focus-ring mb-10 flex items-center gap-3 rounded-2xl px-3 py-2">
        <span class="grid size-11 place-items-center rounded-2xl bg-teal-300 text-xl font-black text-blue-950 shadow-lg shadow-teal-950/20">ی</span>
        <span><strong class="block text-lg">یار تو</strong><small class="text-xs text-blue-100/70">دستیار ساده زندگی</small></span>
      </NuxtLink>
      <p class="mb-3 px-3 text-[11px] font-bold tracking-widest text-blue-100/50">منوی اصلی</p>
      <nav class="space-y-1" aria-label="منوی اصلی">
        <NuxtLink v-for="item in navLinks" :key="item.to" :to="item.to" :class="['focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition', route.path === item.to ? 'nav-active font-bold' : 'text-blue-50/75 hover:bg-white/10 hover:text-white']"><span class="grid size-7 place-items-center rounded-lg bg-white/10 text-base">{{ item.icon }}</span>{{ item.label }}</NuxtLink>
      </nav>
      <div class="mt-auto rounded-2xl border border-white/10 bg-white/10 p-4"><p class="text-sm font-bold">پیشنهاد کوچک</p><p class="mt-2 text-xs leading-6 text-blue-100/70">از امروز، فقط یک کار کوچک را کامل کن.</p><NuxtLink to="/support" class="mt-3 inline-flex text-xs font-bold text-teal-200">حمایت از یار تو ←</NuxtLink></div>
    </aside>

    <div :class="loggedIn ? 'lg:mr-72' : ''">
      <header class="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur lg:bg-transparent lg:backdrop-blur-none">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:py-5">
          <NuxtLink to="/dashboard" class="focus-ring flex items-center gap-2 rounded-xl lg:hidden"><span class="grid size-9 place-items-center rounded-xl bg-blue-950 font-black text-white">ی</span><strong class="text-blue-950">یار تو</strong></NuxtLink>
          <div class="hidden lg:block"><p class="text-sm text-slate-500">{{ greeting }}</p><p class="font-bold text-slate-900">به روز خوبت خوش آمدی</p></div>
          <div class="flex items-center gap-2">
            <NuxtLink v-if="loggedIn" to="/notifications" class="focus-ring relative grid size-11 place-items-center rounded-xl bg-white text-lg text-slate-600 shadow-sm ring-1 ring-slate-200 hover:text-blue-900" aria-label="اعلان‌ها">♢<span class="absolute right-2 top-2 size-1.5 rounded-full bg-teal-400"></span></NuxtLink>
            <NuxtLink v-if="loggedIn" to="/settings" class="focus-ring hidden items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 sm:flex"><span class="grid size-8 place-items-center rounded-full bg-teal-100 text-teal-800">{{ initials }}</span>{{ userName }}</NuxtLink>
            <button v-if="loggedIn" class="focus-ring rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-white" @click="logout">خروج</button>
            <NuxtLink v-else to="/login" class="focus-ring rounded-xl bg-blue-950 px-4 py-2 text-sm font-bold text-white">ورود</NuxtLink>
          </div>
        </div>
      </header>
      <main class="mx-auto max-w-6xl px-4 py-5 pb-24 sm:px-6 lg:py-7 lg:pb-10"><slot /></main>
    </div>

    <nav v-if="loggedIn" class="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(30,41,59,.06)] backdrop-blur lg:hidden" aria-label="منوی موبایل">
      <div class="mx-auto grid max-w-lg grid-cols-4"><NuxtLink v-for="item in mobileLinks" :key="item.to" :to="item.to" :class="['focus-ring flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl text-[11px]', route.path === item.to ? 'font-bold text-blue-900' : 'text-slate-500']"><span :class="['text-xl', route.path === item.to ? 'text-teal-600' : '']">{{ item.icon }}</span>{{ item.label }}</NuxtLink></div>
    </nav>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { loggedIn, user, clear: clearSession } = useUserSession()
const navLinks = [{ to: '/dashboard', label: 'داشبورد', icon: '⌂' }, { to: '/planning', label: 'برنامه‌ریزی', icon: '✓' }, { to: '/home-management', label: 'مدیریت خانه', icon: '▦' }, { to: '/finance', label: 'مدیریت مالی', icon: '◈' }, { to: '/installments', label: 'اقساط', icon: '▣' }, { to: '/travel', label: 'سفر', icon: '✈' }, { to: '/settings', label: 'تنظیمات', icon: '⚙' }]
const mobileLinks = [{ to: '/dashboard', label: 'خانه', icon: '⌂' }, { to: '/planning', label: 'برنامه‌ها', icon: '✓' }, { to: '/finance', label: 'مالی', icon: '◈' }, { to: '/settings', label: 'تنظیمات', icon: '⚙' }]
const userName = computed(() => (user.value as { name?: string } | undefined)?.name || 'کاربر')
const initials = computed(() => userName.value.slice(0, 1))
const greeting = computed(() => { const hour = new Date().getHours(); return hour < 12 ? 'صبح بخیر' : hour < 17 ? 'ظهر بخیر' : 'عصر بخیر' })
async function logout() { await $fetch('/api/auth/logout', { method: 'POST' }); await clearSession(); await navigateTo('/login') }
</script>
