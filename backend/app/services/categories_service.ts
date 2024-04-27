import { inject } from '@adonisjs/core'
import { categoriesMock } from '../mocks/categories_mock.js'
import { Product, ProductsService } from './products_service.js'

export interface Category {
  id: number
  name: string
  image: string
  products: Product[]
}

@inject()
export class CategoriesService {
  constructor(private productsService: ProductsService) {}

  async getAll() {
    // Retrieve the categories from a mock json file
    const categories = categoriesMock as Category[]
    const products = await this.productsService.getAll()

    // Assign products to their respective categories
    categories.forEach((category) => {
      category.products = products.filter((product) => product.categoryID === category.id)
    })

    return categories
  }
}
