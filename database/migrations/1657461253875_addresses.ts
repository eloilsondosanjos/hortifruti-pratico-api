import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned().notNullable().references('id').inTable('clients')
      table.integer('city_id').unsigned().notNullable().references('id').inTable('cities')
      table.string('street').notNullable()
      table.string('number')
      table.string('district').notNullable()
      table.string('reference_point')
      table.string('complement')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
