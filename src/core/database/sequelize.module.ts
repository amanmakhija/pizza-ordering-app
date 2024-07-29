/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { SequelizeModule as NestSequelizeModule } from '@nestjs/sequelize';
import { sequelizeProvider } from "./sequelize.provider";

@Module({
    imports: [
        NestSequelizeModule.forRootAsync({
            useFactory: async () => ({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadModels: true,
                synchronize: true,
            }),
        }),
    ],
    providers: [...sequelizeProvider],
    exports: [NestSequelizeModule, ...sequelizeProvider],
})

export class SequelizeModule { }