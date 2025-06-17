import { Router } from "express";
import { ChefController } from "./chef.controller";
import { ChefService } from "./chef.service";
import { ROUTES } from "../../constants/routes.const";

const router = Router();

const controller = new ChefController(new ChefService());

router.get(ROUTES.ROOT, controller.getAll);
router.get(`${ROUTES.ROOT}:id`, controller.getById);
router.post(ROUTES.ROOT, controller.create);
router.put(`${ROUTES.ROOT}:id`, controller.update);
router.delete(`${ROUTES.ROOT}:id`, controller.delete);

export default router;
