import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateProductDTO {
	@ApiProperty({ name: 'Nome do produto' })
	@IsNotEmpty({ message: 'O nome deve ser informado' })
	name: string

	@ApiProperty({ name: 'Valor do produto' })
	@IsNotEmpty({ message: 'O valor deve ser informado' })
	price: number

	@ApiProperty({ name: 'Descricao do produto' })
	@IsNotEmpty({ message: 'A descrição deve ser informada' })
	description: string

	@ApiProperty({ name: 'Categoria do produto' })
	@IsNotEmpty({ message: 'A categoria deve ser informada' })
	categoryId: string
}

export class CreateDbProductDTO {
	@ApiProperty({ name: 'Nome do produto' })
	@IsNotEmpty({ message: 'O nome deve ser informado' })
	name: string

	@ApiProperty({ name: 'Valor do produto' })
	@IsNotEmpty({ message: 'O valor deve ser informado' })
	price: number

	@ApiProperty({ name: 'Descricao do produto' })
	@IsNotEmpty({ message: 'A descrição deve ser informada' })
	description: string

	@ApiProperty({ name: 'Banner do produto' })
	@IsNotEmpty({ message: 'O banner deve ser informado' })
	banner: string

	@ApiProperty({ name: 'Categoria do produto' })
	@IsNotEmpty({ message: 'A categoria deve ser informada' })
	categoryId: string
}
