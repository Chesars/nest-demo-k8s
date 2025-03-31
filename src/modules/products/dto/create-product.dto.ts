import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Product Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'This is a sample product description.',
  })
  @IsString()
  @IsNotEmpty()
  description: string; // Add this field

  @ApiProperty({
    description: 'The price of the product',
    example: 29.99,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'The stock quantity of the product',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @ApiPropertyOptional({
    description: 'The image URL of the product',
    example: 'http://example.com/product.jpg',
  })
  @IsString()
  @IsOptional()
  imgUrl?: string;

  @ApiProperty({
    description: 'The ID of the category the product belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}