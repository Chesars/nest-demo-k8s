import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUserDto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    async signIn(@Body() LoginUserDto: LoginUserDto) {
        return this.authService.signIn(LoginUserDto);
    }
    @Post('signup')
    async signUp(@Body() CreateUserDto: CreateUserDto) {
        return this.authService.signUp(CreateUserDto);
    }

}
