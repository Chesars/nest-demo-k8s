import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}


  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.usersRepository.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id,updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.deleteUser(id);
  }

}
