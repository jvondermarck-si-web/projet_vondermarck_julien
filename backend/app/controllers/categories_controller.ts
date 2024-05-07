// import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { CategoriesService } from '../services/categories_service.js'

@inject()
export default class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  async getAll({ response }: HttpContext) {
    try {
      const categories = await this.categoryService.getAll()
      console.log(categories)
      return response.json(categories)
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' })
    }
  }
}
