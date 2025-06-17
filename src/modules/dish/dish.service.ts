import { BaseService } from "../base/base.service";
import { IDish } from "./dish.model";
import { DishRepository } from "./dish.repository";

export class DishService extends BaseService<IDish> {
    constructor(private readonly repository = new DishRepository()) {
        super(repository);
    }
}
