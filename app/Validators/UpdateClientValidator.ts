import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    user_id: this.ctx.auth.user!.id,
  })

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(3), rules.maxLength(255)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.refs.user_id } }),
    ]),
    password: schema.string.nullableAndOptional({}, [
      rules.minLength(8),
      rules.maxLength(36),
      rules.confirmed(),
    ]),
    telefone: schema.string({ trim: true }, [
      rules.mobile({ locale: ['pt-BR'] }),
      rules.maxLength(15),
    ]),
  })

  public messages: CustomMessages = {
    'required': '{{ field }} é obrigatório para a edição',
    'email.email': '{{ field }} deve ser no formato válido',
    'email.unique': '{{ field }} já está em uso por outro usuário',
    'password.minLength': '{{ field }} deve ter no mínimo 8 caracteres',
    'password.maxLength': '{{ field }} deve ter no máximo 36 caracteres',
    'password.confirmed': '{{ field }} as senhas não conferem',
    'telefone.mobile': '{{ field }} deve ser no formato válido',
  }
}
