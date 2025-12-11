<script setup lang="ts">
</script>

<template>
  <main class="grid grid-cols-4">
    <nav class="col-span-1">
      <Nav />
    </nav>
    <div class="col-span-2">
      <slot />
    </div>
    <div class="col-span-1">
      <Episodes />
    </div>
  </main>
</template>
