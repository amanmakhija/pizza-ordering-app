/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/schemas/user.model';

export class LoginUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

export class RegisterUserDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    readonly profilePicture?: string;

    @IsString()
    role?: 'user' | 'admin'
}

export class UserDto {
    @IsNotEmpty()
    user: User;

    @IsString()
    @IsNotEmpty()
    token: string;
}