import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard.middleware';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mockProductsService: Partial<ProductsService>;
  let mockAuthGuard: Partial<AuthGuard>;
  let mockJwtService: Partial<JwtService>;
  let mockProduct: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
  };

  beforeEach(async () => {
    mockProduct = {
      id: uuidv4(),
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      stock: 10,
      imgUrl: 'http://example.com/product.jpg',
    };

    mockProductsService = {
      create: jest.fn().mockResolvedValue(mockProduct),
      findAllProducts: jest.fn().mockResolvedValue([mockProduct]),
      findAll: jest.fn().mockResolvedValue([mockProduct]),
      findOne: jest.fn().mockResolvedValue(mockProduct),
      update: jest.fn().mockResolvedValue(mockProduct),
      remove: jest.fn().mockResolvedValue(mockProduct),
    };

    mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    mockJwtService = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: AuthGuard,
          useValue: mockAuthGuard,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto = {
      name: mockProduct.name,
      description: mockProduct.description,
      price: mockProduct.price,
      stock: mockProduct.stock,
      imgUrl: mockProduct.imgUrl,
      categoryId: '123e4567-e89b-12d3-a456-426614174000', // Add a valid categoryId
    };
    const result = await controller.create(createProductDto);
    expect(result).toEqual(mockProduct);
    expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
  });

  it('should find all products', async () => {
    const result = await controller.findAllProducts();
    expect(result).toEqual([mockProduct]);
    expect(mockProductsService.findAllProducts).toHaveBeenCalled();
  });

  it('should find all products with pagination', async () => {
    const page = 1;
    const limit = 10;
    const result = await controller.findAll(page.toString(), limit.toString());
    expect(result).toEqual([mockProduct]);
    expect(mockProductsService.findAll).toHaveBeenCalledWith(page, limit);
  });

  it('should find one product', async () => {
    const result = await controller.findOne(mockProduct.id);
    expect(result).toEqual(mockProduct);
    expect(mockProductsService.findOne).toHaveBeenCalledWith(mockProduct.id);
  });

  it('should update a product', async () => {
    const result = await controller.update(mockProduct.id, mockProduct);
    expect(result).toEqual(mockProduct);
    expect(mockProductsService.update).toHaveBeenCalledWith(mockProduct.id, mockProduct);
  });

  it('should remove a product', async () => {
    const result = await controller.remove(mockProduct.id);
    expect(result).toEqual(mockProduct);
    expect(mockProductsService.remove).toHaveBeenCalledWith(mockProduct.id);
  });
});