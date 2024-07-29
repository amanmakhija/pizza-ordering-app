/* eslint-disable prettier/prettier */
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from '../user/user.service';
import { RegisterUserDto, UserDto, LoginUserDto } from '../../dtos/auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

    async register(registerUserDto: RegisterUserDto): Promise<UserDto> {
        const userExists = await this.userService.findUserByEmail(registerUserDto.email);
        if (userExists) throw new ConflictException('User already exists');

        const user = await this.userService.register(registerUserDto);
        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.signToken(payload);

        const userDto = new UserDto();
        userDto.user = user;
        userDto.token = access_token;

        return userDto;
    }

    async login(loginUserDto: LoginUserDto): Promise<UserDto> {
        const user = await this.userService.validateUser(loginUserDto);
        if (!user) throw new NotFoundException('Invalid credentials');

        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.signToken(payload);

        const userDto = new UserDto();
        userDto.user = user;
        userDto.token = access_token;

        return userDto;
    }
}
