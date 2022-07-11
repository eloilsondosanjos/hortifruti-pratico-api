import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class RequestProduct extends BaseModel {
  public static table = 'requests_products'

  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public request_id: number

  @column()
  public product_id: number

  @column()
  public value: number

  @column()
  public amount: number

  @column()
  public observation: string | null

  @hasOne(() => Product, {
    localKey: 'product_id',
    foreignKey: 'id',
  })
  public product: HasOne<typeof Product>
}
