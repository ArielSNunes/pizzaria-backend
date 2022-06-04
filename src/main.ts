import { ValidationPipe } from '@nestjs/common'
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

	const swaggerConfig = new DocumentBuilder()
		.setTitle('API - Pizzaria')
		.setDescription('Documentação da API de Pizzaria')
		.addTag('Pizzaria')
		.build()

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('docs', app, swaggerDocument)

	await app.listen(3003)
}
bootstrap()
