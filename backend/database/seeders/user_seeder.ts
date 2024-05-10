import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'

export default class extends BaseSeeder {
  async run() {
    // first delete all records in the table
    await User.query().delete()
    // Write your database queries inside the run method
    await User.createMany([
      {
        login: 'livalie',
        email: 'livalie@italy.it',
        password: 'livalie',
        firstName: 'Livia',
        lastName: 'Lie',
        civility: 'Ms',
        countryCode: 'IT',
        phoneNumber: '1234567890',
        address: 'Via Roma 123',
        city: 'Roma',
        postalCode: '00100',
        country: 'Italy',
      },
    ])
  }
}
