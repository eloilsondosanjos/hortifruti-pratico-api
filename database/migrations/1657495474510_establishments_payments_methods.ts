import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'establishments_payments_methods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('establishment_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('establishments')
      table
        .integer('payment_method_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('payments_methods')
      table.primary(['establishment_id', 'payment_method_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
