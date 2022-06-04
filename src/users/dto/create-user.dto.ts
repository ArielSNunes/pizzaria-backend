import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDTO {
	@IsNotEmpty({ message: 'O campo name deve ser informado' })
	@ApiProperty({
		description: 'Nome do usuário sendo criado',
	})
	name: string

	@IsNotEmpty({ message: 'O campo email deve ser informado' })
	@IsEmail({}, { message: 'E-mail com formato inválido' })
	@ApiProperty({
		description: 'E-mail do usuário sendo criado',
	})
	email: string

	@IsNotEmpty({ message: 'O campo password deve ser informado' })
	@ApiProperty({
		description: 'Senha do usuário sendo criado',
	})
	password: string
}
