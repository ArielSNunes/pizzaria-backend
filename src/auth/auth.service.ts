import { Injectable, NotFoundException } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'
import { PrismaService } from 'src/db/prisma.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(private readonly prismaClient: PrismaService) { }
	async passwordHash(password: string): Promise<string> {
		return await hash(password, 8)
	}
	async passwordVerify(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return compare(password, hashedPassword)
	}
	async auth({ email, password }: AuthDto) {
		const user = await this.prismaClient.user.findFirst({
			where: { email },
			select: {
				email: true,
				password: true,
				id: true,
			},
		})

		if (!user) {
			throw new NotFoundException('Usuário ou senha incorretos')
		}

		const validPassword = await this.passwordVerify(password, user.password)

		if (!validPassword) {
			throw new NotFoundException('Usuário ou senha incorretos')
		}

		return true
	}
}
