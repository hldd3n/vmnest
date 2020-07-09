import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from '../../data/entities/user.entity';
import { UserRegisterDTO } from '../../models/user-register.dto';
import { UserLoginDTO } from '../../models/user-login.dto';

export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async registerUser(user: UserRegisterDTO) {
        const userFound = await this.usersRepository.findOne({ where: { username: user.username } });
        if (userFound) {
            throw new Error('User with that username already exists');
        }

        const newUser = new User();
        newUser.username = user.username;
        newUser.password = await bcrypt.hash(user.password, 10);

        await this.usersRepository.create(newUser);
        const registeredUser = await this.usersRepository.save(newUser)

        return registeredUser;
    }

    async logIn(user: UserLoginDTO) {
        const userFound = await this.usersRepository.findOne({
            select: ['username', 'password'],
            where: {
                username: user.username
            }
        });

        if (userFound) {
            const passwordMatch = await bcrypt.compare(user.password, userFound.password);
            if (passwordMatch) {
                return userFound;
            }
        }
    }
}