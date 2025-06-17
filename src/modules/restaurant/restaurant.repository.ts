import { RestaurantModel } from "./restaurant.model";
import { BaseRepository } from "../base/base.repository";
import { IRestaurant } from "./restaurant.model";
import { IDish } from "modules/dish/dish.model";
import { Document } from "mongoose";
import { DishTimeType } from "../../types/enums/dish-time.enum";

export class RestaurantRepository extends BaseRepository<
    IRestaurant & Document
> {
    constructor() {
        super(RestaurantModel);
    }

    async getPopularRestaurants(): Promise<(IRestaurant & Document)[]> {
        return this.model.find({ isPopular: true }).exec();
    }

    async getNewRestaurants(): Promise<(IRestaurant & Document)[]> {
        return this.model.find({ isNewRestaurant: true }).exec();
    }

    async getOpenRestaurants(): Promise<(IRestaurant & Document)[]> {
        return this.model.find({ isNewRestaurant: true }).exec();
    }

    async getDishesByType(
        restaurantId: string,
        type: DishTimeType.BREAKFAST | DishTimeType.LUNCH | DishTimeType.DINNER
    ): Promise<
        | (Omit<IRestaurant, "menu"> & { menu: Record<typeof type, IDish[]> })
        | null
    > {
        return this.model
            .findById(restaurantId)
            .populate<{ menu: Record<typeof type, IDish[]> }>(`menu.${type}`)
            .select(`menu.${type}`)
            .exec();
    }
}
