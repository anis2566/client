import AdminDashboard from "../../views/admin/dashboard";
import CancelledScouts from "../../views/admin/scout/CancelledScouts";
import CreateScout from "../../views/admin/scout/CreateSout";
import PendingScouts from "../../views/admin/scout/PendingScouts";
import ScoutDetails from "../../views/admin/scout/ScoutDetails";
import ScoutList from "../../views/admin/scout/ScoutList";
import VerifiedScouts from "../../views/admin/scout/VerifiedScouts";
import Unit from "./../../views/admin/unit";
import CreateEvent from "./../../views/admin/event/CreateEvent";
import EventList from "./../../views/admin/event/EventList";
import EventDetails from "./../../views/admin/event/EventDetails";

const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/scout/create",
    element: <CreateScout />,
    role: "admin",
  },
  {
    path: "admin/scout/list",
    element: <ScoutList />,
    role: "admin",
  },
  {
    path: "admin/scout/request",
    element: <PendingScouts />,
    role: "admin",
  },
  {
    path: "admin/scout/cancelled",
    element: <CancelledScouts />,
    role: "admin",
  },
  {
    path: "admin/scout/verified",
    element: <VerifiedScouts />,
    role: "admin",
  },
  {
    path: "admin/scout/:scoutId",
    element: <ScoutDetails />,
    role: "admin",
  },
  {
    path: "admin/scout/unit",
    element: <Unit />,
    role: "admin",
  },
  {
    path: "admin/event/create",
    element: <CreateEvent />,
    role: "admin",
  },
  {
    path: "admin/event/list",
    element: <EventList />,
    role: "admin",
  },
  {
    path: "admin/event/:eventId",
    element: <EventDetails />,
    role: "admin",
  },
];

export default adminRoutes;
