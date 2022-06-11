import { Injectable, NotAcceptableException } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'
import { AddItemDTO } from './dto/add-item.dto'
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

	async addItemToOrder(orderItem: AddItemDTO) {
		const order = await this.findOrder(orderItem.orderId)
		if (!order) {
			throw new NotAcceptableException('Pedido não encontrado')
		}

		const product = await this.prismaService.product.findFirst({
			where: { id: orderItem.productId },
		})
		if (!product) {
			throw new NotAcceptableException('Produto não encontrado')
		}

		const orderItemExists = await this.prismaService.orderItem.findFirst({
			where: {
				orderId: orderItem.orderId,
				productId: orderItem.productId,
			},
		})

		if (orderItemExists) {
			return await this.prismaService.orderItem.update({
				where: {
					id: orderItemExists.id,
				},
				data: {
					amount: orderItemExists.amount + orderItem.amount,
				},
			})
		}

		return await this.prismaService.orderItem.create({
			data: orderItem,
		})
	}

	async removeItemFromOrder(orderItem: string) {
		const item = await this.prismaService.orderItem.findFirst({
			where: {
				id: orderItem,
			},
		})

		if (!item) {
			throw new NotAcceptableException('Item não identificado no pedido')
		}

		return await this.prismaService.orderItem.delete({
			where: {
				id: orderItem,
			},
		})
	}

	async startOrder(orderId: string) {
		const order = await this.findOrder(orderId)
		if (!order) {
			throw new NotAcceptableException('Pedido não encontrado')
		}
		return await this.prismaService.order.update({
			where: { id: orderId },
			data: { draft: false },
		})
	}

	async listStartedOrders() {
		return await this.prismaService.order.findMany({
			where: {
				draft: false,
				status: false,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})
	}

	async listOrderItem(orderId: string) {
		const order = await this.findOrder(orderId)
		if (!order) {
			throw new NotAcceptableException('Pedido não encontrado')
		}
		return await this.prismaService.orderItem.findMany({
			where: { orderId },
			include: {
				order: true,
				product: true,
			},
		})
	}
}
