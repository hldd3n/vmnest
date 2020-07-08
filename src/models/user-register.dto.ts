import { IsString } from 'class-validator';

export class UserRegisterDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
