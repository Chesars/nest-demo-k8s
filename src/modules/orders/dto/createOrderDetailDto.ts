import { IsUUID, IsDecimal, IsArray, ValidateNested, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../entities/order.entity';

export class CreateOrderDetailDto {
  @ApiProperty({
    description: 'The ID of the user who created the order detail',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  userId: string;

  /* @ApiProperty({
    description: 'The price of the order detail',
    example: 19.99,
  }) */
  
  /* @IsNumber() */
  price: number;
/* 
  @ApiPropertyOptional({
    description: 'The order associated with the order detail',
    example: {
      id: 'order-id-1',
      customerName: 'John Doe',
      totalAmount: 59.97,
      status: 'pending',
    },
  }) */
  @IsOptional()
  @ValidateNested()
  @Type(() => Order)
  order?: Order;

  @ApiProperty({
    description: 'The list of products in the order detail',
    example: [
      {
        id: 'product-id-1'
      },
      {
        id: 'product-id-2'
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Product)
  products: Product[];
}