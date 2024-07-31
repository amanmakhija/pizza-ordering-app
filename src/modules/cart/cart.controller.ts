/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { CartDto, CreateCartDto } from "src/dtos/cart.dto";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createCart(@Request() req): Promise<CartDto> {
        const cart = await this.cartService.createCart(req.user.id);
        const cartDto = new CartDto();
        cartDto.cart = cart;
        return cartDto;
    }

    @Post('add')
    @UseGuards(JwtAuthGuard)
    async addToCart(@Request() req, @Body() createCartDto: CreateCartDto): Promise<CartDto> {
        const { dataValues: cartDetails } = await this.cartService.getCart(req.user.id);

        if (!cartDetails) throw new NotFoundException();

        if (cartDetails.userId !== req.user.id) throw new UnauthorizedException();
        
        const cartIngredients = await this.cartService.createCartIngredients(cartDetails.id, createCartDto.ingredients);

        const ingredientsPromises = cartIngredients.map(async ({ dataValues }) => {
            const ingredient = await this.cartService.getIngredientDetail(dataValues.ingredientId);
            return ingredient;
        });

        const cart = new CartDto();
        cart.cart = cartDetails;
        cart.ingredients = await Promise.all(ingredientsPromises);

        return cart;
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getCart(@Request() req): Promise<CartDto | null> {
        const cartData = await this.cartService.getCart(req.user.id);

        if (!cartData) throw new NotFoundException();

        const cartDetails = cartData.dataValues;

        if (cartDetails.userId !== req.user.id) throw new UnauthorizedException();

        const cartIngredients = await this.cartService.getCartIngredients(cartDetails.id);

        const ingredientsPromises = cartIngredients.map(async ({ dataValues }) => {
            const ingredient = await this.cartService.getIngredientDetail(dataValues.ingredientId);
            return ingredient;
        });

        const cart = new CartDto();
        cart.cart = cartDetails;
        cart.ingredients = await Promise.all(ingredientsPromises);

        return cart;
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    async deleteCart(@Request() req): Promise<object> {
        const cartDetails = await this.cartService.getCart(req.user.id);

        if (!cartDetails) throw new NotFoundException();

        if (cartDetails.userId !== req.user.id) throw new UnauthorizedException();

        await this.cartService.getCartIngredients(cartDetails.id).then(async (cartIngredients) => {
            await Promise.all(cartIngredients.map(async ({ dataValues }) => {
                await this.cartService.getIngredientDetail(dataValues.ingredientId).then(async (ingredient) => {
                    await ingredient.destroy();
                });
            })
            )
        });

        return { message: 'Cart Ingredients deleted successfully' };
    }
}