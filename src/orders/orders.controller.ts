import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
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

	@Delete('/:orderId')
	async clearOrder(@Param('orderId') orderId: string) {
		return await this.ordersService.deleteOrder(orderId)
	}
}
