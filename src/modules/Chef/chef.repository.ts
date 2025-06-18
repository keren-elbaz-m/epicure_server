import { ChefModel } from "./chef.model";
import { BaseRepository } from "../base/base.repository";
import { IChef } from "./chef.model";
import { Document } from "mongoose";

export class ChefRepository extends BaseRepository<IChef> {
    constructor() {
        super(ChefModel);
    }
    async getChefOfTheWeek() {
        return ChefModel.findOne({ chefOfTheWeek: true }).populate(
            "restaurants"
        );
    }
    async clearChefOfTheWeek() {
        return ChefModel.updateMany(
            { chefOfTheWeek: true },
            { $set: { chefOfTheWeek: false } }
        );
    }

    async setChefOfTheWeek(id: string) {
        return ChefModel.findByIdAndUpdate(
            id,
            { $set: { chefOfTheWeek: true } },
            { new: true }
        ).populate("restaurants");
    }
}
