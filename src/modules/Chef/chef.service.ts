import { BaseService } from "../base/base.service";
import { IChef } from "./chef.model";
import { ChefRepository } from "./chef.repository";

export class ChefService extends BaseService<IChef> {
    constructor(private readonly repository = new ChefRepository()) {
        super(repository);
    }
}
