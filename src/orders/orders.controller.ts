import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AddItemDTO } from './dto/add-item.dto'
import { CreateOrderDTO } from './dto/create-order.dto'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get()
	@ApiBearerAuth('Authorization')
	async listOrders() {
		return await this.ordersService.listStartedOrders()
	}

	@Post()
	@ApiBearerAuth('Authorization')
	async create(@Body() createOrderDto: CreateOrderDTO) {
		return await this.ordersService.create(createOrderDto)
	}

	@Delete('/item/:itemId')
	@ApiBearerAuth('Authorization')
	async removeItem(@Param('itemId') orderItem: string) {
		return await this.ordersService.removeItemFromOrder(orderItem)
	}

	@Delete('/:orderId')
	@ApiBearerAuth('Authorization')
	async clearOrder(@Param('orderId') orderId: string) {
		return await this.ordersService.deleteOrder(orderId)
	}

	@Post('/item')
	@ApiBearerAuth('Authorization')
	async addItem(@Body() orderItem: AddItemDTO) {
		return this.ordersService.addItemToOrder(orderItem)
	}

	@Put('/start')
	@ApiBearerAuth('Authorization')
	async startOrderPrep(@Body('orderId') orderId: string) {
		return await this.ordersService.startOrder(orderId)
	}

	@Get('/:orderId/detail')
	@ApiBearerAuth('Authorization')
	async listOrderItems(@Param('orderId') orderId: string) {
		return await this.ordersService.listOrderItem(orderId)
	}
}
