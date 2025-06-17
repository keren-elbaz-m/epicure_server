import { ChefModel } from "./chef.model";
import { BaseRepository } from "../base/base.repository";
import { IChef } from "./chef.model";
import { Document } from "mongoose";

export class ChefRepository extends BaseRepository<IChef> {
    constructor() {
        super(ChefModel);
    }
}
