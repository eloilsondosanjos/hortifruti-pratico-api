import Client from 'App/Models/Client'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUpdateAddressValidator from 'App/Validators/CreateUpdateAddressValidator'
import Address from 'App/Models/Address'

export default class AddressesController {
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateAddressValidator)
    const userAuth = await auth.use('api').authenticate()
    const client = await Client.findByOrFail('user_id', userAuth.id)

    const address = await Address.create({
      city_id: payload.city_id,
      client_id: client.id,
      street: payload.street,
      number: payload.number,
      district: payload.district,
      reference_point: payload.reference_point,
      complement: payload.complement,
    })

    return response.ok(address)
  }

  public async index({ response, auth }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate()
    const client = await Client.findByOrFail('user_id', userAuth.id)

    const getClient = await Client.query()
      .where('id', client.id)
      .preload('addresses', (queryCity) => {
        queryCity.preload('city', (queryState) => {
          queryState.preload('state')
        })
      })
      .firstOrFail()

    response.ok(getClient.addresses)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(CreateUpdateAddressValidator)
    const address = await Address.findOrFail(params.id)

    address.merge(payload)
    await address.save()

    return response.ok(address)
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const addressExists = await Address.query().where('id', params.id).delete()

      if (addressExists.includes(1)) {
        return response.noContent()
      } else {
        return response.notFound()
      }
    } catch {
      return response.badRequest()
    }
  }
}
