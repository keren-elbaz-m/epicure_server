import { BaseService } from "../base/base.service";
import { IRestaurant } from "./restaurant.model";
import { RestaurantRepository } from "./restaurant.repository";
import { QueryParamsType } from "../../types/enums/type.enum";

export class RestaurantService extends BaseService<IRestaurant> {
    constructor(private readonly repository = new RestaurantRepository()) {
        super(repository);
    }

    async findPopularRestaurants() {
        return this.repository.getPopularRestaurants();
    }

    async findNewRestaurants() {
        return this.repository.getNewRestaurants();
    }

    async findOpenRestaurants() {
        return this.repository.getOpenRestaurants();
    }

    async findDishesByType(
        restaurantId: string,
        type:
            | QueryParamsType.BREAKFAST
            | QueryParamsType.LUNCH
            | QueryParamsType.DINNER
    ) {
        return this.repository.getDishesByType(restaurantId, type);
    }
}
