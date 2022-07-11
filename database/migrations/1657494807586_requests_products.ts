import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'requests_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('request_id').unsigned().notNullable().references('id').inTable('requests')
      table.integer('product_id').unsigned().notNullable().references('id').inTable('products')
      table.decimal('value', 10, 2).notNullable()
      table.decimal('amount', 10, 3).notNullable()
      table.string('observation')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
