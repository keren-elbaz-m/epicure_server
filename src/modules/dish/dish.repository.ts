import { DishModel } from "./dish.model";
import { BaseRepository } from "../base/base.repository";
import { IDish } from "./dish.model";

export class DishRepository extends BaseRepository<IDish> {
    constructor() {
        super(DishModel);
    }
}
