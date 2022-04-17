<template>
  <div>
    <a-page-header
      class="demo-page-header"
      style="border: 1px solid rgb(235, 237, 240)"
      title="Facturación"
    >
      <template #extra>
        <a-button key="3" @click="() => { $router.push('/login') }">Login</a-button>
      </template>
    </a-page-header>
  </div>
</template>

<style scoped>
.demo-page-header :deep(tr:last-child td) {
  padding-bottom: 0;
}
</style>