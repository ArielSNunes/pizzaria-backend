import { Injectable, NotAcceptableException } from '@nestjs/common'
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

	async findOrder(orderId: string) {
		return await this.prismaService.order.findFirst({
			where: { id: orderId },
		})
	}
	async deleteOrder(orderId: string) {
		const prevOrder = await this.findOrder(orderId)
		if (!prevOrder) {
			throw new NotAcceptableException('Pedido não encontrado')
		}
		return await this.prismaService.order.delete({
			where: { id: orderId },
		})
	}
}
