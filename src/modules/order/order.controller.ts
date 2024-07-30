/* eslint-disable prettier/prettier */
import { Body, Controller, Get, NotFoundException, Post, Put, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { CreateOrderDto, OrderDto } from "src/dtos/order.dto";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { OrderService } from "./order.service";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
        const { dataValues: orderData } = await this.orderService.createOrder(req.user.id, createOrderDto);
        const orderIngredients = await this.orderService.createOrderIngredients(orderData.id, createOrderDto.ingredients);

        const ingredientsPromises = orderIngredients.map(async ({ dataValues }) => {
            const ingredient = await this.orderService.getIngredientDetail(dataValues.ingredientId);
            return ingredient;
        });

        const orderDto = new OrderDto();
        orderDto.order = orderData;
        orderDto.ingredients = await Promise.all(ingredientsPromises);

        return orderDto;
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getOrders(@Request() req) {
        return await this.orderService.getOrders(req.user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOrder(@Request() req): Promise<OrderDto | null> {
        const { dataValues: orderDetails } = await this.orderService.getOrder(req.params.id);

        if (!orderDetails) throw new NotFoundException();

        if (orderDetails.orderedBy !== req.user.id) throw new UnauthorizedException();

        const orderIngredients = await this.orderService.getOrderIngredients(orderDetails.id);

        const ingredientsPromises = orderIngredients.map(async ({ dataValues }) => {
            const ingredient = await this.orderService.getIngredientDetail(dataValues.ingredientId);
            return ingredient;
        });

        const orderDto = new OrderDto();
        orderDto.order = orderDetails;
        orderDto.ingredients = await Promise.all(ingredientsPromises);

        return orderDto;
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateOrder(@Request() req): Promise<OrderDto | null> {
        const orderDetails = await this.orderService.getOrder(req.params.id);

        if (!orderDetails) throw new NotFoundException();

        if (orderDetails.orderedBy !== req.user.id) throw new UnauthorizedException();

        const updatedOrder = await orderDetails.update({ status: 'CANCELLED', cancelledAt: new Date() });

        const orderIngredients = await this.orderService.getOrderIngredients(updatedOrder.id);

        const ingredientsPromises = orderIngredients.map(async ({ dataValues }) => {
            const ingredient = await this.orderService.getIngredientDetail(dataValues.ingredientId);
            return ingredient;
        });

        const orderDto = new OrderDto();
        orderDto.order = updatedOrder;
        orderDto.ingredients = await Promise.all(ingredientsPromises);

        return orderDto;
    }
}