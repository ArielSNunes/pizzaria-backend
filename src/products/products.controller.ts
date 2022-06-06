import { Body, Controller, Post } from '@nestjs/common'
import { CreateProductDTO } from './dto/create-product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
	constructor(private readonly productService: ProductsService) {}

	@Post()
	async create(@Body() createProductDto: CreateProductDTO) {
		return await this.productService.create(createProductDto)
	}
}
