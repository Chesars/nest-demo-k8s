// src/helpers/preloadDataCategoriesService.ts
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Category } from '../modules/categories/entities/category.entity';

const categories = [
  { name: 'smartphone' },
  { name: 'monitor' },
  { name: 'keyboard' },
  { name: 'mouse' },
];

@Injectable()
export class PreloadDataCategoriesService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async preloadCategories() {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      for (const category of categories) {
        const existingCategory = await transactionalEntityManager.findOne(Category, {
          where: { name: category.name },
        });
        if (!existingCategory) {
          const categoryEntity = new Category();
          categoryEntity.name = category.name;
          await transactionalEntityManager.save(categoryEntity);
        }
      }
    });
    console.log('carga de categorias realizada con exito')
  }
}