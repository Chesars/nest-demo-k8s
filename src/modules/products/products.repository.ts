import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PreloadDataProductsService } from '../../helpers/preloadDataProducts';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';


@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject()
    private readonly preloadDataProductsService: PreloadDataProductsService
  ) {}

  async getProducts(page: number, limit: number) {
    const data = await this.productRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return data;
  }

  async findAllProducts() {
    return await this.productRepository.find();
  }
  async getProductById(id: string) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { categoryId, ...productData } = createProductDto;

    const category = await this.productRepository.manager.findOne(Category, {
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const newProduct = this.productRepository.create({
      ...productData,
      category,
    });

    return await this.productRepository.save(newProduct);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id }})

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, updateProductDto);
    console.log('Producto editado con exito');

    return await this.productRepository.save(product);
  }
  
  async deleteProduct(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);
    return product;
  }

  async preloadProducts() {
    const response = await this.preloadDataProductsService.preloadProducts();
    return { message: response };
  }

  async updateProductImage(id: string, imageUrl: string) {
    const product = await this.productRepository.findOne({ where: { id } });
    console.log('Product found:', product);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    product.imgUrl = imageUrl;
    console.log('Updated product image URL:', product.imgUrl);
  
    const newProduct = await this.productRepository.save(product);
    console.log('Saved product:', newProduct);
  
    return {
      id: newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      stock: newProduct.stock,
      imgUrl: newProduct.imgUrl,
    };
  }
}