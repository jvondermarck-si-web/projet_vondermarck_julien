import { inject } from '@adonisjs/core'
import { categoriesMock } from '../mocks/categories_mock.js'
import { productsMock } from '../mocks/products_mock.js'

export interface Category {
  id: number
  name: string
  image: string
  products: Product[]
}

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
export class CategoriesService {
  async getAll() {
    // Retrieve the categories from a mock json file
    const categories = categoriesMock as Category[]
    const products = productsMock as Product[]

    // Assign products to their respective categories
    categories.forEach((category) => {
      category.products = products.filter((product) => product.categoryID === category.id)
    })

    return categories
  }
}
