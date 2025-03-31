import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { PreloadDataProductsService } from '../../helpers/preloadDataProducts';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Product])],

  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, PreloadDataProductsService],
  exports : [ProductsRepository, ProductsService],
})
export class ProductsModule {}
