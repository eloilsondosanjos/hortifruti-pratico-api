import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import User from 'App/Models/User'

export default class ClientSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: 'clientetest@email.com',
      password: '12345678',
      type: 'clientes',
    })

    await Client.create({
      name: 'ClienteTeste',
      telefone: '88 99293-1299',
      userId: user.id,
    })
  }
}
