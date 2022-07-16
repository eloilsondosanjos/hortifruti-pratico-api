import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('description')
      table.integer('position').notNullable()
      table.boolean('active').notNullable().defaultTo(true)
      table
        .integer('establishment_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('establishments')
        .onDelete('RESTRICT')
      table.timestamp('deleted_at')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
