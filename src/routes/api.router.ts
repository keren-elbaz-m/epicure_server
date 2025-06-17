import express from "express";
import restaurantRoutes from "../modules/restaurant/restaurant.route";

import { ROUTES } from "../constants/routes.const";

const apiRouter = express.Router();

apiRouter.use(ROUTES.RESTAURANTS, restaurantRoutes);

export default apiRouter;
