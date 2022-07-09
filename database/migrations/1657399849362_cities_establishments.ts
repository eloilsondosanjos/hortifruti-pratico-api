import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities_establishments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('cities_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cities')
        .onDelete('CASCADE')
      table
        .integer('establishments_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('establishments')
        .onDelete('CASCADE')
      table.decimal('delivery_cost', 8, 2).notNullable()
      table.primary(['cities_id', 'establishments_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
