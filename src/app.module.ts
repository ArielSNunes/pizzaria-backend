import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { AuthMiddleware } from './middlewares/auth.middleware'
import { AuthService } from './auth/auth.service'
import { PrismaService } from './db/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { CategoryModule } from './category/categories.module'
import { ProductsModule } from './products/products.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { OrdersModule } from './orders/orders.module'
import { OrdersController } from './orders/orders.controller'
import { ProductsController } from './products/products.controller'
import { CategoriesController } from './category/categories.controller'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UsersModule,
		AuthModule,
		CategoryModule,
		ProductsModule,
		CloudinaryModule.forRoot(),
		OrdersModule,
	],
	controllers: [],
	providers: [PrismaService, JwtService, AuthService],
})
export class AppModule implements NestModule {
	async configure(consumer: MiddlewareConsumer): Promise<void> {
		consumer
			.apply(AuthMiddleware)
			.forRoutes(
				{ method: RequestMethod.GET, path: '/users/me' },
				CategoriesController,
				ProductsController,
				OrdersController,
			)
	}
}
