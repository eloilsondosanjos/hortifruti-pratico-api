import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City'
import CityEstablishment from 'App/Models/CityEstablishment'
import Establishment from 'App/Models/Establishment'
import Request from 'App/Models/Request'

export default class EstablishmentsController {
  public async requests({ response, auth }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate()
    const establishment = await Establishment.findByOrFail('user_id', userAuth.id)

    const requests = await Request.query()
      .where('establishment_id', establishment.id)
      .preload('client')
      .preload('request_status', (statusQuery) => {
        statusQuery.preload('status')
      })
      .orderBy('request_id', 'desc')

    return response.ok(requests)
  }

  public async show({ response, params }: HttpContextContract) {
    const establishmentId: number = params.id

    let arrayCities: any = []
    const citiesEstablishment = await CityEstablishment.query().where(
      'establishment_id',
      establishmentId
    )

    for await (const city of citiesEstablishment) {
      const eachCity = await City.findByOrFail('id', city.city_id)
      arrayCities.push({
        id: eachCity.id,
        city: eachCity.name,
        delivery_cost: city.delivery_cost,
      })
    }

    const establishment = await Establishment.query()
      .where('id', establishmentId)
      .preload('categories', (categoriesQuery) => {
        categoriesQuery.preload('products')
      })
      .preload('payments_methods')
      .firstOrFail()

    return response.ok({
      id: establishment.id,
      name: establishment.name,
      logo: establishment.logo,
      blocked: establishment.blocked,
      online: establishment.online,
      cities: arrayCities,
      payments_methods: establishment.payments_methods,
      categories: establishment.categories,
    })
  }
}
