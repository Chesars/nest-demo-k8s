import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import { PreloadDataProductsService } from '../../helpers/preloadDataProducts';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../categories/entities/category.entity';

describe('ProductsRepository', () => {
  let productsRepository: ProductsRepository;
  let productRepository: Repository<Product>;

  const mockProductRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    manager: {
      findOne: jest.fn(),
    },
  };

  const mockPreloadDataProductsService = {
    preloadProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsRepository,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: PreloadDataProductsService,
          useValue: mockPreloadDataProductsService,
        },
      ],
    }).compile();

    productsRepository = module.get<ProductsRepository>(ProductsRepository);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('get products with pagination', async () => {
    const result = [{ id: '1', name: 'Test Product' }];
    mockProductRepository.find.mockResolvedValue(result);

    expect(await productsRepository.getProducts(1, 10)).toEqual(result);
    expect(mockProductRepository.find).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
    });
  });

  it('find all products', async () => {
    const result = [{ id: '1', name: 'Test Product' }];
    mockProductRepository.find.mockResolvedValue(result);

    expect(await productsRepository.findAllProducts()).toEqual(result);
    expect(mockProductRepository.find).toHaveBeenCalled();
  });

  it('get product by id', async () => {
    const result = { id: '1', name: 'Test Product' };
    mockProductRepository.findOne.mockResolvedValue(result);

    expect(await productsRepository.getProductById('1')).toEqual(result);
    expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('create a new product', async () => {
    const createProductDto: CreateProductDto = { 
      name: 'New Product', 
      price: 100, 
      imgUrl: 'image.url', 
      stock: 10,
      description: 'A new product description',
      categoryId: '123e4567-e89b-12d3-a456-426614174000', // UUID for category
    };

    const mockCategory = { id: '123e4567-e89b-12d3-a456-426614174000', name: 'Test Category' };
    const result = { id: '1', ...createProductDto, category: mockCategory };

    // Mock the manager's findOne method to return a category
    mockProductRepository.manager.findOne.mockResolvedValue(mockCategory);

    mockProductRepository.create.mockReturnValue(result);
    mockProductRepository.save.mockResolvedValue(result);

    expect(await productsRepository.createProduct(createProductDto)).toEqual(result);
    expect(mockProductRepository.manager.findOne).toHaveBeenCalledWith(Category, {
      where: { id: createProductDto.categoryId },
    });
    expect(mockProductRepository.create).toHaveBeenCalledWith({
      name: createProductDto.name,
      price: createProductDto.price,
      imgUrl: createProductDto.imgUrl,
      stock: createProductDto.stock,
      description: createProductDto.description,
      category: mockCategory, // Use the category object instead of categoryId
    });
    expect(mockProductRepository.save).toHaveBeenCalledWith(result);
  });

  it('update a product', async () => {
    const updateProductDto: UpdateProductDto = { name: 'Updated Product' };
    const result = { id: '1', ...updateProductDto };
    mockProductRepository.findOne.mockResolvedValue(result);
    mockProductRepository.save.mockResolvedValue(result);

    expect(await productsRepository.updateProduct('1', updateProductDto)).toEqual(result);
    expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(mockProductRepository.save).toHaveBeenCalledWith(result);
  });


  it('delete a product', async () => {
    const result = { id: '1', name: 'Test Product' };
    mockProductRepository.findOne.mockResolvedValue(result);
    mockProductRepository.remove.mockResolvedValue(result);

    expect(await productsRepository.deleteProduct('1')).toEqual(result);
    expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(mockProductRepository.remove).toHaveBeenCalledWith(result);
  });


});