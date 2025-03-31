import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productsRepository.createProduct(createProductDto);
  }

  async findAll(page: number, limit: number) {
    return await this.productsRepository.getProducts(page, limit);
  }

  async findAllProducts() {
    return await this.productsRepository.findAllProducts();
  }

  async findOne(id: string) {
    return await this.productsRepository.getProductById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.updateProduct(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productsRepository.deleteProduct(id);
  }

  async preloadSeeder() {
    return await this.productsRepository.preloadProducts();
  }
  
  async updateProductImage(id: string, imageUrl: string) {
    return await this.productsRepository.updateProductImage(id, imageUrl);
  }
}
