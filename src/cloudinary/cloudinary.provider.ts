import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v2 } from 'cloudinary'
import { CloudinaryService } from './cloudinary.service'

export class CloudinaryProvider {
	private readonly logger: Logger
	private readonly cloudinaryService: CloudinaryService

	constructor(private readonly configService: ConfigService) {
		this.logger = new Logger('CloudinaryProvider')

		this.cloudinaryService = new CloudinaryService(
			v2.config({
				cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
				api_key: this.configService.get('CLOUDINARY_API_KEY'),
				api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
			}),
		)
	}

	getService() {
		return this.cloudinaryService
	}
}
