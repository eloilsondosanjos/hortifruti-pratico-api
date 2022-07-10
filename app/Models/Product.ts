import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number

  @column()
  public name: string

  @column()
  public description: string | null

  @column()
  public image: string | null

  @column()
  public price: number

  @column()
  public unity: string

  @column()
  public position: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public deletedAt: DateTime | null
}
