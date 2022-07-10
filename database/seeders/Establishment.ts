import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Establishment from 'App/Models/Establishment'
import User from 'App/Models/User'

export default class EstablishmentSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      username: 'EstabelecimentoTeste',
      email: 'estabelecimentoteste@email.com',
      password: '123456',
      type: 'establishments',
    })

    await Establishment.create({
      name: 'EstabelecimentoTeste',
      logo: 'https://ik.imagekit.io/2bd11h34bw/logo_class-_3YqLsSaQTz.svg?updatedAt=1634230360948',
      online: true,
      blocked: false,
      userId: user.id,
    })
  }
}
