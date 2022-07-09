import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('state_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('states')
        .onDelete('CASCADE')
      table.string('name', 36).notNullable()
      table.boolean('active').notNullable().defaultTo(true)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
