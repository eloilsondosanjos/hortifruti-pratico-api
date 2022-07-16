import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import PaymentMethod from './PaymentMethod'

export default class Establishment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public name: string

  @column()
  public logo: string | null

  @column()
  public blocked: boolean

  @column()
  public online: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Category, {
    foreignKey: 'establishment_id',
    localKey: 'id',
  })
  public categories: HasMany<typeof Category>

  @manyToMany(() => PaymentMethod, {
    pivotTable: 'establishments_payments_methods',
    localKey: 'id',
    pivotForeignKey: 'establishment_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'payment_method_id',
  })
  public payments_methods: ManyToMany<typeof PaymentMethod>
}
