import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.addCategory(createCategoryDto);
  }

  findAll() {
    return this.categoriesRepository.getCategories();
  }

  findOne(id: string) {
    return `This action returns a category`;
  }

  preloadCategories() {
    return this.categoriesRepository.preloadCategories();
  }
}
