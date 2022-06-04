import { Body, Controller, Post } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDTO } from './dto/create-category.dto'

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) { }

	@Post()
	async create(@Body() createCategoryDto: CreateCategoryDTO) {
		return this.categoryService.create(createCategoryDto)
	}
}
