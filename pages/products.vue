<script setup lang="ts">
import type { LocationQueryValue } from 'vue-router'

definePageMeta({
  title: 'Products',
  description: 'All products',
})

const runtimeConfig = useRuntimeConfig()
const LIMIT = runtimeConfig.public.defaultProductsCount
const route = useRoute()
const router = useRouter()
const page = ref(parseInt(route.query.page as string) || 1)
const skip = computed(() => page.value * LIMIT - LIMIT)

// Getting dummy products from the API (we will fetch them only when the user visits the page once)
const { data, error, pending } = await useLazyFetch<AllProductsResponse>(() => '/api/products', {
  key: 'products',
})
// Because its DUMMY DATA, we need to use separate ref for products and total products count
const products = ref<Product[]>([])
const total = ref(0)

// We need to know how many pages we have to display pagination
const totalPages = computed(() => data.value ? Math.ceil(total.value / LIMIT) : 0)

const pageChange = (pageIdentifier: number) => {
  page.value = pageIdentifier
}

// When the page changes, we need to update the search params
watchEffect(() => {
  const query = { ...route.query }
  query.page = page.value as unknown as LocationQueryValue

  router.push({ query })
})

// When the page changes, we need to update the products because of the DUMMY DATA
watch([data, page], () => {
  // if (!newData) {
  //   return
  // }

  products.value = products.value
  total.value = products.value.length
})

// When the user filters the products, we need to update the search params and the products
const onFilter = (filter: Filter) => {
  if (!data.value) {
    return
  }

  const { brand, search, maxPrice, minPrice } = filter
  // Clone the query object
  const query = { ...route.query }

  if (search) {
    query.q = search
  } else {
    delete query.q
  }

  if (brand) {
    query.brand = brand
  } else {
    delete query.brand
  }

  if (maxPrice && Number.isFinite(maxPrice)) {
    query.maxPrice = maxPrice.toFixed(2)
  } else {
    delete query.maxPrice
  }

  if (Number.isFinite(minPrice) && minPrice > 0) {
    query.minPrice = minPrice.toFixed(2)
  } else {
    delete query.minPrice
  }

  // Filter the products usually this kind of filtering would be done on the server side
  const newFilteredProducts = data.value.products.filter((p) => {
    const filters = [search, brand, Number.isFinite(maxPrice), Number.isFinite(minPrice) && minPrice > 0]

    // If there are no filters, we don't need to filter the products
    if (filters.every((f) => !f)) {
      return true
    }

    const searchFilter = filters[0] ? p.name.toLowerCase().includes(search.toLowerCase()) : true
    const brandFilter = filters[1] ? p.brand.toLowerCase().includes(brand.toLowerCase()) : true
    const maxPriceFilter = filters[2] ? p.price <= maxPrice : true
    const minPriceFilter = filters[3] ? p.price >= minPrice : true

    return searchFilter && brandFilter && maxPriceFilter && minPriceFilter
  })

  products.value = newFilteredProducts
  total.value = newFilteredProducts.length
  page.value = 1

  router.push({ query })
}

onMounted(() => {
  const { q, brand, maxPrice, minPrice } = route.query

  // If we have data, we need to update the products
  if (data.value) {
    products.value = data.value.products
    total.value = data.value.products.length
  }

  // If search params are present, we need to filter the products
  if (q || brand || maxPrice || minPrice) {
    onFilter({
      search: q as string,
      brand: brand as string,
      maxPrice: parseFloat(maxPrice as string),
      minPrice: parseFloat(minPrice as string)
    })
  }
})
</script>

<template>
  <div class="products__page">
    <div class="products__container">
      <div v-if="error" class="fallback__product">
        <h2>An error occured while fetching dummy products</h2>
      </div>
      <div v-else-if="pending" class="fallback__product">
        <the-loading />
      </div>
      <the-products v-else-if="products.length > 0" :products="products.slice(skip, skip + LIMIT)" />
      <div v-else class="fallback__product">
        <h2>No products found</h2>
      </div>

      <client-only fallback-tag="span" fallback="Loading...">
        <the-pagination :page="page" :pages="totalPages" @previous-page="pageChange(page - 1)"
          @next-page="pageChange(page + 1)" @page-change="pageChange" />
      </client-only>
    </div>

    <the-filter @apply="onFilter" />
  </div>
</template>

<style scoped>
.products__page {
  display: flex;
  justify-content: space-around;
  margin-block: 2rem;
}

.products__container {
  flex: 1;
  max-width: 75%;
}

.fallback__product {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

@media (max-width: 768px) {
  .products__page {
    flex-direction: column-reverse;
  }

  .products__container {
    max-width: 100%;
  }
}
</style>
