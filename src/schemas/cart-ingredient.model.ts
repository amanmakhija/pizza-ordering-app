/* eslint-disable prettier/prettier */
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Cart } from './cart.model';
import { Ingredient } from './ingredient.model';

@Table
export class CartIngredient extends Model<CartIngredient> {
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cartId: number;

  @ForeignKey(() => Ingredient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ingredientId: number;

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
