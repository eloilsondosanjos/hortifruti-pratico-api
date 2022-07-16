import CityEstablishment from 'App/Models/CityEstablishment'
import Address from 'App/Models/Address'
import Client from 'App/Models/Client'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateRequestValidator from 'App/Validators/CreateRequestValidator'
import randomstring from 'randomstring'
import Request from 'App/Models/Request'
import Database from '@ioc:Adonis/Lucid/Database'
import RequestAddress from 'App/Models/RequestAddress'
import Product from 'App/Models/Product'
import RequestProduct from 'App/Models/RequestProduct'
import RequestStatus from 'App/Models/RequestStatus'

export default class RequestsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateRequestValidator)

    const userAuth = await auth.use('api').authenticate()
    const client = await Client.findByOrFail('user_id', userAuth.id)

    let hashOk: boolean = false
    let hashId: string = ''
    while (!hashOk) {
      hashId = randomstring.generate({
        length: 6,
        charset: 'alphanumeric',
        capitalization: 'uppercase',
      })

      const hash = await Request.findBy('hash_id', hashId)

      if (!hash) {
        hashOk = true
      }
    }

    const createRequestTrasanction = await Database.transaction()

    const address = await Address.findByOrFail('id', payload.address_id)

    try {
      const addressPayload = await RequestAddress.create({
        city_id: address.city_id,
        street: address.street,
        number: address.number,
        district: address.district,
        reference_point: address.reference_point,
        complement: address.complement,
      })

      const establishmentCity = await CityEstablishment.query()
        .where('establishment_id', payload.establishment_id)
        .where('city_id', address.city_id)
        .first()

      let valueTotal = 0
      for await (const product of payload.products) {
        const prod = await Product.findByOrFail('id', product.product_id)
        valueTotal += product.amount * prod.price
      }

      valueTotal = establishmentCity ? valueTotal + establishmentCity.delivery_cost : valueTotal

      valueTotal = parseFloat(valueTotal.toFixed(2))

      if (payload.thing_to !== null && payload.thing_to < valueTotal) {
        createRequestTrasanction.rollback()
        return response.badRequest(
          'O valor do troco não pode ser menor que o valor total do pedido.'
        )
      }

      const request = await Request.create({
        hash_id: hashId,
        client_id: client.id,
        establishment_id: payload.establishment_id,
        payment_method_id: payload.payment_method_id,
        request_address_id: addressPayload.id,
        value: valueTotal,
        thing_to: payload.thing_to,
        delivery_cost: establishmentCity ? establishmentCity.delivery_cost : 0,
        observation: payload.observation,
      })

      payload.products.forEach(async (product) => {
        let getProduct = await Product.findByOrFail('id', product.product_id)

        await RequestProduct.create({
          request_id: request.id,
          product_id: product.product_id,
          value: getProduct.price,
          amount: product.amount,
          observation: product.observation,
        })
      })

      await RequestStatus.create({
        request_id: request.id,
        status_id: 1,
      })

      await createRequestTrasanction.commit()

      return response.ok(request)
    } catch (error) {
      await createRequestTrasanction.rollback()
      return response.badRequest('Something in the request is wrong')
    }
  }

  public async index({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use('api').authenticate()
    const client = await Client.findByOrFail('user_id', userAuth.id)

    const requests = await Request.query()
      .where('client_id', client.id)
      .preload('establishment')
      .preload('request_status', (statusQuery) => {
        statusQuery.preload('status')
      })
      .orderBy('id', 'desc')

    return response.ok(requests)
  }

  public async show({ params, response }: HttpContextContract) {
    const requestId = params.hash_id

    const request = await Request.query()
      .where('hash_id', requestId)
      .preload('products', (productQuery) => {
        productQuery.preload('product')
      })
      .preload('client')
      .preload('address')
      .preload('establishment')
      .preload('payment_method')
      .preload('request_status', (statusQuery) => {
        statusQuery.preload('status')
      })
      .first()

    if (!request) {
      return response.notFound('Pedido não encontrado')
    }

    return response.ok(request)
  }
}
