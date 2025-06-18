import { Request, Response } from "express";
import { BaseController } from "../base/base.controller";
import { IRestaurant } from "./restaurant.model";
import { RestaurantService } from "./restaurant.service";
import { DishTimeType } from "../../types/enums/dish-time.enum";
import { RestaurantsConditionsFilter } from "../../types/enums/restaurants-conditions.enum";

export class RestaurantController extends BaseController<IRestaurant> {
    constructor(private readonly restaurantService: RestaurantService) {
        super(restaurantService);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const rawFilter = req.query.filter;
            const normalizedFilter =
                !rawFilter || rawFilter === "" ? undefined : String(rawFilter);

            const allowedFilters = [
                RestaurantsConditionsFilter.NEW,
                RestaurantsConditionsFilter.OPEN,
                RestaurantsConditionsFilter.POPULAR,
            ];

            if (
                normalizedFilter &&
                !allowedFilters.includes(
                    normalizedFilter as RestaurantsConditionsFilter
                )
            ) {
                res.status(400).json({
                    success: false,
                    message: "Invalid filter. Use ?filter=popular|new|open",
                });
                return;
            }

            const data = normalizedFilter
                ? await this.restaurantService.findByFilter(
                      normalizedFilter as RestaurantsConditionsFilter
                  )
                : await this.restaurantService.getAll();

            res.status(200).json({ success: true, data });
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch restaurants",
            });
        }
    };

    getDishesByType = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.params.id;
            const { type } = req.query;

            const stringType = String(type);

            const isValidType = [
                DishTimeType.BREAKFAST,
                DishTimeType.LUNCH,
                DishTimeType.DINNER,
            ].includes(stringType as DishTimeType);

            if (!type) {
                const data = await this.restaurantService.findAllDishes(
                    restaurantId
                );
                res.status(200).json({ success: true, data });
                return;
            }

            if (!isValidType) {
                res.status(400).json({
                    success: false,
                    message:
                        "Invalid dish type. Use ?type=breakfast|lunch|dinner",
                });
                return;
            }

            const data = await this.restaurantService.findDishesByType(
                restaurantId,
                stringType as DishTimeType
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
