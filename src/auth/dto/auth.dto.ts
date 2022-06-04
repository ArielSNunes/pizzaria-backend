import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthDTO {
	@IsNotEmpty({ message: 'O campo email deve ser informado' })
	@IsEmail({}, { message: 'E-mail com formato inválido' })
	@ApiProperty({
		description: 'E-mail para ser autenticado',
	})
	email: string

	@IsNotEmpty({ message: 'O campo password deve ser informado' })
	@ApiProperty({
		description: 'Senha para realizar a autenticação',
	})
	password: string
}

export class AuthReturnDTO {
	id: string
	name: string
	email: string
	token: string
}
