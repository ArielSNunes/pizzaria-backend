import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UnprocessableEntityException,
	Req,
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Request } from 'express'
import { CreateUserDTO } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(
		@Body() createUserDto: CreateUserDTO,
	): Promise<Partial<User> | false> {
		const createdUser = await this.usersService.create(createUserDto)
		if (!createdUser) {
			throw new UnprocessableEntityException('E-mail já cadastrado')
		}
		return createdUser
	}

	@Get('me')
	@ApiBearerAuth('Authorization')
	async findOne(@Req() req: Request): Promise<Partial<User>> {
		return this.usersService.findOne(req.userId)
	}
}
