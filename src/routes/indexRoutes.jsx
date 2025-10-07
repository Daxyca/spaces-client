import authRoute from "./authRoute.jsx";
import protectedRoutes from "./protectedRoutes.jsx";

const routes = [authRoute, ...protectedRoutes];

export default routes;
