<template>
  <header>
    <div class="header__container">
      <div class="header__container__logo">
        <nuxt-link to="/">
          <h1>Nuxt Shop</h1>
        </nuxt-link>
      </div>
      <div class="header__container__nav">
        <nuxt-link to="/products" class="active">Products</nuxt-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.header__container__logo {
  width: 100%;
}

.header__container__logo a {
  text-align: left;
  color: #000;
  text-decoration: none;
}

.header__container__nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__container__nav a {
  margin: 0 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.header__container__nav a:hover {
  color: #f00;
}

.header__container__nav a.active {
  color: #da6666;
}

@media (max-width: 768px) {
  .header__container {
    flex-direction: column;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .header__container__logo a {
    text-align: center;
  }

  .header__container__nav {
    flex-direction: column;
  }

  .header__container__nav h1 {
    margin: 5px 0;
  }
}

@media (max-width: 320px) {
  .header__container__nav h1 {
    font-size: 1rem;
  }
}
</style>
