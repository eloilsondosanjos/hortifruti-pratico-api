import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import City from './City'

export default class RequestAddress extends BaseModel {
  public static table = 'requests_addresses'

  @column({ isPrimary: true })
  public id: number

  @column()
  public city_id: number

  @column()
  public street: string

  @column()
  public number: string | null

  @column()
  public district: string

  @column()
  public reference_point: string | null

  @column()
  public complement: string | null

  @hasOne(() => City, {
    localKey: 'city_id',
    foreignKey: 'id',
  })
  public city: HasOne<typeof City>
}
