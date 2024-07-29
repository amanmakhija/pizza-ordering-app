/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
            }),
            inject: [ConfigService],
        }),
        UserModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})

export class AuthModule { }
