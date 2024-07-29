/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../schemas/user.model';
import { LoginUserDto } from '../../dtos/login.dto';
import { RegisterUserDto } from '../../dtos/register.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('User_Repository')
        private readonly userModel: typeof User,
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
        registerUserDto.password = hashedPassword;
        return this.userModel.create(registerUserDto);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ where: { email } });
    }

    async validateUser(loginUserDto: LoginUserDto): Promise<User | null> {
        const { email, password } = loginUserDto;
        const user = await this.userModel.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) return user;
        return null;
    }

    async findUserById(id: number): Promise<User | null> {
        return this.userModel.findByPk(id);
    }
}
