/* eslint-disable prettier/prettier */
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "src/dtos/register.dto";
import { LoginUserDto } from "src/dtos/login.dto";
import { JwtAuthGuard } from "../../guards/auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

    @Post('register')
    @UseGuards(JwtAuthGuard)
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
}