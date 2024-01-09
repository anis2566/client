import Home from "./../../views/home/index";
import Login from "./../../views/auth/login/index";
import Register from "../../views/auth/register";
import AdminLogin from "../../views/auth/adminLogin";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default publicRoutes;
