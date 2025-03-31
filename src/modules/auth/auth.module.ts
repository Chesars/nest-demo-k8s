import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService ]
})
export class AuthModule {}
