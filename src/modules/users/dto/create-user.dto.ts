import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength, Matches, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class CreateUserDto {
  // Name must be a non-empty string with at least 3 characters and at most 80 characters
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  // Email must be a valid email format
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character
  // Additionally, it must have a minimum length of 8 characters and a maximum length of 15 characters
  @ApiProperty({
    description: 'Password of the user',
    example: 'Password123!'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)'
  })
  password: string;

  // Address must be a non-empty string with at least 3 characters and at most 80 characters
  @ApiProperty({
    description: 'Address of the user',
    example: '123 calle'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  // Phone number must be a numeric string and cannot be empty
  @ApiProperty({
    description: 'Phone number of the user',
    example: '"1234567890"'
  })
  @IsNumberString()
  @IsNotEmpty()
  phone: number;

  // Country must be a string with at least 5 characters and at most 20 characters
  @ApiProperty({
    description: 'Country of the user',
    example: 'Uruguay'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  // isAdmin must be a boolean and cannot be empty
  @ApiProperty({
    description: 'Indicates if the user is an admin',
    example: true
  })
  @IsOptional()
  isAdmin: boolean;
  
  // City must be a string with at least 5 characters and at most 20 characters
  @ApiProperty({
    description: 'City of the user',
    example: 'Montevideo'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}