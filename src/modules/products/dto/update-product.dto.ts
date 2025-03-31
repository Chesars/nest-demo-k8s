import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ description: 'The name of the product', example: 'Product Name' })
  name?: string;

  @ApiPropertyOptional({ description: 'The price of the product', example: 29.99 })
  price?: number;

  @ApiPropertyOptional({ description: 'The stock quantity of the product', example: 100 })
  stock?: number;

  @ApiPropertyOptional({ description: 'The image URL of the product', example: 'http://example.com/product.jpg' })
  image?: string;
}