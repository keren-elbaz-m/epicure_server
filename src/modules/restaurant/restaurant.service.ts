import { BaseService } from "../base/base.service";
import { IRestaurant } from "./restaurant.model";
import { RestaurantRepository } from "./restaurant.repository";
import { DishTimeType } from "../../types/enums/dish-time.enum";
import { RestaurantsConditionsFilter } from "types/enums/restaurants-conditions.enum";

export class RestaurantService extends BaseService<IRestaurant> {
    constructor(private readonly repository = new RestaurantRepository()) {
        super(repository);
    }

    async findByFilter(
        filter?:
            | RestaurantsConditionsFilter.NEW
            | RestaurantsConditionsFilter.OPEN
            | RestaurantsConditionsFilter.POPULAR
    ) {
        return this.repository.findByFilter(filter);
    }

    async findDishesByType(
        restaurantId: string,
        type: DishTimeType.BREAKFAST | DishTimeType.LUNCH | DishTimeType.DINNER
    ) {
        return this.repository.getDishesByType(restaurantId, type);
    }

    async findAllDishes(restaurantId: string) {
        return this.repository.getAllDishes(restaurantId);
    }
}
