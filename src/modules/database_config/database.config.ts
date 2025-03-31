import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { OrderDetail } from 'src/modules/orders/entities/order-details.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: './.env.development',
      }),
    TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          database: configService.get('DB_NAME'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          entities: [Category, Product,OrderDetail, Order, User], 
          /* migrations: ['src/migrations/*.ts'], */
          synchronize: true,
          logging: true,
          /* dropSchema:true, */
        }),
      }),
  ],
})
export class DatabaseModule {}