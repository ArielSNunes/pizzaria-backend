import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/db/prisma.service'
import { UsersService } from 'src/users/users.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [
		PrismaService,
		UsersService,
		JwtService,
		ConfigService,
		AuthService,
	],
})
export class AuthModule {}
