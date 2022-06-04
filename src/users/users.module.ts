import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'src/db/prisma.service'
import { AuthService } from 'src/auth/auth.service'

@Module({
	controllers: [UsersController],
	providers: [PrismaService, AuthService, UsersService],
})
export class UsersModule {}
