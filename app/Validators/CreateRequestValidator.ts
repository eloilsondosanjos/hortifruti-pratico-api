import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    establishment_id: schema.number([rules.exists({ table: 'establishments', column: 'id' })]),
    payment_method_id: schema.number([rules.exists({ table: 'payments_methods', column: 'id' })]),
    thing_to: schema.number.nullableAndOptional(),
    observation: schema.string.nullableAndOptional({ trim: true }),
    products: schema.array([rules.minLength(1)]).members(
      schema.object().members({
        product_id: schema.number([rules.exists({ table: 'products', column: 'id' })]),
        amount: schema.number(),
        observation: schema.string.nullableAndOptional({ trim: true }),
      })
    ),
    address_id: schema.number([rules.exists({ table: 'addresses', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
