import {
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Body, Param, Post, Put, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard.middleware';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../auth/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  /* @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAdmin() {
    return 'Ruta protegida';
  }
 */

@HttpCode(200)
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Get(':id')
async findOne(@Param('id', ParseUUIDPipe) id: string) {
  const user = await this.usersService.findOne(id);
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
      throw new NotFoundException('Update data is empty');
    }

    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.usersService.remove(id);
  }
}
