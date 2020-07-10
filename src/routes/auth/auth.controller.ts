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
        const accessToken = await this.authService.getAccessToken(code);
        response.cookie('X-GITHUB-TOKEN', accessToken)
        response.redirect('http://localhost:4200/vmware/',)
    }
}
