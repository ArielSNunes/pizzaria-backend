import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoryDTO {
	@ApiProperty({
		description: 'Nome da categoria',
	})
	name: string
}
