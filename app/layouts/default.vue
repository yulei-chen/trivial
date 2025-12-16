<script setup lang="ts">

</script>

<template>
  <main class="text-lg font-mono py-15">
    <div class="mx-auto w-[300px]">
      <div class="flex gap-2 items-center">
        <NuxtLink to="/" class="text-green">
          屁大点事
        </NuxtLink>
        <DarkToggle />
      </div>

      <slot />
      <Episodes />
    </div>
  </main>
</template>
