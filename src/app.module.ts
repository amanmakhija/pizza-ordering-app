/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from './core/database/sequelize.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UserModule,
    AuthModule,
  ]
})
export class AppModule { }
