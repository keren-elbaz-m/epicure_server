import express from "express";
import restaurantRoutes from "../modules/restaurant/restaurant.route";
import chefRoutes from "../modules/Chef/chef.route";
import uploadRoutes from "./upload.routes";

import { ROUTES } from "../constants/routes.const";

const apiRouter = express.Router();

apiRouter.use(ROUTES.RESTAURANTS, restaurantRoutes);
apiRouter.use(ROUTES.CHEF, chefRoutes);

apiRouter.use(ROUTES.UPLOAD, uploadRoutes);
export default apiRouter;
