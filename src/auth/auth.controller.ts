import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }
	@Post()
	async auth(@Body() authDto: AuthDto) {
		const auth = await this.authService.auth(authDto)

		return { ok: 123 }
	}
}
