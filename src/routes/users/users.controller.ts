import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterDTO } from '../../models/user-register.dto';
import { UserLoginDTO } from '../../models/user-login.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) { }

    @Post('login')
    async login(@Body() user: UserLoginDTO) {
        const loggedIn = await this.userService.logIn(user);
        if (!loggedIn) {
            throw new UnauthorizedException('Wrong Credentials!')
        }
        return JSON.stringify('https://github.com/login/oauth/authorize?client_id=61347fbe438d2164b7e9&redirect_uri=http://localhost:3000/auth/github');
    }

    @Post('register')
    async register(@Body() user: UserRegisterDTO) {
        const loggedIn = await this.userService.logIn(user);
        try {
            await this.userService.registerUser(user);
            return JSON.stringify('Registration successful!')
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }
}
