import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { PrismaService } from 'src/db/prisma.service'
import { AuthDTO, AuthReturnDTO } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly prismaClient: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}
	async passwordHash(password: string): Promise<string> {
		return await hash(password, 8)
	}
	async passwordVerify(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		return compare(password, hashedPassword)
	}

	async auth({ email, password }: AuthDTO): Promise<AuthReturnDTO> {
		const user = await this.prismaClient.user.findFirst({
			where: { email },
			select: {
				name: true,
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

		const jwt = this.jwtService.sign(
			{ name: user.name, email: user.email },
			{
				subject: user.id,
				expiresIn: '1d',
				secret: this.configService.get('AUTH_SECRET'),
			},
		)

		return {
			token: jwt,
			email: user.email,
			name: user.name,
			id: user.id,
		}
	}

	async validateAuth(jwt: string): Promise<Partial<User>> {
		const { sub } = this.jwtService.verify<{ sub: string }>(jwt, {
			secret: this.configService.get('AUTH_SECRET'),
		})

		if (!sub) {
			throw new UnauthorizedException('Usuário não autorizado')
		}

		const user = await this.prismaClient.user.findFirst({
			where: { id: sub },
			select: { id: true },
		})

		if (!user) {
			throw new UnauthorizedException('Usuário não autorizado')
		}

		return user
	}
}
