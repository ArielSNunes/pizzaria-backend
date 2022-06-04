import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { Category } from '@prisma/client'
import { PrismaService } from 'src/db/prisma.service'
import { CreateCategoryDTO } from './dto/create-category.dto'

@Injectable()
export class CategoriesService {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(
		createCategoryDto: CreateCategoryDTO,
	): Promise<Partial<Category>> {
		const existingCategory = await this.findByName(createCategoryDto.name)

		if (existingCategory) {
			throw new UnprocessableEntityException('Categoria já existente')
		}

		const category = await this.prismaService.category.create({
			data: createCategoryDto,
			select: {
				id: true,
				name: true,
			},
		})

		return category
	}
	public async findByName(name: string) {
		const category = await this.prismaService.category.findFirst({
			where: { name },
		})
		return category
	}
}
