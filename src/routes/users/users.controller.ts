import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
    UnauthorizedException,
    Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { UserRegisterDTO } from '../../models/user-register.dto';
import { UserLoginDTO } from '../../models/user-login.dto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() user: UserLoginDTO, @Res() response: Response) {
        const loggedIn = await this.userService.logIn(user);
        if (!loggedIn) {
            throw new UnauthorizedException('Wrong Credentials!')
        }
        const token = await this.authService.signUser(user);
        const redirectUrl = this.authService.getRedirectUrl(user.username);
        response.cookie('X-VMNEST-TOKEN', token, { httpOnly: false });
        return response.send({ redirectUrl })
    }

    @Post('register')
    async register(@Body() user: UserRegisterDTO) {
        try {
            await this.userService.registerUser(user);
            return JSON.stringify('Registration successful!')
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT)
        }
    }
}
