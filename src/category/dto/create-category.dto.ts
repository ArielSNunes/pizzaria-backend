import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDTO {
	@ApiProperty({ description: 'Nome da categoria' })
	@IsNotEmpty({ message: 'O nome deve ser informado' })
	name: string
}
