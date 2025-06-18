import { BaseService } from "../base/base.service";
import { IChef } from "./chef.model";
import { ChefRepository } from "./chef.repository";

export class ChefService extends BaseService<IChef> {
    constructor(private readonly repository = new ChefRepository()) {
        super(repository);
    }

    async getChefOfTheWeek() {
        return this.repository.getChefOfTheWeek();
    }

    async setChefOfTheWeek(id: string) {
        await this.repository.clearChefOfTheWeek();
        return this.repository.setChefOfTheWeek(id);
    }
}
