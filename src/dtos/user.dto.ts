/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/schemas/user.model';

export class UserDto {
    @IsNotEmpty()
    user: User;

    @IsString()
    @IsNotEmpty()
    token: string;
}