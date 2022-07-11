import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'requests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('hash_id').unique().notNullable()
      table.integer('client_id').unsigned().notNullable().references('id').inTable('clients')
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
      table
        .integer('request_address_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('requests_addresses')
      table.decimal('value', 10, 2).notNullable()
      table.decimal('thing_to', 10, 2)
      table.decimal('delivery_cost', 10, 2).notNullable().defaultTo(0)
      table.string('observation')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
