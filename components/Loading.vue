<template>
  <div class="loading">
    <div class="loading__container">
      <div class="loading__container__item">
        <div class="loading__container__item__spinner"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading__container__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading__container__item__spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
