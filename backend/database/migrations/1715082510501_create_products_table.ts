import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.string('image').notNullable()
      table.string('title').notNullable()
      table.string('info').notNullable()
      table.decimal('price').notNullable()
      table.boolean('is_best_seller').defaultTo(false)
      table.boolean('is_favorite').defaultTo(false)
      table.timestamps(true)
    })
  }

  async down() {
    // delete foreign key constraints and table
    this.schema.dropTable(this.tableName)
  }
}
