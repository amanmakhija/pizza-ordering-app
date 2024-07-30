/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { SequelizeModule } from "src/core/database/sequelize.module";
import { Order } from "src/schemas/order.model";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderIngredient } from "src/schemas/order-ingredient.model";
import { JwtModule } from "../jwt/jwt.module";
import { UserModule } from "../user/user.module";
import { Ingredient } from "src/schemas/ingredient.model";

@Module({
    imports: [SequelizeModule, JwtModule, UserModule],
    providers: [OrderService,
        {
            provide: 'Order_Repository',
            useValue: Order,
        },
        {
            provide: 'OrderIngredient_Repository',
            useValue: OrderIngredient,
        },
        {
            provide: 'Ingredient_Repository',
            useValue: Ingredient,
        },
    ],
    controllers: [OrderController],
    exports: [OrderService],
})

export class OrderModule { }