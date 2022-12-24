interface Product {
  id: number
  artNumber: number
  name: string
  brand: string
  weight: number
  image: string
  price: number
  quantity: number
  stock: number
}

interface AllProductsResponse {
  limit: number
  skip: number
  total: number
  products: Product[]
}

interface Filter {
  search: string
  brand: string
  minPrice: number
  maxPrice: number
}
