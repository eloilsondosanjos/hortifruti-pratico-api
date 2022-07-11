import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Request extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public hash_id: string

  @column()
  public client_id: number

  @column()
  public establishment_id: number

  @column()
  public payment_method_id: number

  @column()
  public request_address_id: number

  @column()
  public value: number

  @column()
  public thing_to: number | null

  @column()
  public delivery_cost: number

  @column()
  public observation: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
