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

const visiblePages = ref<(number | string)[]>([props.page])

// We need to know if the screen is mobile to display the pagination differently
const isMobileScreen = window && window.matchMedia('(max-width: 768px)').matches

watchEffect(
  () => {
    if (props.pages <= 5) {
      visiblePages.value = Array.from({ length: props.pages }, (_, i) => i + 1)

      if (isMobileScreen) {
        visiblePages.value = [1, '...', props.pages]
      }
      return
    }

    if (props.page <= 3) {
      visiblePages.value = [1, 2, 3, '...', props.pages]
      
      if (isMobileScreen) {
        visiblePages.value = [1, 2, '...', props.pages]
      }
      return
    }

    if (props.page >= props.pages - 2) {
      visiblePages.value = [1, '...', props.pages - 2, props.pages - 1, props.pages]
      
      if (isMobileScreen) {
        visiblePages.value = [1, '...', props.pages]
      }
      return
    }

    if (isMobileScreen) {
      visiblePages.value = [1, '...', props.page, '...', props.pages]
      return
    }

    visiblePages.value = [1, ' ...', props.page - 1, props.page, props.page + 1, '... ', props.pages]
  }
)

const pageChange = (pageIdentifier: number | string) => {
  if (typeof pageIdentifier === 'string') {
    // We don't want to emit the event if the user clicks on the '...' button
    return
  }

  emits('pageChange', pageIdentifier)
}
</script>

<template>
  <div v-show="pages > 1" class="pagination">
    <div class="pagination__container">
      <div class="pagination__container__item">
        <button :disabled="page <= 1" @click="$emit('previousPage')">
          <Icon name="ic:baseline-keyboard-arrow-left" />
        </button>
      </div>
      <div v-for="p in visiblePages" :key="p" class="pagination__container__item">
        <button :class="{ active: p === page }" @click="pageChange(p)">{{ p }}</button>
      </div>
      <div class="pagination__container__item">
        <button :disabled="page >= pages" @click="$emit('nextPage')">
          <Icon name="ic:baseline-keyboard-arrow-right" />
        </button>
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

.pagination__container__item button:disabled {
  opacity: 0.6;
  color: rgb(92, 95, 102);
  cursor: not-allowed;
}

.pagination__container__item button.active {
  color: #fff;
  background-color: rgb(59, 73, 199);
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
    gap: 4px;
  }

  .pagination__container__item button {
    padding: 8px 10px;
    font-size: 0.8rem;
  }

  .pagination__container__item {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>
