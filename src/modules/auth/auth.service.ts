import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from '../users/users.repository';
import { LoginUserDto } from './dto/LoginUserDto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.usersRepository.getUserByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    if (!hashedPassword) {
      throw new UnauthorizedException('Password could not be hashed');
    }

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);

    const userPayload = {
      sub: newUser.id,
      id: newUser.id,
      email: newUser.email,
      roles: [newUser.isAdmin ? Role.Admin : Role.User],
    };

    /*  const token = this.jwtService.sign(userPayload); */

    return { message: 'Signup successful', newUser /*, token */ };
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    if (!email || !password) {
      throw new UnauthorizedException('Email o password required');
    }

    const dbUser = await this.usersRepository.getUserByEmail(email);

    if (!dbUser) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    const userPayload = {
      sub: dbUser.id,
      id: dbUser.id,
      email: dbUser.email,
      roles: [dbUser.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);

    return { message: 'Login exitoso', token };
  }
}
