import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UnprocessableEntityException,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDTO } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(
		@Body() createUserDto: CreateUserDTO,
	): Promise<Partial<User> | boolean> {
		const createdUser = await this.usersService.create(createUserDto)
		if (!createdUser) {
			throw new UnprocessableEntityException('E-mail já cadastrado')
		}
		return createUserDto
	}

	@Get()
	async findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return this.usersService.findOne(id)
	}

	@Patch(':id')
	async update(@Param('id') id: string) {
		return this.usersService.update(id)
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.usersService.remove(id)
	}
}
