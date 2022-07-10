import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import User from 'App/Models/User'
import CreateClientValidator from 'App/Validators/CreateClientValidator'
import UpdateClientValidator from 'App/Validators/UpdateClientValidator'

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateClientValidator)

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      type: 'clientes',
    })

    const client = await Client.create({
      name: payload.name,
      telefone: payload.telefone,
      user_id: user.id,
    })

    return response.ok({
      id: client.id,
      name: client.name,
      email: user.email,
      telefone: client.telefone,
    })
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(UpdateClientValidator)
    const userAuth = await auth.use('api').authenticate()

    const updateTransaction = await Database.transaction()

    try {
      const user = await User.findByOrFail('id', userAuth.id)
      const client = await Client.findByOrFail('user_id', userAuth.id)

      if (payload.password) {
        user.merge({
          email: payload.email,
          password: payload.password,
        })
      } else {
        user.merge({
          email: payload.email,
        })
      }

      await user.save()

      client.merge({
        name: payload.name,
        telefone: payload.telefone,
      })

      await client.save()

      await updateTransaction.commit()

      return response.ok({
        id: client.id,
        name: client.name,
        email: user.email,
        telefone: client.telefone,
      })
    } catch (error) {
      await updateTransaction.rollback()
      return response.badRequest('Something in the request is wrong')
    }
  }
}
