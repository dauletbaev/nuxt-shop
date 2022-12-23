<script setup lang="ts">
defineEmits<{
  (e: 'search', search: string): void
}>()
</script>

<template>
  <form class="filter">
    <div class="filter__container">
      <div class="filter__container__item">
        <label for="filter__container__item__search">Search</label>
        <input id="filter__container__item__search" type="text"
          @input="(e) => $emit('search', (<HTMLInputElement>e.target).value)" />
      </div>
      <div class="filter__container__item">
        <label for="filter__container__item__sort">Sort</label>
        <select id="filter__container__item__sort">
          <option value="latest">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div class="filter__container__item">
        <label for="filter__container__item__category">Category</label>
        <select id="filter__container__item__category">
          <option value="">All</option>
          <option value="shirts">Shirts</option>
          <option value="pants">Pants</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>
      <div class="filter__container__item">
        <label for="filter__container__item__size">Size</label>
        <select id="filter__container__item__size">
          <option value="xl">XL</option>
          <option value="l">L</option>
          <option value="m">M</option>
          <option value="s">S</option>
        </select>
      </div>
    </div>
  </form>
</template>

<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 30%;
  max-width: 40%;
  margin: 0 auto;
}

.filter__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.filter__container__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.filter__container__item label {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.filter__container__item input {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.filter__container__item select {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}
</style>
