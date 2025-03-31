import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity'; // Ensure this path is correct or adjust it
import { Product } from '../products/entities/product.entity';
import { OrderDetail } from '../orders/entities/order-details.entity';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity'; // Verify this path or adjust it to the correct location
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// Cargar variables de entorno
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Category, Product, OrderDetail, Order, User],
  migrations: ['src/migrations/*.ts'], // o 'dist/migrations/*.js' si estás en producción
  synchronize: false, // siempre false para usar migraciones
  logging: true,
});