import { BaseController } from "../base/base.controller";
import { IChef } from "./chef.model";
import { ChefService } from "./chef.service";

export class ChefController extends BaseController<IChef> {
    constructor(private readonly chefService: ChefService) {
        super(chefService);
    }
}
