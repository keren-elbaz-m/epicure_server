import { BaseService } from "../base/base.service";
import { IRestaurant } from "./restaurant.model";
import { RestaurantRepository } from "./restaurant.repository";

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
}
