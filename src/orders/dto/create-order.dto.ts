import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateOrderDTO {
	@ApiProperty({ description: 'Número da mesa' })
	@IsNotEmpty({ message: 'A mesa deve ser informada' })
	@IsNumber(
		{
			allowNaN: false,
			allowInfinity: false,
		},
		{
			message: 'O número da mesa deve ser numérico',
		},
	)
	table: number

	@ApiProperty({ description: 'Responsável da mesa' })
	@IsNotEmpty({ message: 'O responsável da mesa deve ser informado' })
	name: string
}
