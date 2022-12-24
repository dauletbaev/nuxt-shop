<script setup lang="ts">
defineProps<{
  product: Product;
}>();
</script>

<template>
  <div class="product__card">
    <div class="product__card__image">
      <img class="loading" :src="product.image" :alt="product.name" />
    </div>
    <div class="product__card__info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.brand }}</p>
      <p class="product__card__price">{{ product.price }}</p>
    </div>
  </div>
</template>

<style scoped>
.product__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  transition: all 0.3s ease-in-out;
}

.product__card:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.product__card__image {
  width: 100%;
  height: 100%;
  max-height: 200px;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.product__card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product__card__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.product__card__price {
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 1rem;
}

.product__card__price::before {
  content: "$";
}

.loading {
  /* Nice way of handling html's bult-in img element's loading state */
  background: transparent url(~/assets/loading.gif) no-repeat scroll center center;
  min-height: 178px;
}
</style>
