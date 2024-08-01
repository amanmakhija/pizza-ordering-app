/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { IngredientService } from "./ingredient.sevice";
import { CreateIngredientDto } from "src/dtos/ingredient.dto";
import { RolesGuard } from "src/guards/role.guard";

@Controller('ingredient')
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) { }

    @Get()
    getIngredients(@Query() params) {
        return this.ingredientService.getAllIngredients(params.query)
    }

    @Post()
    @UseGuards(RolesGuard)
    postIngredient(@Body() createIngredientDto: CreateIngredientDto) {
        return this.ingredientService.createIngredient(createIngredientDto)
    }
}