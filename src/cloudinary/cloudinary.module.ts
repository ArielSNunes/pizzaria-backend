import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CloudinaryProvider } from './cloudinary.provider'

@Global()
@Module({})
export class CloudinaryModule {
	static forRoot() {
		const connectionFactory = {
			provide: 'CloudinaryProvider',
			inject: [ConfigService],
			useFactory: (configService: ConfigService) =>
				new CloudinaryProvider(configService),
		}
		return {
			module: CloudinaryModule,
			providers: [connectionFactory],
			exports: ['CloudinaryProvider'],
		}
	}
}
