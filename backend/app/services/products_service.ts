import { inject } from '@adonisjs/core'
import Product from '../models/product.js'

@inject()
export class ProductsService {
  async getAll(): Promise<Product[]> {
    return await Product.all()
  }

  async getProductsSearch(search: string): Promise<Product[]> {
    const products = await Product.query().where('title', 'like', `%${search}%`)
    return products
  }
}
