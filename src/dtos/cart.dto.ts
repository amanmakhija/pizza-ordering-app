/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { Cart } from "src/schemas/cart.model";
import { Ingredient } from "src/schemas/ingredient.model";

export class CreateCartDto {
    @IsNotEmpty()
    ingredients: number[];

    @IsNotEmpty()
    @IsNumber()
    total: number;
}

export class CartDto {
    @IsArray()
    ingredients: Ingredient[];

    @IsNotEmpty()
    cart: Cart;
}

export class CartsDto {
    @IsArray()
    carts: CartDto[];
}