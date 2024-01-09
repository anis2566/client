import adminRoutes from "./adminRoute";
import scoutRoutes from "./scoutRoutes";

const privateRoutes = [...adminRoutes, ...scoutRoutes];

export default privateRoutes;
