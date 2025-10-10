import loadingRoute from "./loadingRoute.jsx";
import authRoute from "./authRoute.jsx";
import protectedRoutes from "./protectedRoutes.jsx";

const routes = [loadingRoute, authRoute, ...protectedRoutes];

export default routes;
