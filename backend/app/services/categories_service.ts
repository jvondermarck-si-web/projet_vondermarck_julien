import { inject } from '@adonisjs/core'
import Category from '../models/category.js'

@inject()
export class CategoriesService {
  async getAll() {
    try {
      return await Category.query().preload('products')
    } catch (error) {
      console.log(error)
    }
  }
}
