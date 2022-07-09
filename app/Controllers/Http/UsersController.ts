import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { username, email, password, type } = request.only([
      'username',
      'email',
      'password',
      'type',
    ])

    const user = {
      username,
      email,
      password,
      type,
    }

    await User.create(user)

    return response.ok({ user })
  }
}
