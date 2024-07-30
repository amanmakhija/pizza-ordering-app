/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/dtos/order.dto';
import { Ingredient } from 'src/schemas/ingredient.model';
import { OrderIngredient } from 'src/schemas/order-ingredient.model';
import { Order } from 'src/schemas/order.model';

@Injectable()
export class OrderService {
    constructor(
        @Inject('Order_Repository') private readonly orderModel: typeof Order,
        @Inject('OrderIngredient_Repository') private readonly orderIngredientModel: typeof OrderIngredient,
        @Inject('Ingredient_Repository') private readonly ingredientModel: typeof Ingredient,
    ) { }

    async createOrder(userID: number, createOrderDto: CreateOrderDto): Promise<Order> {
        const { total, paymentMethod } = createOrderDto;
        return await this.orderModel.create({ orderedBy: userID, total, paymentMethod });
    }

    async createOrderIngredients(orderId: number, ingredients: number[]): Promise<OrderIngredient[]> {
        const orderIngredients = ingredients.map((ingredient) => ({ orderId, ingredientId: ingredient }));
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

    async getIngredientDetail(id: number): Promise<Ingredient | null> {
        return await this.ingredientModel.findOne({ where: { id } });
    }
}
