import Client from 'App/Models/Client'
import User from 'App/Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Establishment from 'App/Models/Establishment'
import Admin from 'App/Models/Admin'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.findByOrFail('email', email)

      let expira
      switch (user.type) {
        case 'clients':
          expira = '2days'
          break
        case 'establishments':
          expira = '1days'
          break
        case 'admins':
          expira = '2hours'
          break
        default:
          expira = '1days'
          break
      }

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: expira,
        name: user.serialize().username,
      })

      return response.created({ user: auth.user, token })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
    } catch {
      return response.unauthorized('You are not logged in')
    }

    return response.ok({
      revoked: true,
    })
  }

  public async me({ response, auth }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate()

    let data

    switch (userAuth.type) {
      case 'clients':
        const client = await Client.findByOrFail('userId', userAuth.id)
        data = {
          client_id: client.id,
          name: client.name,
          telefone: client.telefone,
          email: userAuth.email,
        }
        break
      case 'establishments':
        const establishment = await Establishment.findByOrFail('userId', userAuth.id)
        data = {
          establishment: establishment.id,
          name: establishment.name,
          logo: establishment.logo,
          online: establishment.online,
          blocked: establishment.blocked,
          email: userAuth.email,
        }
        break
      case 'admins':
        const admin = await Admin.findByOrFail('userId', userAuth.id)
        data = {
          admin_id: admin.id,
          name: admin.name,
          email: userAuth.email,
        }
        break
      default:
        return response.unauthorized('Unauthorized user, type not found')
    }

    return response.ok(data)
  }
}
