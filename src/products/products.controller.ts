import {
	Body,
	Controller,
	Inject,
	InternalServerErrorException,
	Post,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import {
	ConfigOptions,
	UploadApiErrorResponse,
	UploadApiResponse,
	v2,
} from 'cloudinary'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { Multer } from 'multer'
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider'
import { CreateProductDTO } from './dto/create-product.dto'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
	constructor(
		private readonly productService: ProductsService,
		@Inject('CloudinaryProvider')
		private readonly cloudinaryProvider: CloudinaryProvider,
	) {}

	@Post()
	@UseInterceptors(FileInterceptor('banner'))
	async create(
		@Body() createProductDto: CreateProductDTO,
		@UploadedFile() file: Express.Multer.File,
	) {
		const uploadedFile = await this.cloudinaryProvider
			.getService()
			.uploadFile(file)
		const product = await this.productService.create({
			...createProductDto,
			banner: uploadedFile.secure_url,
		})
		return product
	}
}