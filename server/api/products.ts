import products from '~/data.json'


export default defineEventHandler(() => {
  // This is a dummy implementation of the products API.

  return {
    limit: 4,
    products: products as unknown as Product[],
    skip: 0,
    total: products.length,
  }
})
