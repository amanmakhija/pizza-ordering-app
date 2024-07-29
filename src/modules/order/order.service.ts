/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { OrderIngredient } from 'src/schemas/order-ingredient.model';
import { Order } from 'src/schemas/order.model';

@Injectable()
export class OrderService {
    constructor(
        @Inject('Order_Repository') private readonly orderModel: typeof Order,
        @Inject('OrderIngredient_Repository') private readonly orderIngredientModel: typeof OrderIngredient,
    ) { }

    async createOrder(userID: number): Promise<Order> {
        return await this.orderModel.create({ orderedBy: userID });
    }

    async createOrderIngredients(orderId: number, ingredients: number[]): Promise<OrderIngredient[]> {
        const orderIngredients = ingredients.map((ingredient) => ({ orderId, ingredientId: ingredient }));
        console.log("🚀 ~ OrderService ~ createOrderIngredients ~ orderIngredients:", orderIngredients);
        return await this.orderIngredientModel.bulkCreate(orderIngredients);
    }

    async getOrders(id: number): Promise<Order[]> {
        return await this.orderModel.findAll({ where: { orderedBy: id } });
    }

    async getOrder(id: number): Promise<Order | null> {
        return await this.orderModel.findOne({ where: { id } });
    }

    async getOrderIngredients(id: number): Promise<OrderIngredient[]> {
        return await this.orderIngredientModel.findAll({ where: { orderId: id } });
    }
}
