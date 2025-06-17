import { Request, Response } from "express";
import { BaseController } from "../base/base.controller";
import { IRestaurant } from "./restaurant.model";
import { RestaurantService } from "./restaurant.service";

export class RestaurantController extends BaseController<IRestaurant> {
    constructor(private readonly restaurantService: RestaurantService) {
        super(restaurantService);
    }

    getPopular = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.restaurantService.findPopularRestaurants();
            res.status(200).json({ success: true, data });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch popular restaurants",
            });
        }
    };

    getdNewRestaurants = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.restaurantService.findNewRestaurants();
            res.status(200).json({ success: true, data });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch new restaurants",
            });
        }
    };

    getOpen = async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await this.restaurantService.findOpenRestaurants();
            res.status(200).json({ success: true, data });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch open restaurants",
            });
        }
    };
}
