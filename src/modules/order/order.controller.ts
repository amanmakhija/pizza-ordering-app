/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CreateOrderDto, OrderDto } from "src/dtos/order.dto";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { OrderService } from "./order.service";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
        const { dataValues } = await this.orderService.createOrder(req.user.id);
        const orderIngredients = await this.orderService.createOrderIngredients(dataValues.id, createOrderDto.ingredients);

        const orderDto = new OrderDto();
        orderDto.order = dataValues;
        orderDto.ingredients = orderIngredients;

        return orderDto;
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getOrders(@Request() req) {
        return await this.orderService.getOrders(req.user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getOrder(@Request() req) {
        return await this.orderService.getOrder(req.params.id);
    }
}