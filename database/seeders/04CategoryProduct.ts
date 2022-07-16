import { faker } from '@faker-js/faker'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class CategoryProductSeeder extends BaseSeeder {
  public async run() {
    for (let iEst = 1; iEst <= 20; iEst++) {
      let category = await Category.create({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        position: 1,
        establishment_id: iEst,
      })

      await Product.createMany([
        {
          name: faker.commerce.productName(),
          image: faker.image.food(300, 300),
          description: faker.lorem.sentence(),
          price: faker.datatype.float({ min: 10.0, max: 35.0, precision: 0.01 }),
          category_id: category.id,
          position: 1,
          unity: 'KG',
        },
      ])
    }
  }
}
