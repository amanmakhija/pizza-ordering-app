/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { CartIngredient } from "src/schemas/cart-ingredient.model";
import { Cart } from "src/schemas/cart.model";
import { Ingredient } from "src/schemas/ingredient.model";

@Injectable()
export class CartService {
    constructor(@Inject('Cart_Repository') private readonly cartModel: typeof Cart, @Inject('CartIngredient_Repository') private readonly cartIngredientModel: typeof CartIngredient, @Inject('Ingredient_Repository') private readonly ingredientModel: typeof Ingredient) { }

    async createCart(userID: number, total: number): Promise<Cart> {
        return await this.cartModel.create({ userId: userID, total });
    }

    async createCartIngredients(cartId: number, ingredients: number[]): Promise<CartIngredient[]> {
        const cartIngredients = ingredients.map((ingredient) => ({ cartId, ingredientId: ingredient }));
        return await this.cartIngredientModel.bulkCreate(cartIngredients);
    }

    async getIngredientDetail(id: number): Promise<Ingredient | null> {
        return await this.ingredientModel.findOne({ where: { id } });
    }

    async getCart(cartId: number): Promise<Cart | null> {
        return await this.cartModel.findOne({ where: { id: cartId } });
    }

    async getCartIngredients(cartId: number): Promise<CartIngredient[]> {
        return await this.cartIngredientModel.findAll({ where: { cartId } });
    }

    async getCarts(id: number): Promise<Cart[]> {
        return await this.cartModel.findAll({ where: { userId: id } });
    }
}