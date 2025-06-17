import { RestaurantModel } from "./restaurant.model";
import { BaseRepository } from "../base/base.repository";
import { IRestaurant } from "./restaurant.model";
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
}
