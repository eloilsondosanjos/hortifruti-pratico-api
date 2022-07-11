import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [rules.minLength(8), rules.maxLength(36), rules.confirmed()]),
    telefone: schema.string({ trim: true }, [
      rules.mobile({ locale: ['pt-BR'] }),
      rules.maxLength(15),
    ]),
  })

  public messages: CustomMessages = {
    'required': '{{ field }} é obrigatório para o cadastro',
    'email.email': '{{ field }} deve ser no formato válido',
    'email.unique': '{{ field }} já está em uso',
    'password.minLength': '{{ field }} deve ter no mínimo 8 caracteres',
    'password.maxLength': '{{ field }} deve ter no máximo 36 caracteres',
    'password.confirmed': '{{ field }} as senhas não conferem',
    'telefone.mobile': '{{ field }} deve ser no formato válido',
  }
}
