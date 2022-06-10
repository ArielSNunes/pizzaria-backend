import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { Category } from '@prisma/client'
import { CategoriesService } from './categories.service'
import { CreateCategoryDTO } from './dto/create-category.dto'

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}

	@Post()
	@ApiBearerAuth('Authorization')
	async create(
		@Body() createCategoryDto: CreateCategoryDTO,
	): Promise<Partial<Category>> {
		return this.categoryService.create(createCategoryDto)
	}

	@Get()
	@ApiBearerAuth('Authorization')
	async list(): Promise<Partial<Category>[]> {
		return this.categoryService.findAll()
	}
}
