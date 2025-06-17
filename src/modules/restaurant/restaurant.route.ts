import { Router } from "express";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import {
    ROUTES,
    FILTER_RESTAURANT,
    FILTER_DISH,
} from "../../constants/routes.const";

const router = Router();

const controller = new RestaurantController(new RestaurantService());

router.get(ROUTES.ROOT, controller.getAll);
router.get(`${ROUTES.ROOT}:id`, controller.getById);
router.post(ROUTES.ROOT, controller.create);
router.put(`${ROUTES.ROOT}:id`, controller.update);
router.delete(`${ROUTES.ROOT}:id`, controller.delete);

router.get(FILTER_RESTAURANT.POPULAR, controller.getPopular);
router.get(FILTER_RESTAURANT.NEW, controller.getdNewRestaurants);
router.get(FILTER_RESTAURANT.OPEN, controller.getOpen);

router.get(
    `${ROUTES.ROOT}:id${FILTER_DISH.BREAKFAST}`,
    controller.getBreakfastDishes
);
router.get(`${ROUTES.ROOT}:id${FILTER_DISH.LUNCH}`, controller.getLunchDishes);
router.get(
    `${ROUTES.ROOT}:id${FILTER_DISH.DINNER}`,
    controller.getDinnerDishes
);

export default router;
