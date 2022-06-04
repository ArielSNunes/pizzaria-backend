import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/db/prisma.service'
import { AuthService } from 'src/auth/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configModule: ConfigService) => ({
				secret: configModule.get<string>('AUTH_SECRET'),
			}),
		}),
	],
	controllers: [UsersController],
	providers: [PrismaService, AuthService, UsersService],
})
export class UsersModule {}
