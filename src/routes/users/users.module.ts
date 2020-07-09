
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../data/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthModule,
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule { }
