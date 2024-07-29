/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { User } from '../../schemas/user.model';
import { Order } from 'src/schemas/order.model';
import { Ingredient } from 'src/schemas/ingredient.model';

export const sequelizeProvider = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            });
            sequelize.addModels([User, Order, Ingredient]);
            await sequelize.sync();
            return sequelize;
        },
    },
];
