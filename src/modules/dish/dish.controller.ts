import { Request, Response } from "express";
import { BaseController } from "../base/base.controller";
import { IDish } from "./dish.model";
import { DishService } from "./dish.service";

export class DishController extends BaseController<IDish> {
    constructor(private readonly dishService: DishService) {
        super(dishService);
    }
}
