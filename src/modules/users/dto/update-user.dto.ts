import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ description: 'Name of the user', example: 'John Doe' })
  name?: string;

  @ApiPropertyOptional({ description: 'Email address of the user', example: 'john.doe@example.com' })
  email?: string;

  @ApiPropertyOptional({ description: 'Password of the user', example: 'Password123!' })
  password?: string;

  @ApiPropertyOptional({ description: 'Address of the user', example: '123 calle' })
  address?: string;

  @ApiPropertyOptional({ description: 'Phone number of the user', example: '1234567890' })
  phone?: number;

  @ApiPropertyOptional({ description: 'Country of the user', example: 'Uruguay' })
  country?: string;

  @ApiPropertyOptional({ description: 'Indicates if the user is an admin', example: true })
  isAdmin?: boolean;

  @ApiPropertyOptional({ description: 'City of the user', example: 'Montevideo' })
  city?: string;
}