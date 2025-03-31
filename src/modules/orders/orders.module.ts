import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from '../users/users.module';
import { OrdersRepository } from './orders.repository';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    UsersModule,
    ProductsModule,
  ],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
  exports: [OrdersRepository],
})
export class OrdersModule {}
