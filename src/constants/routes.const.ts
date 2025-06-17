import { RoutePath } from "../types/enums/routes.enum";

export const ROUTES = {
    ROOT: RoutePath.ROOT,
    API: RoutePath.API,
    HEALTH: RoutePath.HEALTH,
    UPLOAD: RoutePath.UPLOAD,
    RESTAURANTS: RoutePath.RESTAURANTS,
    CHEF: RoutePath.CHEF,
};

export const FILTER_RESTAURANT = {
    POPULAR: RoutePath.FILTER_POPULAR,
    NEW: RoutePath.FILTER_NEW,
    OPEN: RoutePath.FILTER_OPEN,
};
