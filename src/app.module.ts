/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from './core/database/sequelize.module';

@Module({
  imports: [
    SequelizeModule
  ]
})
export class AppModule {}
