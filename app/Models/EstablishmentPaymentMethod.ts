import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EstablishmentPaymentMethod extends BaseModel {
  public static table = 'establishments_payments_methods'

  @column({ isPrimary: true })
  public establishment_id: number

  @column({ isPrimary: true })
  public payment_method_id: number
}
