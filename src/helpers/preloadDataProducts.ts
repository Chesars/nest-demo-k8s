// src/helpers/preloadDataProductsService.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Product } from '../modules/products/entities/product.entity';
import { Category } from '../modules/categories/entities/category.entity';

const products = [
  {
    name: 'Iphone 15',
    description: 'The best smartphone in the world',
    price: 199.99,
    stock: 12,
    category: 'smartphone',
  },
  {
    name: 'Samsung Galaxy S23',
    description: 'The best smartphone in the world',
    price: 150.00,
    stock: 12,
    category: 'smartphone',
  },
  {
    name: 'Motorola Edge 40',
    description: 'The best smartphone in the world',
    price: 179.89,
    stock: 12,
    category: 'smartphone',
  },
  {
    name: 'Samsung Odyssey G9',
    description: 'The best monitor in the world',
    price: 299.99,
    stock: 12,
    category: 'monitor',
  },
  {
    name: 'LG UltraGear',
    description: 'The best monitor in the world',
    price: 199.99,
    stock: 12,
    category: 'monitor',
  },
  {
    name: 'Acer Predator',
    description: 'The best monitor in the world',
    price: 150.00,
    stock: 12,
    category: 'monitor',
  },
  {
    name: 'Razer BlackWidow V3',
    description: 'The best keyboard in the world',
    price: 99.99,
    stock: 12,
    category: 'keyboard',
  },
  {
    name: 'Corsair K70',
    description: 'The best keyboard in the world',
    price: 79.99,
    stock: 12,
    category: 'keyboard',
  },
  {
    name: 'Logitech G Pro',
    description: 'The best keyboard in the world',
    price: 59.99,
    stock: 12,
    category: 'keyboard',
  },
  {
    name: 'Razer Viper',
    description: 'The best mouse in the world',
    price: 49.99,
    stock: 12,
    category: 'mouse',
  },
  {
    name: 'Logitech G502 Pro',
    description: 'The best mouse in the world',
    price: 39.99,
    stock: 12,
    category: 'mouse',
  },
  {
    name: 'SteelSeries Rival 3',
    description: 'The best mouse in the world',
    price: 29.99,
    stock: 12,
    category: 'mouse',
  },
];

@Injectable()
export class PreloadDataProductsService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async preloadProducts() {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const categories = await transactionalEntityManager.find(Category);

      for (const product of products) {
        const category = categories.find(
          (category) => category.name === product.category,
        );
        if (!category) {
          throw new NotFoundException(`Categories not founded`);
        }

        const existingProduct = await transactionalEntityManager.findOne(
          Product,
          {
            where: { name: product.name },
          },
        );
        if (!existingProduct) {
          const productEntity = new Product();
          productEntity.name = product.name;
          productEntity.description = product.description;
          productEntity.price = product.price;
          productEntity.stock = product.stock;
          productEntity.category = category;
          await transactionalEntityManager.save(productEntity);
        }
      }
    });
    console.log("carga de productos realizada con exito")
    return "Preload of products correctly made";
  }
}
