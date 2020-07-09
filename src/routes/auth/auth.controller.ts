import { Get, Controller, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get('/github')
    async getCode(@Query('code') code, @Res() response: Response)  {
        const cookie = await this.authService.getCookieWithAccessToken(code);
        response.cookie('github', cookie)
        return response.redirect('http://localhost:4200/vmware/')
    }
}