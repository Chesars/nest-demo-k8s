import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { DatabaseModule } from './modules/database_config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

dotenv.config({ path: '.env.development' });



@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    AuthModule,
    CloudinaryModule,
    JwtModule.register({
        global: true,
        signOptions: { expiresIn: '1h' },
        secret: process.env.JWT_SECRET,
      }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
