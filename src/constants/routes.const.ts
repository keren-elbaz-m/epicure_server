import { RoutePath } from "../types/enums/routes.enum";

export const ROUTES = {
    ROOT: RoutePath.ROOT,
    API: RoutePath.API,
    HEALTH: RoutePath.HEALTH,
    RESTAURANTS: RoutePath.RESTAURANTS,
    DISH: RoutePath.DISH,
};

export const FILTER_RESTAURANT = {
    POPULAR: RoutePath.FILTER_POPULAR,
    NEW: RoutePath.FILTER_NEW,
    OPEN: RoutePath.FILTER_OPEN,
};

export const FILTER_DISH = {
    BREAKFAST: RoutePath.BREAKFAST,
    LUNCH: RoutePath.LUNCH,
    DINNER: RoutePath.DINNER,
};
