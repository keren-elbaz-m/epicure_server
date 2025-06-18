import { RestaurantModel } from "./restaurant.model";
import { BaseRepository } from "../base/base.repository";
import { IRestaurant } from "./restaurant.model";
import { IDish } from "modules/dish/dish.model";
import { Document } from "mongoose";
import { DishTimeType } from "../../types/enums/dish-time.enum";
import { RestaurantsConditionsFilter } from "types/enums/restaurants-conditions.enum";

export class RestaurantRepository extends BaseRepository<
    IRestaurant & Document
> {
    constructor() {
        super(RestaurantModel);
    }

    async findByFilter(
        filter?:
            | RestaurantsConditionsFilter.NEW
            | RestaurantsConditionsFilter.OPEN
            | RestaurantsConditionsFilter.POPULAR
    ): Promise<(IRestaurant & Document)[]> {
        if (!filter) return this.model.find({}).exec();

        const filterQueryMap: Record<string, Record<string, boolean>> = {
            popular: { isPopular: true },
            new: { isNewRestaurant: true },
            open: { isOpen: true },
        };

        return this.model.find(filterQueryMap[filter]).exec();
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
