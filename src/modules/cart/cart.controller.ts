/* eslint-disable prettier/prettier */
import { Body, Controller, Get, NotFoundException, Post, Request, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { CartDto, CartsDto, CreateCartDto } from "src/dtos/cart.dto";

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createCart(@Request() req, @Body() createCartDto: CreateCartDto): Promise<CartDto> {
        const { dataValues: cartDetails } = await this.cartService.createCart(req.user.id, createCartDto.total);
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
    async getCarts(@Request() req): Promise<CartsDto> {
        const cartsDetails = await this.cartService.getCarts(req.user.id);
        const carts = cartsDetails.map(async ({ dataValues: cartDetails }) => {
            const cartIngredients = await this.cartService.getCartIngredients(cartDetails.id);
            const ingredientsPromises = cartIngredients.map(async ({ dataValues }) => {
                const ingredient = await this.cartService.getIngredientDetail(dataValues.ingredientId);
                return ingredient;
            });
            const cart = new CartDto();
            cart.cart = cartDetails;
            cart.ingredients = await Promise.all(ingredientsPromises);
            return cart;
        });
        
        const cartsDto = new CartsDto();
        cartsDto.carts = await Promise.all(carts);

        return cartsDto;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getCart(@Request() req): Promise<CartDto | null> {
        const { dataValues: cartDetails } = await this.cartService.getCart(req.user.id);

        if (!cartDetails) throw new NotFoundException();

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
}