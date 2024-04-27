// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import { ProductsService } from '../services/products_service.js'
import { inject } from '@adonisjs/core'

@inject()
export default class ProductsController {
  constructor(private productService: ProductsService) {}

  async getAll({ response }: HttpContext) {
    try {
      const products = await this.productService.getAll()
      return response.json(products)
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async getProductsSearch({ request, response }: HttpContext) {
    try {
      const search = request.input('search')
      const products = await this.productService.getProductsSearch(search)
      return response.json(products)
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' })
    }
  }
}
