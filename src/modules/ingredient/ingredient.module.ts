/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { Ingredient } from "src/schemas/ingredient.model";
import { IngredientService } from "./ingredient.sevice";
import { IngredientController } from "./ingredient.controller";
import { JwtModule } from "../jwt/jwt.module";
import { UserModule } from "../user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports: [SequelizeModule.forFeature([Ingredient]), JwtModule, UserModule],
    providers: [IngredientService],
    controllers: [IngredientController],
    exports: [IngredientService],
})

export class IngredientModule { }