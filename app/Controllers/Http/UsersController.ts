import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const { email, password, type } = request.only(['email', 'password', 'type'])

    const user = {
      email,
      password,
      type,
    }

    await User.create(user)

    return response.ok({ user })
  }
}
