/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotAcceptableException } from "@nestjs/common";
import { CartIngredient } from "src/schemas/cart-ingredient.model";
import { Cart } from "src/schemas/cart.model";
import { Ingredient } from "src/schemas/ingredient.model";

@Injectable()
export class CartService {
    constructor(@Inject('Cart_Repository') private readonly cartModel: typeof Cart, @Inject('CartIngredient_Repository') private readonly cartIngredientModel: typeof CartIngredient, @Inject('Ingredient_Repository') private readonly ingredientModel: typeof Ingredient) { }

    async createCart(userID: number): Promise<Cart> {
        return await this.cartModel.create({ userId: userID });
    }

    async getCart(userID: number): Promise<Cart | null> {
        return await this.cartModel.findOne({ where: { userId: userID } });
    }

    async removeCartIngredients(cartId: number, ingredientId: number): Promise<number> {
        return await this.cartIngredientModel.destroy({ where: { cartId, ingredientId } });
    }

    async createCartIngredients(cartId: number, ingredientId: number): Promise<CartIngredient> {
        const ingredientExists = await this.cartIngredientModel.findOne({ where: { cartId, ingredientId } });
        if (ingredientExists) throw new NotAcceptableException('Ingredient already exists in cart');
        const cartIngredient = await this.cartIngredientModel.create({ cartId, ingredientId });
        return cartIngredient;
    }

    async getIngredientDetail(id: number): Promise<Ingredient | null> {
        return await this.ingredientModel.findOne({ where: { id } });
    }

    async getCartIngredientDetail(cartId: number): Promise<CartIngredient[] | null> {
        return await this.cartIngredientModel.findAll({ where: { cartId } });
    }

    async getCartIngredients(cartId: number): Promise<CartIngredient[]> {
        return await this.cartIngredientModel.findAll({ where: { cartId } });
    }

    async getCarts(id: number): Promise<Cart[]> {
        return await this.cartModel.findAll({ where: { userId: id } });
    }
}