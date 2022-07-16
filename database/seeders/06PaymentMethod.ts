import Establishment from 'App/Models/Establishment'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PaymentMethod from 'App/Models/PaymentMethod'
import EstablishmentPaymentMethod from 'App/Models/EstablishmentPaymentMethod'

export default class PaymentMethodSeeder extends BaseSeeder {
  public async run() {
    await PaymentMethod.createMany([
      {
        name: 'Dinheiro',
      },
      {
        name: 'Cartão Crédito/Débito',
      },
      {
        name: 'PIX',
      },
      {
        name: 'Picpay',
      },
    ])

    const establishments = await Establishment.all()
    for (const establishment of establishments) {
      await EstablishmentPaymentMethod.createMany([
        {
          establishment_id: establishment.id,
          payment_method_id: 1,
        },
        {
          establishment_id: establishment.id,
          payment_method_id: 2,
        },
        {
          establishment_id: establishment.id,
          payment_method_id: 3,
        },
        {
          establishment_id: establishment.id,
          payment_method_id: 4,
        },
      ])
    }
  }
}
