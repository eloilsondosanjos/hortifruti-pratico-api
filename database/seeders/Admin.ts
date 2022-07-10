import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'
import User from 'App/Models/User'

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    const user = await User.create({
      email: 'adminteste@email.com',
      password: '12345678',
      type: 'admins',
    })

    await Admin.create({
      name: 'AdminTeste',
      userId: user.id,
    })
  }
}
