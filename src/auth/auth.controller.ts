import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDTO, AuthReturnDTO } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Post()
	async auth(@Body() authDto: AuthDTO): Promise<AuthReturnDTO> {
		const auth = await this.authService.auth(authDto)

		return auth
	}
}
