import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '../../app/models/category.js'
import Product from '../../app/models/product.js'

export default class extends BaseSeeder {
  async run() {
    // first delete all products in the table
    await Product.query().delete()
    await Category.query().delete()

    // Write your database queries inside the run method
    await Category.createMany([
      { id: 1, name: 'Food', image: 'assets/img/categories/category_food.png' },
      { id: 2, name: 'Cooking', image: 'assets/img/categories/category_kitchen.png' },
      { id: 3, name: 'Fashion', image: 'assets/img/categories/category_fashion.png' },
      { id: 4, name: 'Culture', image: 'assets/img/categories/category_culture.png' },
    ])
  }
}
