import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { AuthService } from 'src/auth/auth.service'
import { PrismaService } from 'src/db/prisma.service'
import { CreateUserDTO } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly authService: AuthService,
	) {}

	async create(createUserDto: CreateUserDTO): Promise<Partial<User> | false> {
		const userExists = await this.findByEmail(createUserDto.email)

		if (userExists) {
			return false
		}
		createUserDto.password = await this.authService.passwordHash(
			createUserDto.password,
		)

		const user = await this.prismaService.user.create({
			data: createUserDto,
			select: {
				id: true,
				name: true,
				email: true,
				password: true,
				createdAt: true,
			},
		})

		return user
	}
	async findByEmail(email: string): Promise<User> {
		return await this.prismaService.user.findFirst({
			where: { email },
		})
	}
	async findAll() {
		return `This action returns all users`
	}

	async findOne(id: string): Promise<Partial<User>> {
		return await this.prismaService.user.findFirst({
			where: { id },
			select: {
				name: true,
				email: true,
				createdAt: true,
			},
		})
	}

	async update(id: string) {
		return `This action updates a #${id} user`
	}

	async remove(id: string) {
		return `This action removes a #${id} user`
	}
}
