import City from 'App/Models/City'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Establishment from 'App/Models/Establishment'
import User from 'App/Models/User'
import { faker } from '@faker-js/faker'
import State from 'App/Models/State'
import CityEstablishment from 'App/Models/CityEstablishment'

export default class EstablishmentSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: 'estabelecimentoteste@email.com',
      password: '12345678',
      type: 'estabelecimentos',
    })

    await Establishment.create({
      name: 'EstabelecimentoTeste',
      logo: 'https://ik.imagekit.io/2bd11h34bw/logo_class-_3YqLsSaQTz.svg?updatedAt=1634230360948',
      online: true,
      blocked: false,
      user_id: user.id,
    })

    for (let i = 2; i <= 20; i++) {
      await User.create({
        email: `estabelecimento${i}@email.com`,
        password: '12345678',
        type: 'estabelecimentos',
      })
    }

    for (let i = 2; i <= 20; i++) {
      await Establishment.create({
        name: `EstabelecimentoTeste ${i}`,
        logo: `https://picsum.photos/id/${i}/200/200`,
        online: true,
        blocked: false,
        user_id: i,
      })
    }

    await State.createMany([
      {
        name: 'Ceará',
        uf: 'CE',
      },
      {
        name: 'Piauí',
        uf: 'PI',
      },
    ])

    await City.createMany([
      {
        name: 'Russas',
        state_id: 1,
      },
      {
        name: 'Oeiras',
        state_id: 2,
      },
    ])

    for (let i = 2; i <= 20; i++) {
      await CityEstablishment.create({
        city_id: faker.datatype.number({ min: 1, max: 2 }),
        establishment_id: i,
        delivery_cost: faker.datatype.float({ min: 3.0, max: 5.0, precision: 0.01 }),
      })
    }
  }
}
