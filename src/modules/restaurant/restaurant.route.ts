import { Router } from "express";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { ROUTES, FILTER_RESTAURANT } from "../../constants/routes.const";

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

export default router;
