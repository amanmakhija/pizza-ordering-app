/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Ingredient } from "src/schemas/ingredient.model";

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    type: 'BREAD' | 'SAUCE' | 'VEGETABLE' | 'CHEESE' | 'MEAT' | 'SPICE';

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    image: string;
}

export class IngredientsDto {
    @IsNotEmpty()
    ingredients: Ingredient[]
}