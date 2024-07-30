/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Ingredient } from './ingredient.model';
import { OrderIngredient } from './order-ingredient.model';

@Table
export class Order extends Model<Order> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    orderedBy: number;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    orderedAt: Date;

    @Column({
        type: DataType.STRING,
        defaultValue: 'PENDING',
    })
    status: 'PENDING' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED';

    @Column({
        type: DataType.DATE,
    })
    cancelledAt: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    total: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    paymentMethod: 'COD' | 'CARD' | 'UPI';

    @BelongsToMany(() => Ingredient, () => OrderIngredient)
    ingredients: Ingredient[]
}
