import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare categoryId: number

  @column()
  declare image: string

  @column()
  declare title: string

  @column()
  declare info: string

  @column()
  declare price: number

  @column()
  declare isBestSeller: boolean

  @column()
  declare isFavorite: boolean

  @belongsTo(() => Category, {
    foreignKey: 'categoryId',
  })
  declare category: BelongsTo<typeof Category>
}
