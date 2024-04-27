import { inject } from '@adonisjs/core'
import { productsMock } from '../mocks/products_mock.js'

export interface Product {
  id: number
  categoryID: number
  image: string
  title: string
  info: string
  price: number
  isBestSeller: boolean
  isFavorite: boolean
}

@inject()
export class ProductsService {
  async getAll(): Promise<Product[]> {
    // Retrieve the products from a mock json file
    const products = productsMock as Product[]

    return products
  }

  async getProductsSearch(search: string): Promise<Product[]> {
    // Retrieve the products from a mock json file
    const products = productsMock as Product[]

    return products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
  }
}
