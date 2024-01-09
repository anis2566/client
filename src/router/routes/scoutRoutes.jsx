import Apply from "../../views/scout/apply";
import Application from "../../views/scout/apply/Applicaton";
import Success from "../../views/scout/apply/Success";
import ScoutDashboard from "../../views/scout/dashboard";
import Profile from "../../views/scout/profile";

export const scoutRoutes = [
  {
    path: "/scout/dashboard",
    element: <ScoutDashboard />,
    role: "scout",
  },
  {
    path: "/scout/apply",
    element: <Apply />,
    role: "scout",
  },
  {
    path: "/scout/apply/success",
    element: <Success />,
    role: "scout",
  },
  {
    path: "/scout/application/details",
    element: <Application />,
    role: "scout",
  },
  {
    path: "/scout/profile",
    element: <Profile />,
    role: "scout",
  },
];
export default scoutRoutes;
