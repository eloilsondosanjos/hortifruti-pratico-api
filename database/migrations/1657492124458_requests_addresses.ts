import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'requests_addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('city_id').unsigned().notNullable().references('id').inTable('cities')
      table.string('street').notNullable()
      table.string('number')
      table.string('district').notNullable()
      table.string('reference_point')
      table.string('complement')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
