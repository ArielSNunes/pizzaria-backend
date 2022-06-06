import { Body, Controller, Get, Post } from '@nestjs/common'
import { Category } from '@prisma/client'
import { CategoriesService } from './categories.service'
import { CreateCategoryDTO } from './dto/create-category.dto'

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}

	@Post()
	async create(
		@Body() createCategoryDto: CreateCategoryDTO,
	): Promise<Partial<Category>> {
		return this.categoryService.create(createCategoryDto)
	}

	@Get()
	async list(): Promise<Partial<Category>[]> {
		return this.categoryService.findAll()
	}
}
