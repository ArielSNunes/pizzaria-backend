import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class AddItemDTO {
	@ApiProperty({ description: 'Número da mesa' })
	@IsNotEmpty({ message: 'A mesa deve ser informada' })
	orderId: string

	@ApiProperty({ description: 'Produto a ser adicionado' })
	@IsNotEmpty({ message: 'O produto deve ser informado' })
	productId: string

	@ApiProperty({ description: 'Quantidade de itens' })
	@IsNotEmpty({ message: 'A quantidade deve ser informada' })
	@IsNumber(
		{
			allowNaN: false,
			allowInfinity: false,
		},
		{
			message: 'A quantidade deve ser informada',
		},
	)
	amount: number
}
