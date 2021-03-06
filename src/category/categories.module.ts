import { Module } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'

@Module({
	controllers: [CategoriesController],
	providers: [PrismaService, CategoriesService],
})
export class CategoryModule {}
