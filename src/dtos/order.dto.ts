/* eslint-disable prettier/prettier */
import { OrderIngredient } from "src/schemas/order-ingredient.model";
import { Order } from "src/schemas/order.model";

export class CreateOrderDto {
    ingredients: number[];
}

export class OrderDto {
    ingredients: OrderIngredient[];
    order: Order;
}