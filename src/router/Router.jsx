import { useRoutes } from "react-router-dom";

const Router = ({ allRoute }) => {
  const routes = useRoutes([...allRoute]);
  return routes;
};

export default Router;
