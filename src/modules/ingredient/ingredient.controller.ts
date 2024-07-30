/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { IngredientService } from "./ingredient.sevice";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { CreateIngredientDto } from "src/dtos/ingredient.dto";

@Controller('ingredient')
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) { }

    @Get()
    getIngredients() {
        return this.ingredientService.getAllIngredients()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    postIngredient(@Body() createIngredientDto: CreateIngredientDto) {
        return this.ingredientService.createIngredient(createIngredientDto)
    }
}