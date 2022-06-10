import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { PrismaService } from 'src/db/prisma.service'

@Module({
	controllers: [OrdersController],
	providers: [PrismaService, OrdersService],
})
export class OrdersModule {}
