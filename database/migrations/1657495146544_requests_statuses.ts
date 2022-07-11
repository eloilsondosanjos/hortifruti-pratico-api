import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'requests_statuses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('request_id').unsigned().notNullable().references('id').inTable('requests')
      table.integer('status_id').unsigned().notNullable().references('id').inTable('statuses')
      table.string('observation')
      table.primary(['request_id', 'status_id'])
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
