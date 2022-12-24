<script setup lang="ts">
defineProps<{
  products: Product[];
}>();
</script>

<template>
  <div class="products">
    <div class="products__grid">
      <product-card v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<style scoped>
.products {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
}

.products__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 1rem;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .products__grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>
