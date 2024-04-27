import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare login: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare civility: string

  @column()
  declare countryCode: string

  @column()
  declare phoneNumber: string

  @column()
  declare address: string

  @column()
  declare city: string

  @column()
  declare postalCode: string

  @column()
  declare country: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
