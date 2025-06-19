import { Router } from "express";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { ROUTES, FILTER_DISH } from "../../constants/routes.const";

const router = Router();

const controller = new RestaurantController(new RestaurantService());

router.get(ROUTES.ROOT, controller.getAll);
router.get(`${ROUTES.ROOT}:id`, controller.getById);
router.post(ROUTES.ROOT, controller.create);
router.patch(`${ROUTES.ROOT}:id`, controller.update);
router.delete(`${ROUTES.ROOT}:id`, controller.delete);

router.get(
    `${ROUTES.ROOT}:id${FILTER_DISH.DISHES_BY_TYPE}`,
    controller.getDishesByType
);

export default router;
