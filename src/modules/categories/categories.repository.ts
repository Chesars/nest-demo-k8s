import { Inject, Injectable } from '@nestjs/common';
import { PreloadDataCategoriesService } from 'src/helpers/preloadDataCategories';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly preloadDataCategoriesService: PreloadDataCategoriesService
  ) {}

  async getCategories() {
    return await this.categoryRepository.find();
  }

  async addCategory(category: { name: string }) {
    const newCategory = this.categoryRepository.create(category);
    return await this.categoryRepository.save(newCategory);
  }

  async preloadCategories() {
    await this.preloadDataCategoriesService.preloadCategories();
  }
}
