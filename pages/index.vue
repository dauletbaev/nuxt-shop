<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const LIMIT = runtimeConfig.public.defaultProductsCount
const route = useRoute()
const router = useRouter()
const page = ref(parseInt(route.query.page as string) || 1)
const skip = computed(() => page.value * LIMIT - LIMIT)
const q = ref(route.query.q as (string | undefined) || '')
const isSearching = computed(() => !!route.query.q)

const { data, pending, refresh, error } = await useFetch<AllProductsResponse>(
  () => `products${isSearching.value ? `/search?q=${route.query.q}&` : '?'}limit=${LIMIT}&skip=${isSearching.value ? 0 : skip.value}&select=title,thumbnail,description,price`,
  { baseURL: runtimeConfig.public.apiBase }
)

const totalPages = computed(() => Math.ceil((data.value?.total ?? 0) / LIMIT))

watch([page, q], () => {
  const query: { page?: number; q?: string } = {}

  if (typeof page.value === 'number') {
    query.page = page.value
  }

  if (q.value) {
    query.q = q.value
  }

  router.push({ query })
})

const pageChange = (pageIdentifier: number) => {
  page.value = pageIdentifier
  refresh({ dedupe: true })
}
</script>

<template>
  <Filter @search="q = $event" />
  <h2 v-if="error">An error occured</h2>
  <Loading v-else-if="pending" />
  <div v-else class="products__container">
    <Products :products="data?.products || []" />
    <Pagination :page="page" :pages="totalPages" @previous-page="pageChange(page - 1)" @next-page="pageChange(page + 1)"
      @page-change="pageChange" />
  </div>
</template>

<style scoped>
.products__container {
  max-width: 75%;
}
</style>
