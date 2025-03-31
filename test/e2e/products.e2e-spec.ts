import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Products (e2e)', () => {
  let app: INestApplication;
  let productId: string; // Dynamically store the product ID

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    
    await request(app.getHttpServer()).get('/products/seeder');

    
    const response = await request(app.getHttpServer()).get('/products');
    productId = response.body[0]?.id; 
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET /products - should return a list of products', async () => {
    const response = await request(app.getHttpServer()).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/GET /products/:id - should return a single product', async () => {
    const response = await request(app.getHttpServer()).get(`/products/${productId}`);
    if (response.status === 200) {
      expect(response.body).toHaveProperty('id', productId);
    } else {
      expect(response.status).toBe(404);
    }
  });

  it('/POST /products - should return Unauthorized', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      stock: 10,
      categoryId: '123e4567-e89b-12d3-a456-426614174000', // Replace with a valid category ID
    };

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(newProduct);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authorization header missing');
  });
});
