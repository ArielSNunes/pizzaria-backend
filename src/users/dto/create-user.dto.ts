import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
	@IsNotEmpty({ message: 'O campo name deve ser informado' })
	name: string

	@IsNotEmpty({ message: 'O campo email deve ser informado' })
	@IsEmail({}, { message: 'E-mail com formato inválido' })
	email: string

	@IsNotEmpty({ message: 'O campo password deve ser informado' })
	password: string
}
