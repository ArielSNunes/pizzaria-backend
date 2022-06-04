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

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [],
	providers: [PrismaService, JwtService, AuthService],
})
export class AppModule implements NestModule {
	async configure(consumer: MiddlewareConsumer): Promise<void> {
		consumer.apply(AuthMiddleware).forRoutes({
			method: RequestMethod.GET,
			path: '/users/me',
		})
	}
}
