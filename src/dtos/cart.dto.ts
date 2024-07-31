/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty } from "class-validator";
import { Cart } from "src/schemas/cart.model";
import { Ingredient } from "src/schemas/ingredient.model";

export class CreateCartDto {
    @IsNotEmpty()
    ingredients: number[];
}

export class CartDto {
    @IsArray()
    ingredients: Ingredient[];

    @IsNotEmpty()
    cart: Cart;
}
