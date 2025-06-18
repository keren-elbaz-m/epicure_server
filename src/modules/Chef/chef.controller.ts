import { BaseController } from "../base/base.controller";
import { Request, Response } from "express";
import { IChef } from "./chef.model";
import { ChefService } from "./chef.service";

export class ChefController extends BaseController<IChef> {
    constructor(private readonly chefService: ChefService) {
        super(chefService);
    }

    getChefOfTheWeek = async (req: Request, res: Response): Promise<void> => {
        try {
            const chef = await this.chefService.getChefOfTheWeek();
            if (!chef) {
                res.status(404).json({
                    success: false,
                    message: "No chef of the week found",
                });
                return;
            }
            res.status(200).json({ success: true, data: chef });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get chef of the week",
            });
        }
    };

    setChefOfTheWeek = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedChef = await this.chefService.setChefOfTheWeek(id);

            if (!updatedChef) {
                res.status(404).json({
                    success: false,
                    message: "Chef not found",
                });
                return;
            }

            res.status(200).json({ success: true, data: updatedChef });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to set chef of the week",
            });
        }
    };
}
