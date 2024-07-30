/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartIngredient } from "src/schemas/cart-ingredient.model";
import { Ingredient } from "src/schemas/ingredient.model";
import { Cart } from "src/schemas/cart.model";
import { CartController } from "./cart.controller";
import { JwtModule } from "../jwt/jwt.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [JwtModule, UserModule],
    providers: [CartService,
        {
            provide: 'Cart_Repository',
            useValue: Cart,
        },
        {
            provide: 'Ingredient_Repository',
            useValue: Ingredient,
        },
        {
            provide: 'CartIngredient_Repository',
            useValue: CartIngredient,
        },
    ],
    controllers: [CartController],
    exports: [CartService],
})

export class CartModule { }