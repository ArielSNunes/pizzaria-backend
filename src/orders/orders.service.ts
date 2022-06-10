import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'
import { CreateOrderDTO } from './dto/create-order.dto'

@Injectable()
export class OrdersService {
	constructor(private readonly prismaService: PrismaService) {}
	async create(createOrderDto: CreateOrderDTO) {
		return await this.prismaService.order.create({
			data: createOrderDto,
			select: {
				id: true,
				name: true,
				table: true,
			},
		})
	}
}
