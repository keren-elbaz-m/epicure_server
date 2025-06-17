import { RestaurantModel } from "./restaurant.model";
import { BaseRepository } from "../base/base.repository";
import { IRestaurant } from "./restaurant.model";
import { IDish } from "modules/dish/dish.model";
import { Document } from "mongoose";

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

    async getBreakfastDishes(
        restaurantId: string
    ): Promise<
        (Omit<IRestaurant, "menu"> & { menu: { breakfast: IDish[] } }) | null
    > {
        return this.model
            .findById(restaurantId)
            .populate<{ menu: { breakfast: IDish[] } }>("menu.breakfast")
            .select("menu.breakfast")
            .exec();
    }

    async getLunchDishes(
        restaurantId: string
    ): Promise<
        (Omit<IRestaurant, "menu"> & { menu: { lunch: IDish[] } }) | null
    > {
        return this.model
            .findById(restaurantId)
            .populate<{ menu: { lunch: IDish[] } }>("menu.lunch")
            .select("menu.lunch")
            .exec();
    }

    async getDinnerDishes(
        restaurantId: string
    ): Promise<
        (Omit<IRestaurant, "menu"> & { menu: { dinner: IDish[] } }) | null
    > {
        return this.model
            .findById(restaurantId)
            .populate<{ menu: { dinner: IDish[] } }>("menu.dinner")
            .select("menu.dinner")
            .exec();
    }
}
