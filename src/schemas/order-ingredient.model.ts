/* eslint-disable prettier/prettier */
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Order } from './order.model';
import { Ingredient } from './ingredient.model';

@Table
export class OrderIngredient extends Model<OrderIngredient> {
    @ForeignKey(() => Order)
    @Column
    orderId: number;

    @ForeignKey(() => Ingredient)
    @Column
    ingredientId: number;
}
