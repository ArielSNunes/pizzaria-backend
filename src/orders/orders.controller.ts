import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AddItemDTO } from './dto/add-item.dto'
import { CreateOrderDTO } from './dto/create-order.dto'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

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
}
