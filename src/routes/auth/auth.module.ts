
import { Module, HttpModule, HttpService } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '../../config/config.module';
@Module({
    imports: [
        HttpModule,
        ConfigModule,
    ],
    providers: [AuthService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
