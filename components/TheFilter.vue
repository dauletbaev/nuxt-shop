<script setup lang="ts">
const emits = defineEmits<{
  (e: 'apply', filter: Filter): void
}>()

const route = useRoute()

const search = ref('')
const brand = ref('')
const minPrice = ref(Infinity)
const maxPrice = ref(Infinity)

const isFilterApplied = ref(false)

const onApplyFilter = () => {
  // Emit the filter to the parent component where we can use it to filter the products
  emits('apply', {
    search: search.value.trim(),
    brand: brand.value.trim(),
    minPrice: minPrice.value,
    maxPrice: maxPrice.value
  })

  isFilterApplied.value = search.value.trim() !== '' ||
    brand.value.trim() !== '' ||
    Number.isFinite(minPrice.value) ||
    Number.isFinite(maxPrice.value)
}

const onResetFilter = () => {
  search.value = ''
  brand.value = ''
  minPrice.value = Infinity
  maxPrice.value = Infinity

  // Emit the filter to the parent component where we can use it to filter the products
  emits('apply', {
    search: '',
    brand: '',
    minPrice: Infinity,
    maxPrice: Infinity
  })

  isFilterApplied.value = false
}

// When the component is mounted we will parse the query params and set the values
onMounted(() => {
  const { query } = route

  if (query.q) {
    search.value = query.q as string
  }

  if (query.brand) {
    brand.value = query.brand as string
  }

  if (query.maxPrice) {
    maxPrice.value = parseFloat(query.maxPrice as string)
  }

  if (query.minPrice) {
    minPrice.value = parseFloat(query.minPrice as string)
  }
})
</script>

<template>
  <form class="filter__container" @submit.prevent="onApplyFilter">
    <div class="filter__container__item">
      <label for="search">Search:</label>
      <input id="search" type="text" placeholder="Car" v-model.trim="search" />
    </div>
    <div class="filter__container__item">
      <label for="brand">Brand:</label>
      <input id="brand" type="text" placeholder="Apple" v-model.trim="brand" />
    </div>
    <div class="filter__container__item">
      <label for="minPrice">Min Price:</label>
      <input id="minPrice" type="number" placeholder="100" step="0.01" v-model="minPrice" />
    </div>
    <div class="filter__container__item">
      <label for="maxPrice">Max Price:</label>
      <input id="maxPrice" type="number" placeholder="1000" v-model="maxPrice" />
    </div>

    <div class="filter__container__item">
      <button v-show="isFilterApplied" class="reset" @click="onResetFilter" type="button">Reset</button>
      <button type="submit">Apply</button>
    </div>
  </form>
</template>

<style scoped>
.filter__container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0.5rem;
}

.filter__container__item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.filter__container__item label {
  padding: 0.5rem 1rem;
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

.filter__container__item button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  width: 100%;
}

.filter__container__item button.reset {
  background-color: #ee6056;
  color: #fff;
}

.filter__container__item button:hover {
  background-color: #ccc;
}

.filter__container__item button.reset:hover {
  background-color: #ee6056;
  color: #fff;
}

@media (max-width: 768px) {
  .filter__container {
    margin: 0 auto;
  }
}
</style>
