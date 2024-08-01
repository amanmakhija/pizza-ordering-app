/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateIngredientDto } from "src/dtos/ingredient.dto";
import { Ingredient } from "src/schemas/ingredient.model";

@Injectable()
export class IngredientService {
    constructor(@InjectModel(Ingredient) private readonly ingredientModel: typeof Ingredient) { }

    async createIngredient(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
        return await this.ingredientModel.create(createIngredientDto)
    }

    getAllIngredients(query: string): Promise<Ingredient[]> {
        if (query) return this.ingredientModel.findAll({ where: { name: query } })
        return this.ingredientModel.findAll()
    }
}