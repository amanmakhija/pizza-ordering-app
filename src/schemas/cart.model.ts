/* eslint-disable prettier/prettier */
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Ingredient } from "./ingredient.model";
import { CartIngredient } from "./cart-ingredient.model";

@Table
export class Cart extends Model<Cart> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;

    @BelongsToMany(() => Ingredient, () => CartIngredient)
    ingredients: Ingredient[]
}