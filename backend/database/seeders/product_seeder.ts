import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '../../app/models/product.js'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Product.createMany([
      {
        id: 1,
        categoryId: 1,
        image: 'assets/img/products/caputo.png',
        title: "Caputo® - Farina TIP0 '00' Pizzeria",
        info: '1 kg - Il Mulino di Napoli',
        price: 12,
        isBestSeller: true,
        isFavorite: true,
      },
      {
        id: 2,
        categoryId: 1,
        image: 'assets/img/products/olive_oil.png',
        title: 'De Cecco Olio di Oliva',
        info: '1L - Extra Virgin',
        price: 22.95,
        isBestSeller: true,
        isFavorite: false,
      },
      {
        id: 3,
        categoryId: 3,
        image: 'assets/img/products/tshirt_girl.png',
        title: "T-Shirt 'Everybody Loves Italian Girls'",
        info: 'Sizes from S to XL',
        price: 19.99,
        isBestSeller: true,
        isFavorite: false,
      },
      {
        id: 4,
        categoryId: 1,
        image: 'assets/img/products/kimbo.png',
        title: 'Kimbo® Espresso Crema Intensa',
        info: '1kg - Caffè di Napoli',
        price: 4.99,
        isBestSeller: true,
        isFavorite: false,
      },
      {
        id: 5,
        categoryId: 1,
        image: 'assets/img/products/mascarpone.png',
        title: 'Galbani® Mascarpone',
        info: '250mg - Best for Tiramisù',
        price: 2.99,
        isBestSeller: false,
        isFavorite: false,
      },
      {
        id: 6,
        categoryId: 1,
        image: 'assets/img/products/bacio_latte.png',
        title: 'Baci® Latte Vellutato Scatola Bijou',
        info: '200g - quotes by famous poets inside!',
        price: 12.49,
        isBestSeller: false,
        isFavorite: false,
      },
      {
        id: 7,
        categoryId: 3,
        image: 'assets/img/products/scarf.png',
        title: 'Sciarpa rossa',
        info: '70% wool / 30% acrylic',
        price: 99.99,
        isBestSeller: false,
        isFavorite: false,
      },
    ])
  }
}
