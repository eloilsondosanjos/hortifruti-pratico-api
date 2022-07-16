import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Status from './Status'

export default class RequestStatus extends BaseModel {
  public static table = 'requests_statuses'

  @column({ isPrimary: true, serializeAs: null })
  public request_id: number

  @column({ isPrimary: true })
  public status_id: number

  @column()
  public observation: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Status, {
    localKey: 'status_id',
    foreignKey: 'id',
  })
  public status: HasOne<typeof Status>
}
