/* eslint-disable prettier/prettier */
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Cart extends Model<Cart> {
    @Column({
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        allowNull: false,
    })
    userId: number;
}