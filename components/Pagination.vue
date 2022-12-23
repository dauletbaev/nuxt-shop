<script setup lang="ts">
const props = defineProps<{
  page: number
  pages: number
}>()

const emits = defineEmits<{
  (e: 'previousPage'): void
  (e: 'nextPage'): void
  (e: 'pageChange', page: number): void
}>()

const visiblePages = [props.page] as (number | string)[]

if (props.page !== 1) {
  visiblePages.unshift(1)
}

if (props.page !== props.pages) {
  visiblePages.push(props.pages)
}

if (props.page - 1 > 1) {
  visiblePages.splice(1, 0, '... ', props.page - 1)
}

if (props.page + 1 < props.pages) {
  visiblePages.splice(visiblePages.length - 1, 0, props.page + 1, ' ...')
}

const pageChange = (pageIdentifier: number | string) => {
  if (typeof pageIdentifier === 'string') {
    return
  }

  emits('pageChange', pageIdentifier)
}
</script>

<template>
  <div class="pagination">
    <div class="pagination__container">
      <div v-show="page > 1" class="pagination__container__item">
        <button @click="$emit('previousPage')">&lt;</button>
      </div>
      <div v-for="p in visiblePages" :key="p" class="pagination__container__item">
        <button @click="pageChange(p)">{{ p }}</button>
      </div>
      <div v-show="page < pages" class="pagination__container__item">
        <button @click="$emit('nextPage')">&gt;</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 30%;
  max-width: 40%;
  margin: 0 auto;
}

.pagination__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.pagination__container__item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.pagination__container__item button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.pagination__container__item button:hover {
  cursor: pointer;
  background-color: #ccc;
  color: #fff;
}

.pagination__container__item span {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.pagination__container__item span:hover {
  cursor: pointer;
  background-color: #ccc;
  color: #fff;
}

@media (max-width: 768px) {
  .pagination__container {
    flex-direction: column;
  }

  .pagination__container__item {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
