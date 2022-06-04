import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthDto {
	@IsNotEmpty({ message: 'O campo email deve ser informado' })
	@IsEmail({}, { message: 'E-mail com formato inválido' })
	email: string

	@IsNotEmpty({ message: 'O campo password deve ser informado' })
	password: string
}
