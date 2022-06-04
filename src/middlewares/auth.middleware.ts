import {
	Injectable,
	InternalServerErrorException,
	NestMiddleware,
	UnauthorizedException,
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly authService: AuthService) {}
	async use(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization

		if (!token) {
			throw new UnauthorizedException(
				'Token de autenticação não identificado',
			)
		}

		const [, authToken] = token.split(' ')

		try {
			const user = await this.authService.validateAuth(authToken)

			if (!user) {
				throw new UnauthorizedException('Usuário não autorizado')
			}

			req.userId = user.id

			return next()
		} catch (error) {
			throw new InternalServerErrorException('Erro no decode do token')
		}
	}
}
