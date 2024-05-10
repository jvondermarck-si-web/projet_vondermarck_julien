import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('login').unique()
      table.string('email').unique()
      table.string('password')
      table.string('first_name')
      table.string('last_name')
      table.string('civility')
      table.string('country_code')
      table.string('phone_number')
      table.string('address')
      table.string('city')
      table.string('postal_code')
      table.string('country')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
