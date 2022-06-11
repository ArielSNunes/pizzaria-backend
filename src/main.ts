import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			always: true,
			errorHttpStatusCode: 422,
		}),
	)
	const appConfigs = app.get(ConfigService)

	const swaggerConfig = new DocumentBuilder()
		.addTag('Pizzaria')
		.setTitle('API - Pizzaria')
		.setDescription('Documentação da API de Pizzaria')
		.setVersion('1.0')
		.addBearerAuth(
			{
				bearerFormat: 'JWT',
				type: 'http',
			},
			'Authorization',
		)
		.build()

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('docs', app, swaggerDocument)

	const appPort = appConfigs.get('APP_PORT', 3003)

	await app.listen(appPort)
}
bootstrap()
