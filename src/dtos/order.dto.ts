/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { Ingredient } from "src/schemas/ingredient.model";
import { Order } from "src/schemas/order.model";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsArray()
    ingredients: number[];

    @IsNotEmpty()
    @IsNumber()
    total: number;

    @IsNotEmpty()
    paymentMethod: 'COD' | 'CARD' | 'UPI';
}

export class OrderDto {
    @IsArray()
    ingredients: Ingredient[];

    @IsNotEmpty()
    order: Order;
}