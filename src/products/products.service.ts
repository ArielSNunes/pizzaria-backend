import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { Product } from '@prisma/client'
import { PrismaService } from 'src/db/prisma.service'
import { CreateDbProductDTO } from './dto/create-product.dto'

@Injectable()
export class ProductsService {
	constructor(private readonly prismaService: PrismaService) {}

	async updateBanner(id: string, banner: string) {
		return await this.prismaService.product.update({
			where: { id },
			data: { banner },
			select: {
				id: true,
				name: true,
				category: true,
				categoryId: true,
				price: true,
				description: true,
				banner: true,
			},
		})
	}
	async create(createProductDto: CreateDbProductDTO) {
		const previousProduct = await this.findByName(createProductDto.name)

		if (previousProduct) {
			throw new UnprocessableEntityException('Produto já cadastrado')
		}

		const product = await this.prismaService.product.create({
			data: createProductDto,
			select: {
				id: true,
				name: true,
				category: true,
				categoryId: true,
				price: true,
				description: true,
				banner: true,
			},
		})

		return product
	}

	async findByName(name: string): Promise<Partial<Product>> {
		return await this.prismaService.product.findFirst({
			where: { name },
			select: {
				id: true,
				name: true,
			},
		})
	}

	async findByCategory(categoryId: string) {
		return await this.prismaService.product.findMany({
			where: { categoryId },
			select: {
				id: true,
				banner: true,
				category: {
					select: {
						name: true,
					},
				},
				description: true,
				name: true,
				price: true,
			},
		})
	}
}
