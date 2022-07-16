import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import RequestStatus from './RequestStatus'
import Establishment from './Establishment'
import RequestProduct from './RequestProduct'
import RequestAddress from './RequestAddress'
import PaymentMethod from './PaymentMethod'

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

  @hasOne(() => Client, {
    foreignKey: 'id',
    localKey: 'client_id',
  })
  public client: HasOne<typeof Client>

  @hasMany(() => RequestStatus, {
    foreignKey: 'request_id',
    localKey: 'id',
  })
  public request_status: HasMany<typeof RequestStatus>

  @hasOne(() => Establishment, {
    foreignKey: 'id',
    localKey: 'establishment_id',
  })
  public establishment: HasOne<typeof Establishment>

  @hasMany(() => RequestProduct, {
    foreignKey: 'request_id',
    localKey: 'id',
  })
  public products: HasMany<typeof RequestProduct>

  @hasOne(() => RequestAddress, {
    foreignKey: 'id',
    localKey: 'request_address_id',
  })
  public address: HasOne<typeof RequestAddress>

  @hasOne(() => PaymentMethod, {
    foreignKey: 'id',
    localKey: 'payment_method_id',
  })
  public payment_method: HasOne<typeof PaymentMethod>
}
