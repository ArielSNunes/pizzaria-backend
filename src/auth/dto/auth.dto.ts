import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthDTO {
	@IsNotEmpty({ message: 'O campo email deve ser informado' })
	@IsEmail({}, { message: 'E-mail com formato inválido' })
	email: string

	@IsNotEmpty({ message: 'O campo password deve ser informado' })
	password: string
}

export class AuthReturnDTO {
	id: string
	name: string
	email: string
	token: string
}
