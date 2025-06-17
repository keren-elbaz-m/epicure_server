import { Request, Response } from "express";
import { BaseController } from "../base/base.controller";
import { IRestaurant } from "./restaurant.model";
import { RestaurantService } from "./restaurant.service";
import { DishTimeType } from "../../types/enums/dish-time.enum";

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

    getDishesByType = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.params.id;
            const { type } = req.query;

            if (
                ![
                    DishTimeType.BREAKFAST,
                    DishTimeType.LUNCH,
                    DishTimeType.DINNER,
                ].includes(String(type) as DishTimeType)
            ) {
                res.status(400).json({
                    success: false,
                    message:
                        "Invalid dish type. Use ?type=breakfast|lunch|dinner",
                });
                return;
            }

            const data = await this.restaurantService.findDishesByType(
                restaurantId,
                String(type) as
                    | DishTimeType.BREAKFAST
                    | DishTimeType.LUNCH
                    | DishTimeType.DINNER
            );
            res.status(200).json({ success: true, data });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch dishes",
            });
        }
    };
}
