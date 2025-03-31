import { IsUUID, IsDateString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderDetail } from '../entities/order-details.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The id of the user placing the order',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: '2025-02-18T10:00:00Z',
    description: 'The date when the order was placed',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    example: {
      productId: '123e4567-e89b-12d3-a456-426614174000',
      quantity: 2,
      price: 29.99
    },
    description: 'Details of the order',
  })
  @ValidateNested()
  @Type(() => OrderDetail)
  orderDetail: OrderDetail;
}