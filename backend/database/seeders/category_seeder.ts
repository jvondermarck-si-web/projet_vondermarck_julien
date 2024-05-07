import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '../../app/models/category.js'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Category.createMany([
      { id: 1, name: 'Food', image: 'assets/img/categories/category_food.png' },
      { id: 2, name: 'Cooking', image: 'assets/img/categories/category_kitchen.png' },
      { id: 3, name: 'Fashion', image: 'assets/img/categories/category_fashion.png' },
      { id: 4, name: 'Culture', image: 'assets/img/categories/category_culture.png' },
    ])
  }
}
