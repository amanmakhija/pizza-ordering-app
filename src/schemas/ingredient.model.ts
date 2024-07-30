/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Ingredient extends Model<Ingredient> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        defaultValue: 'Ingredient',
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    type: 'BREAD' | 'SAUCE' | 'VEGETABLE' | 'CHEESE' | 'MEAT' | 'SPICE';

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    price: number;

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
}
